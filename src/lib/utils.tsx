"use client"

import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
export function preventLogedinUser() {
    const router = useRouter(); 
    const { data: session } = useSession();

    if (session) return router.push('/dashboard');
}
