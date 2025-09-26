"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import RecordItem from "@/components/Record";
import FolderBar from "@/components/FolderBar";

type RecordData = {
  id?: string;
  title: string;
  description?: string;
  url?: string;
  category: string;
  [key: string]: any;
};

export default function RecordsPage() {
  const [records, setRecords] = useState<RecordData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [recRes, catRes] = await Promise.all([
          fetch("/api/record", { cache: "no-store", signal: ac.signal }),
          fetch("/api/getCategory", { cache: "no-store", signal: ac.signal }),
        ]);

        if (!recRes.ok) throw new Error(`Records: HTTP ${recRes.status}`);
        if (!catRes.ok) throw new Error(`Categories: HTTP ${catRes.status}`);

        const [recJson, catJson] = await Promise.all([recRes.json(), catRes.json()]);

        const recs = Array.isArray(recJson) ? recJson : [];
        const cats = Array.isArray(catJson) ? catJson : [];

        setRecords(recs);
        setCategories(cats);
        if (cats.length) setSelectedCategory(cats[0]);
      } catch (e) {
        if (!(e instanceof DOMException && e.name === "AbortError")) {
          setErr((e as Error).message ?? "Failed to load data.");
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const filtered = useMemo(
    () =>
      selectedCategory ? records.filter((r) => r.category === selectedCategory) : records,
    [records, selectedCategory]
  );

  return (
    <div className="flex flex-col w-full h-screen px-8 gap-6 py-6">
      <FolderBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex-1 bg-white shadow rounded-2xl p-4 overflow-y-auto">
        {loading && <p className="text-gray-500">Loading…</p>}
        {err && <p className="text-red-600">{err}</p>}
        {!loading && !err && filtered.length === 0 && (
          <p className="text-gray-600">No records found.</p>
        )}
        {/* {!loading &&
          !err &&
          filtered.map((item, idx) => (
            <RecordItem key={item.id ?? `${item.title}-${idx}`} {...item} />
          ))} */}
      </div>
    </div>
  );
}
