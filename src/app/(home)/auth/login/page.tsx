"use client"
import AuthO from "@/components/AuthO"; 
import { useState } from 'react';
import { useRouter} from 'next/navigation';
import { signIn } from "next-auth/react";
import { preventLogedinUser } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  preventLogedinUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [msg, setMsg] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setMsg('');
    await new Promise(resolve => setTimeout(resolve, 500));
    if (res?.error || !res?.ok) {
      setMsg("Login failed!")
    } else {
      alert('Login successful!');
      router.push('/dashboard')
    }
  }

  return (
    <>
      <h1 className="text-5xl font-rowdies">Log In</h1>
      <AuthO />
      <hr className="my-6 border-t-[2px] opacity-50 border-[#7C0A02] w-1/2" />
      <form className="flex flex-col gap-1 justify-start w-1/2 font-maven" onSubmit={handleLogin}>
        <label className="font-bold mx-3">
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
        <label className="font-bold mx-3">
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
        <p className="text-red-500 text-xs">{msg}</p>
        <br></br>
        
        <button className="bg-[#7C0A02] text-white rounded-2xl h-10 hover:bg-white hover:border-[#7C0A02] hover:border-1 hover:text-[#7C0A02] font-rowdies">Log In</button>
      </form>
    </>
  );
}