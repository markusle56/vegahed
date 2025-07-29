import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <>
      {/* <div>
        First way
        Hello 
        {session.user.name}
      </div> */}
      <SessionProvider>
        Second way 
      </SessionProvider>
    </>
  )
}