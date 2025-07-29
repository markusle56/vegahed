'use client';

import AuthO from "@/components/AuthO"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // const res = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      router.push('/dashboard')
    } else {
      alert(res?.error || 'Login failed.');
    }
  }

  return (
    <>
      <h1 className="text-5xl">Log In</h1>
      <AuthO />
      <hr className="my-6 border-t-[2px] opacity-50 border-[#7C0A02] w-1/2" />
      <form className="flex flex-col gap-1 justify-start w-1/2" onSubmit={handleLogin}>
        <label>
          Email
        </label>
        <input 
          placeholder="Enter your email" 
          className="h-10 px-3 rounded-2xl focus:outline-none border-[#7C0A02] ring"
          type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
        ></input>
        <br></br>
        <label>
          Password
        </label>
        <input 
          placeholder="Enter your password" 
          className="h-10 rounded-2xl focus:outline-none border-[#7C0A02] ring px-3"
          type="password"
          value={password} 
          onChange={e => setPassword(e.target.value)}
          required
        ></input>
        <br></br>
        <button className="bg-[#7C0A02] text-white rounded-2xl h-10">Log In</button>
      </form>
    </>
  );
}