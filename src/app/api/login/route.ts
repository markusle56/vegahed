import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';


export async function POST(request: Request) {
    try { 
        const client = await clientPromise;
        const db = client.db();
        const { email, password } = await request.json();
        
        const user = await db.collection('users').findOne({email});
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new Error("Invalid email or password");
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || 'SERVER ERROR' },
            { status: 500 }
        );
    }
}