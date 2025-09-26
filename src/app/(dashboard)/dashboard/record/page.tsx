// app/your-route/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Record from "@/components/Record";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return <Record />;
}
