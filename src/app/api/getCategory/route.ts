import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db(); 
        const session = await auth();
        if (!session || !session.user) {
            throw Error("Cannot find user!")
        }
        const categories = await db
            .collection("users")
            .distinct("record.category", { email: session.user.email });
        return NextResponse.json(categories)

    } catch(err : any) {
         return NextResponse.json(
            { error: err.message ||'Error' },
            { status: 500 }
        );
    }
};