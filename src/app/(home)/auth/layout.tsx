import { SessionProvider } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <div className="relative w-full h-screen flex justify-end pt-20 max-h-screen">
            <div className="absolute left-20 bottom-0 z-10 w-2/5 h-full flex items-end">
              <img src="/auth.svg" alt="illustration" className="max-w-1/2-screen" />
            </div>
            <main className="flex flex-col justify-center pl-60 items-center h-full py-10 pr-12 rounded-l-full w-2/3 shadow shadow-darkred dark:shadow-white">
                {children}
            </main>
          </div>
    </>
  );
}
