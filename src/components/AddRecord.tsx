"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { AddManual } from "@/components/AddManual";

export default function AddRecord() { 
    const { data: session, status } = useSession();
    const router = useRouter();
    const [ url, setUrl ]= useState('');
    const [ modal, setModal] = useState(false);
    const [ error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleUrl = async (e:any) => {
        e.preventDefault();
        const res = await fetch('/api/sendUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url, manual: false}),
        });

        const data = await res.json();
        if (!data?.success) {
            setError(data.error || "Cannot reach the link due to wrong url or the url prevent us from access. Please try to update manually!")
        } else {
            setUrl("");
            window.location.reload()
        }
    }
    
    useEffect(() => {
            if (status !== "authenticated") return;
            let cancelled = false;
    
            (async () => {
            try {
                setLoading(true);
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
    if (!session?.user) return router.replace('/');   

    return (
        <div>
            <form
                onSubmit={handleUrl}
                className="flex flex-col">
                <label>Enter URL:</label>
                <input 
                    type="text"
                    placeholder=""
                    className="border-darkred/35 border-2 rounded-lg p-2 focus:outline-none focus:border-darkred"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                ></input>
                {error && (
                    <div className="text-sm text-red-500 font-maven">
                        {error}
                    </div>
                )}
                <br></br>
                
                <div className="flex gap-x-5">
                    <button
                        type="submit"
                        className="bg-darkred rounded-xl text-white font-rowdies max-w-40 p-1 px-2 self-start hover:scale-105 transition hover:bg-white hover:text-darkred hover:border-darkred border-2"
                    >
                        Auto Record
                    </button>
                    <button
                        type="button"
                        className="bg-darkred rounded-xl text-white font-rowdies max-w-40 p-1 px-2 self-start hover:scale-105 transition hover:bg-white hover:text-darkred hover:border-darkred border-2"
                        onClick={() => setModal(true)}
                    >
                        Manual Record
                    </button>
                </div>
                 
            </form>
            {modal && <AddManual onClose={() => setModal(false)} url={url} setUrl={setUrl}/>}
        </div>
    );
}