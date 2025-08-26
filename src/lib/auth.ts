import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise, {
        collections: {
        Users: "users",
        Accounts: "accounts",
        Sessions: "sessions",
        VerificationTokens: "verification_tokens",
        },
    }),
    session: {
        strategy: "jwt", 
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
                    name: user.name ?? null,
                    image: user.image ?? null,
                    role: user.role ?? 'user',
                } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any })  {
            if (user) {
                token.sub = (user as any).id ?? token.sub ?? null;     
                token.name = user.name ?? token.name ?? null;
                token.email = user.email ?? token.email ?? null;
                (token as any).role = (user as any).role ?? "user";
                (token as any).image = (user as any).image ?? (token as any).image ?? null;
            }
        return token;
        },
        async session({ token, session }: { token: any; session: any }) {
            if (session.user) {
                (session.user as any).id = (token.sub as string | undefined) ?? null;
                (session.user as any).role = ((token as any).role as string) ?? "user";
                session.user.name = session.user.name ?? (token.name as string | null);
                session.user.email = session.user.email ?? (token.email as string | null);
                session.user.image = session.user.image ?? ((token as any).picture as string | null);
            }
        return session;
        },
    },
});