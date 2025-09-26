import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

function sortCategories(cats: string[] = []): string[] {
  const arr = cats.filter((c): c is string => !!c && typeof c === "string");
  arr.sort((a, b) => a.localeCompare(b));
  // Move "Others" (case-insensitive) to the end
  const idx = arr.findIndex((c) => c.toLowerCase() === "others");
  if (idx !== -1) arr.push(...arr.splice(idx, 1));
  return arr;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Cannot find user!" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const categories = (await db
      .collection("users")
      .distinct("record.category", { email: session.user.email })) as string[];

    const sorted = sortCategories(categories);
    return NextResponse.json(sorted);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message ?? "Error" },
      { status: 500 }
    );
  }
}
