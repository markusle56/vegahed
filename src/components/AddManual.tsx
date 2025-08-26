"use client"

import { useState } from "react";
export function AddManual({ onClose, url, setUrl } : {onClose: () => void, url: string, setUrl: (value: string) => void}) {   
    const [ title, setTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ error, setError ] = useState('');
    const handleUrl = async (e:any) => {
        e.preventDefault();
        const res = await fetch('/api/sendUrl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url, manual: true, title: title, description: description}),
        });

        const data = await res.json();
        if (!data?.success) {
            setError(data.error || "Cannot reach the link due to wrong url or the url prevent us from access. Please try to update manually!")
        } else {
            setUrl("");
            window.location.reload()
        }
    }
    return (
        <>
            <div className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent z-100">
                <div onClick={onClose} className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"></div>

                <div className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                <div onClick={(e) => e.stopPropagation()} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10 ">
                    <div  className="bg-white dark:bg-gray-800">
                        <div className="sm:flex sm:items-start">
                            <form className="flex flex-col p-5 w-full" onSubmit={handleUrl}>
                                <h3 className="font-rowdies text-2xl self-center">Manual Record</h3>
                                <br></br>
                                <label>URL</label>
                                <input 
                                    className="outline-2 outline-darkred/75 rounded-lg text-xl p-2 truncate"
                                    type="text"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    required
                                ></input>
                                <br></br>
                                <label>Title</label>
                                <input 
                                    className="outline-2 outline-darkred/75 rounded-lg text-xl p-2"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                ></input>
                                <br></br>
                                <label>Description</label>
                                <textarea 
                                    className="outline-2 outline-darkred/75 rounded-lg text-xl h-40 p-2 overflow-auto"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                ></textarea>
                            </form>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700/25">
                            <button type="submit"  className="inline-flex w-full justify-center rounded-md bg-darkred px-3 py-2 text-sm font-rowdies text-white shadow-xs sm:ml-3 sm:w-auto dark:bg-darkred dark:shadow-white">Record</button>
                            <button type="button" onClick={onClose} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-rowdies text-darkred shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20">Cancel</button>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </>
    )
};