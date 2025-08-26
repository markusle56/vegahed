'use client';

import AuthO from "@/components/AuthO"; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { preventLogedinUser } from "@/lib/utils";

function validatePassword(password : string) {
  const errors: string[] = [];

  // minimum length
  if (password.length < 8) {
    errors.push("Must be at least 8 characters long");
  }
  // uppercase letter
  if (! /[A-Z]/.test(password) ) {
    errors.push("Must include at least one uppercase letter");
  }
  // lowercase letter
  if (! /[a-z]/.test(password) ) {
    errors.push("Must include at least one lowercase letter");
  }
  // digit
  if (! /\d/.test(password) ) {
    errors.push("Must include at least one number");
  }
  // special character
  if (! /[!@#$%^&*(),.?":{}|<>]/.test(password) ) {
    errors.push("Must include at least one special character");
  }

  return errors;
}
export default function Home() {
  preventLogedinUser();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter()

  const passwordsMatch = password === confirmPassword;
  
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordsMatch && validatePassword(password).length) {
      return; 
    }
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Signup successful!');
      router.push('/auth/login')
    } else {
      alert(data.error || 'Signup failed.');
    }
  }

  return (
    <>
      <h1 className="text-4xl font-rowdies">Create Account</h1>
      <AuthO />
      <hr className="my-6 border-t-[2px] opacity-50 border-[#7C0A02] w-1/2" />
      <form className="flex flex-col gap-1 justify-start w-1/2 font-maven" onSubmit={handleSignup}>
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
          Name
        </label>
        <input
          placeholder="Enter your name" 
          className="h-10 px-3 rounded-2xl focus:outline-none border-[#7C0A02] ring"
          type="text"
          value={name} 
          onChange={e => setName(e.target.value)}
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
        {password && validatePassword(password).length > 0 && (
          <>
            <p className="text-red-500 text-xs mt-2">Password must contain: </p>
            <ul className="space-y-1 text-xs ps-2">
            {validatePassword(password).map((instruction, i) => {
                return (
                  <li key={i} className={'text-red-500'}>
                    {instruction}
                  </li>
                );
              })}
            </ul>
          </>
          )}
        
        <br></br>
        <label className="font-bold mx-3">
          Confirm Password
        </label>
        <input 
          placeholder="Re-enter your password" 
          className="h-10 rounded-2xl focus:outline-none border-[#7C0A02] ring px-3"
          type="password"
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)}
          required
        ></input>
        {confirmPassword && !passwordsMatch && (
        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
      )}
        <br></br>
        <button className="bg-[#7C0A02] text-white rounded-2xl h-10 hover:bg-white hover:border-[#7C0A02] hover:border-1 hover:text-[#7C0A02] font-rowdies">Sign Up</button>
      </form>
    </>
  );
}