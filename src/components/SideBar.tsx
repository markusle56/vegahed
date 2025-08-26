"use client"
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function SideBar() {
  const router = useRouter();
  const path = usePathname();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  if (!session) return null;


  return (
    <nav className={`fixed bg-[#7C0A02] flex flex-col text-white font-rowdies left-0 w-30 h-screen  py-20 items-center  overflow-x-hidden top-0`}>
      <Link href="/" className="block hover:scale-105 transition">
          <img src="/vegahed.png" className="items-stretch h-15 sm:h-20" alt="VegaHed Logo" />
      </Link>
      <img src={session?.user?.image || "default_avatar.png"} className="h-15 rounded-full shadow shadow-white/ mx-10"  alt="User Avatar" referrerPolicy="no-referrer"></img>
      <p className="truncate min-h-10 max-w-20">{session?.user?.name || "unknown"}</p>
      <Link href="/dashboard"
        className={`
            h-20 w-full hover:bg-skin hover:text-[#7C0A02] min-h-10 rounded-l-full flex justify-center items-center
            ${path === "/dashboard" ? 'bg-skin text-darkred' : 'text-skin'}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 256 256"
          className="h-10">
          <path fill="currentColor" d="m218.83 103.77l-80-75.48a1.14 1.14 0 0 1-.11-.11a16 16 0 0 0-21.53 0l-.11.11l-79.91 75.48A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48h32v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78ZM208 208h-48v-48a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v48H48v-92.45l.11-.1L128 40l79.9 75.43l.11.1Z"></path>
        </svg>
      </Link>
      <Link href="/dashboard/record"
        className={`
            h-20 w-full hover:bg-skin hover:text-[#7C0A02] min-h-10 rounded-l-full flex justify-center items-center
            ${path === "/dashboard/bookmark" ? 'bg-skin text-darkred' : 'text-skin'}`}>
        <svg xmlns="http://www.w3.org/2000/svg"  
            className={`h-10`} 
            viewBox="0 0 24 24">
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor">
              <path stroke="currentColor" d="M2 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2s2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6s0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.093C8.1 10 7.4 10 6 10s-2.1 0-2.635-.272a2.5 2.5 0 0 1-1.093-1.093C2 8.1 2 7.4 2 6m0 12c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.092C3.9 14 4.6 14 6 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.093 1.092C10 15.9 10 16.6 10 18s0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092C8.1 22 7.4 22 6 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 20.1 2 19.4 2 18m12 0c0-1.4 0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.092C15.9 14 16.6 14 18 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.092 1.092C22 15.9 22 16.6 22 18s0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 22 19.4 22 18 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092C14 20.1 14 19.4 14 18"></path>
              <path fill="currentColor" d="m15.348 9.856l-.157-.734zm-1.204-1.204l.734.157zm.877-2.54l-.53-.53zm2.867 2.867l.53.53zm3.908-5.502l.65-.375zm-.6 2.194l-.53-.53zm.6-.673l.65.375zm-1.273-2.794l.375-.65zm-2.195.6l.53.53zm.674-.6l-.375-.65zm1.664 2.937L17.358 8.45l1.06 1.06l3.309-3.307zM15.55 6.642l3.308-3.308l-1.06-1.06L14.49 5.58zm-.36 2.48c-.176.038-.316.068-.436.09a2 2 0 0 1-.255.037c-.056.003-.052-.003-.018.006a.4.4 0 0 1 .166.097l-1.06 1.06c.323.324.728.352 1.007.334c.265-.017.589-.088.91-.157zm-1.78-.627c-.069.321-.14.645-.157.91c-.018.28.01.684.334 1.007l1.06-1.06a.4.4 0 0 1 .097.165c.01.035.003.039.006-.017c.004-.054.014-.133.037-.255c.022-.12.052-.26.09-.436zm7.255-5.16c.367.367.442.451.48.517l1.3-.75c-.162-.28-.42-.53-.72-.828zm1.06 2.867c.3-.3.558-.548.72-.829l-1.3-.75c-.038.066-.113.15-.48.518zm-.58-2.35a.77.77 0 0 1 0 .771l1.3.75a2.27 2.27 0 0 0 0-2.27zm.58-1.578c-.299-.3-.548-.558-.828-.72l-.75 1.3c.066.038.15.113.518.48zm-2.867 1.06c.367-.367.452-.442.518-.48l-.75-1.3c-.28.162-.53.42-.829.72zm2.039-1.78a2.27 2.27 0 0 0-2.271 0l.75 1.3a.77.77 0 0 1 .77 0zm-3.54 6.895c-.196.196-.463.322-.843.419c-.19.048-.393.086-.619.125c-.217.038-.466.078-.705.13l.313 1.466c.202-.043.41-.077.648-.118c.23-.04.483-.085.735-.15c.504-.129 1.066-.346 1.532-.811zm-2.48.36c.05-.24.091-.488.129-.705c.039-.226.077-.43.125-.62c.097-.38.223-.646.419-.842l-1.06-1.06c-.466.465-.683 1.027-.812 1.531c-.065.252-.11.506-.15.735c-.041.239-.075.446-.118.647z"></path>
            </g>
        </svg>
      </Link>
      
      <Link href="/dashboard/setting"
        className={`
            h-20 w-full hover:bg-skin hover:text-[#7C0A02] min-h-10 rounded-l-full flex justify-center items-center
            ${path === "/dashboard/setting" ? 'bg-skin text-darkred' : 'text-skin'}`}>
        
        <svg 
            xmlns="http://www.w3.org/2000/svg"  
            className={`h-10`}
            viewBox="0 0 48 48">
            <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
                <path d="M18.284 43.171a19.995 19.995 0 0 1-8.696-5.304a6 6 0 0 0-5.182-9.838A20.09 20.09 0 0 1 4 24c0-2.09.32-4.106.916-6H5a6 6 0 0 0 5.385-8.65a19.968 19.968 0 0 1 8.267-4.627A6 6 0 0 0 24 8a6 6 0 0 0 5.348-3.277a19.968 19.968 0 0 1 8.267 4.627A6 6 0 0 0 43.084 18A19.99 19.99 0 0 1 44 24c0 1.38-.14 2.728-.406 4.03a6 6 0 0 0-5.182 9.838a19.995 19.995 0 0 1-8.696 5.303a6.003 6.003 0 0 0-11.432 0Z"></path>
                <path d="M24 31a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z"></path>
            </g>
        </svg>
      </Link>

      <Link href="/dashboard/info"
        className={`
            h-20 w-full hover:bg-skin hover:text-[#7C0A02] min-h-10 rounded-l-full flex justify-center items-center
            ${path === "/dashboard/info" ? 'bg-skin text-darkred' : 'text-skin'}`}>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-10`}
            viewBox="0 0 15 15">
          <path fill="currentColor" d="M7.5 1C6.7 1 6 1.7 6 2.5S6.7 4 7.5 4S9 3.3 9 2.5S8.3 1 7.5 1zM4 5v1s2 0 2 2v2c0 2-2 2-2 2v1h7v-1s-2 0-2-2V6c0-.5-.5-1-1-1H4z"></path>
      </svg>
      </Link>
      
      
    </nav>
  );
}