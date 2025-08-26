"use client";
import React from "react";
interface RecordItem {
  title: string;
  description: string;
  url: string;
  image: string;
}

interface RecentlyRecordProps {
  record: RecordItem[];
}

export default function RecentlyRecord({ record }: RecentlyRecordProps) {
  return (
    <div>
      {record.map((item, idx) => (
        <div
          key={`${item.title}-${idx}`}
          className="mb-2 p-2 border-b last:border-b-0"
        >
            <a
                href={item.url}
                target="_blank"
                className="flex gap-10">
                {item.image && (
                    <img
                        src={item.image}
                        alt={`Image of ${item.title}`}
                        className="w-1/10 object-scale-down rounded-2xl">
                    </img>
                )}
                <div>
                    <div className="truncate font-rowdies w-2/3">{item.title}</div>
                    <div>{item.description}</div>
                </div>
                
            </a>
          
        </div>
      ))}
    </div>
  );
}
