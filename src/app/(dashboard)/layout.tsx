import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import { Maven_Pro } from 'next/font/google';
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react"
import SideBar from "@/components/SideBar";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Record all your url",
};

const rowdies = Rowdies({
  weight: '400',
  subsets: ["latin"],
});


const maven = Maven_Pro({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-maven"
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-skin">
        <SessionProvider>
          <div className="flex  dark:bg-black bg-skin">
            <SideBar />
            <div className="pl-25">
            </div>
            {children}
          </div>
          
        </SessionProvider>
        </body>
    </html>
  );
}
