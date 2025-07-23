import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";


const rowdies = Rowdies({
  weight: '400',
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${rowdies.className} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
