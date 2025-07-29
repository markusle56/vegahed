import type { Metadata } from "next";
import { Rowdies } from "next/font/google";
import "@/app/globals.css";

const rowdies = Rowdies({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VegaHed",
  description: "Record all your url",
};

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rowdies.className} antialiased`}
      >
        <div className="relative w-full h-auto min-h-screen bg-[#FFF4E8] overflow-auto flex justify-end">
          <div className="absolute top-0 pt-0.5 left-0 z-10 w-1/2 h-full flex items-end">
            <img src="/auth.svg" alt="illustration" className="max-w-1/2-screen" />
          </div>
          <main className="flex flex-col justify-center pl-60 items-center h-full min-h-screen py-10 pr-12 bg-white rounded-tl-full rounded-bl-full w-2/3 shadow ">
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}
