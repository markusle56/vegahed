import { auth } from "@/lib/auth"
import Home from "@/components/Home"



export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <>
      <Home />
    </>
  )
}