"use client"
import { useSession } from "next-auth/react";

export default function Nav() {
  const { data: session, status } = useSession();
  return (
    <div className="fixed px-30 w-screen z-1000 bg-white dark:bg-black">
      <nav className=" justify-between py-0   flex items-center sm:h-16 h-10 text-darkred font-rowdies dark:text-white ">
        <a href="/" className="block hover:scale-105 transition">
          <img src="/vegahed.png" className="items-stretch h-15 sm:h-20" alt="VegaHed Logo" />
        </a>
      
        <div className="flex h-full">
          <a
            href="/#about"  
            className="h-full flex items-center px-6 hover:scale-110 transition"
          >
            About Us
          </a>
          {!session && (
          <>
            <a
              href="/auth/login"
              className="h-full flex items-center px-6 hover:scale-110 transition"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="h-full flex items-center px-6 hover:scale-110 transition"
            >
              Signup
            </a>
          </>
          )}
          {session  && (
            <a
              href="/dashboard"
              className="h-full flex items-center px-6 hover:scale-110 transition"
            >
              Dashboard
            </a>
          )}
        </div>
      </nav>
      <hr className="w-full rounded-2xl border-b-darkred border-b-2 opacity-50 dark:border-b-white"></hr>
    </div>
  );
}