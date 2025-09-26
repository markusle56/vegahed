import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

type RecordItem = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  createdAt?: string | Date;   // allow ISO string or Date
  created_at?: string | Date;  // tolerate alt naming
  date?: string | Date;        // tolerate alt naming
};

export async function GET(_request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Cannot find user!");
    }

    const user = await db.collection("users").findOne({ email: session.user.email });
    if (!user) {
      throw new Error("Cannot find user!");
    }

    const records: RecordItem[] = Array.isArray(user.record) ? user.record : [];

    const getTs = (r: RecordItem) => {
      const d = r.createdAt ?? r.created_at ?? r.date;
      const t = d ? new Date(d).getTime() : 0;
      return Number.isFinite(t) ? t : 0;
    };

    const sorted = [...records].sort((a, b) => getTs(b) - getTs(a));

    return NextResponse.json(sorted, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Error" },
      { status: 500 }
    );
  }
}
