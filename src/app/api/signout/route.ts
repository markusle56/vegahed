import { NextResponse } from 'next/server'
import { signOut } from "@/lib/auth"
import { redirect } from 'next/navigation';
 
export function GET(request: Request) {
    signOut();
    return redirect('/');
}