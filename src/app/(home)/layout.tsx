import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import { Maven_Pro } from 'next/font/google';
import "@/app/globals.css";
import { SessionProvider } from "next-auth/react"
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const rowdies = Rowdies({
  weight: '400',
  subsets: ["latin"],
});


const maven = Maven_Pro({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-maven"
});


export const metadata: Metadata = {
  title: "VegaHed",
  description: "Record all your url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-black">
        <SessionProvider>
          <Nav />
          {children}
          <Footer />
        </SessionProvider>
        </body>
    </html>
  );
}
