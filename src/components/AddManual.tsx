"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AddManualProps = {
  onClose: () => void;
  url: string;
  setUrl: (value: string) => void;
};

export function AddManual({ onClose, url, setUrl }: AddManualProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoadingCats(true);
        const res = await fetch("/api/getCategory");
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        if (!ignore) setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (!ignore) setCategories([]);
      } finally {
        if (!ignore) setLoadingCats(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const handleUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/sendUrl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          manual: true,
          title,
          description,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Something went wrong");
      }

      // success
      setUrl("");
      setTitle("");
      setDescription("");
      setCategory("");
      onClose();
      router.refresh(); // avoids full reload, updates data
    } catch (err: any) {
      setError(err?.message ?? "Error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-record-title"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/50"
      />
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:max-w-lg dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
        >
          <div className="bg-white dark:bg-gray-800">
            <form className="flex flex-col p-5 w-full" onSubmit={handleUrl}>
              <h3
                id="manual-record-title"
                className="font-rowdies text-2xl self-center"
              >
                Manual Record
              </h3>

              {/* URL */}
              <label className="mt-4 mb-1 text-sm font-medium">URL</label>
              <input
                className="rounded-lg text-base p-2 outline-2 outline-darkred/75 truncate dark:bg-gray-700 dark:text-white"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder="https://vegahed.com/..."
              />

              {/* Title */}
              <label className="mt-4 mb-1 text-sm font-medium">Title</label>
              <input
                className="rounded-lg text-base p-2 outline-2 outline-darkred/75 dark:bg-gray-700 dark:text-white"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {/* Category */}
              <label className="mt-4 mb-1 text-sm font-medium">Category</label>
              <select
                className="rounded-lg text-base p-2 outline-2 outline-darkred/75 dark:bg-gray-700 dark:text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={loadingCats || categories.length === 0}
              >
                <option value="" disabled>
                  {loadingCats ? "Loading..." : "Select a category"}
                </option>
                    {categories.map((item) => (
                    <option key={item} value={item}>
                        {item}
                </option>
                ))}
              </select>

              {/* Description */}
              <label className="mt-4 mb-1 text-sm font-medium">
                Note
              </label>
              <textarea
                className="rounded-lg text-base h-40 p-2 outline outline-2 outline-darkred/75 overflow-auto dark:bg-gray-700 dark:text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional notes…"
              />

              {/* Error */}
              {error && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="mt-6 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-0 dark:bg-gray-700/25 rounded-b-lg">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-darkred px-3 py-2 text-sm font-rowdies text-white shadow-xs sm:ml-3 sm:w-auto dark:bg-darkred dark:shadow-white"
                >
                  Record
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-rowdies text-darkred shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
