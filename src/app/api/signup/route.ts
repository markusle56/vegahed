import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try { 
        const client = await clientPromise;
        const db = client.db();
        const { email, name, password } = await request.json();

        const user = await db.collection('users').findOne({email});
        if (user) {
            throw new Error("Email existed!");
        }
        
        const passwordHash = await bcrypt.hash(password, 10);

        const result = await db.collection('users').insertOne({ email, name, passwordHash });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'SERVER ERROR' },
            { status: 500 }
        );
    }
}