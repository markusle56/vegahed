"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Home() { 
    const { data: session, status } = useSession();
    const [ record, setRecord ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ category, setCategory] = useState([]);
    const [ selectedCategory, setSelectedCategory] = useState('');
    
    useEffect(() => {
        if (status !== "authenticated") return;
        let cancelled = false;

        (async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/getRecord", { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const rec = await res.json();
            if (!cancelled) setRecord(rec);
            const cat = await fetch("/api/getCategory", { cache: "no-store" });
            if (!cat.ok) throw new Error(`HTTP ${res.status}`);
            const cate = await cat.json();
            if (!cancelled) setCategory(cate);
            setSelectedCategory(cate[0])
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

    if (status === "loading") return null; 
    if (!session?.user) return null;   
    return (
        <div className="flex flex-col w-full h-screen px-30 gap-15 py-10">
            <div id="folder-bar" className="h-10 w-fit max-w-3/4 bg-gray-400 rounded-2xl flex overflow-x-auto font-rowdies text-darkred">
                {category.map((item) => (
                    <div className="h-full w-30 rounded-2xl truncate flex justify-center items-center px-auto bg-blue-500"> {item}</div>
                ))}
                <div className="h-full ml-auto bg-blue-500 flex justify-center items-center w-10 rounded-2xl">+</div>
            </div>
            <div className="h-screen bg-white shadow rounded-2xl">
                {/* {record.map((item)) => (
                    {(item.category === selectedCategory) &&
                        <div>
                            {item.title}
                        </div>
                    }
                )} */}
            </div>
        </div>
    );
}