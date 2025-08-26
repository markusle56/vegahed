"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AddRecord from "@/components/AddRecord";
import Achievement from "@/components/Achievement";
import RecentlyRecord from "@/components/RecentlyRecord";

interface RecordItem {
  title: string;
  description: string;
  url: string;
  image: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [record, setRecord] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/record/recently", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: RecordItem[] = await res.json();
        if (!cancelled) setRecord(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading" || !session?.user) return null;

  return (
    <div className="flex w-screen h-screen px-20 gap-20 py-10">
      <div className="flex flex-col w-3/5 gap-5">
        <h1 className="font-rowdies px-2 text-2xl">Add Record</h1>
        <div className="bg-white w-full rounded-2xl shadow p-5">
          <AddRecord />
        </div>

        <h1 className="font-rowdies px-2 text-2xl mt-5">Recently Added</h1>
        <div className="bg-white rounded-2xl w-full h-2/3 min-h-80 p-5 shadow flex flex-col overflow-y-auto">
          {loading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : record.length > 0 ? (
            <RecentlyRecord record={record} />
          ) : (
            <div className="opacity-25 flex flex-col justify-center items-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-1/5"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M14.341 5.579c..."
                />
              </svg>
              <h1 className="font-rowdies text-sm sm:text-lg text-center">
                Looks like you don’t have any records. Add your first record now!
              </h1>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-1/5 gap-y-5">
        <h1 className="font-rowdies px-2 text-2xl">Achievement</h1>
        <div className="bg-white shadow w-full rounded-2xl h-1/2">
          <Achievement />
        </div>
      </div>
    </div>
  );
}
