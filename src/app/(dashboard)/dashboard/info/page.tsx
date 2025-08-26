import { auth } from "@/lib/auth"




export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <>
      
    </>
  )
}