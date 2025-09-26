"use client"

import { useState, useEffect } from "react"

export default function FolderBar({categories, setSelectedCategory, selectedCategory} : 
    {
        categories: string[], 
        setSelectedCategory: (value:string) => void, 
        selectedCategory: string 
    }) {

        return(
        <div
                id="folder-bar"
                className="h-10 w-fit max-w-3/4 bg-gray-400 rounded-2xl flex overflow-x-auto font-rowdies text-darkred"
            >
                {categories.map((item) => (
                <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedCategory(item)}
                    className={`h-full px-4 rounded-2xl truncate flex items-center justify-center mx-1 ${
                    selectedCategory === item ? "bg-orange-500  text-white" : "bg-red-600 text-white/90"
                    }`}
                >
                    {item}
                </button>
                ))}
                <button
                type="button"
                className="h-full ml-auto bg-blue-500 text-white flex justify-center items-center w-10 rounded-2xl mx-1"
                title="Add category"
                >
                +
                </button>
            </div>
        )
    }