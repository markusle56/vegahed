import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import NextAuth, { type NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt", // string literal, not variable!
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const client = await clientPromise;
                const db = client.db();
                const user = await db.collection('users').findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                const isValid = await bcrypt.compare(credentials.password as string, user.passwordHash);
                if (!isValid) {
                    throw new Error("Invalid email or password");
                }
                return {
                    id: user._id.toString(),
                    email: user.email,
                    image: user.image || null,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any })  {
            if (user) token.role = (user as any).role ?? "user";
        return token;
        },
        async session({ token, session }: { token: any; session: any }) {
            if (session.user) session.user.role = token.role as string;
        return session;
        },
    },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);