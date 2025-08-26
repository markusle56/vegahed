import { auth } from "@/lib/auth"
import Record from "@/components/Record"



export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <>

      <Record />
    </>
  )
}