"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";

interface VisitedItem {
  title: string;
  url: string;
  timestamp: number;
}

const RecentlyVisited: React.FC = () => {
  const [items, setItems] = useState<VisitedItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("skypedia_recent_tools");
      if (stored) {
        setItems(JSON.parse(stored).slice(0, 4));
      }
    } catch {
      // localStorage unavailable (SSR / private browsing) — silent fail
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-1.5 mb-3">
        <Clock className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
          Recently visited
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="inline-flex items-center px-3.5 py-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-[#1C61E7]/40 hover:text-[#1C61E7] dark:hover:text-blue-400 transition-all duration-150"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyVisited;

export const addToHistory = (title: string, url: string) => {
  try {
    const stored = localStorage.getItem("skypedia_recent_tools");
    let items: VisitedItem[] = stored ? JSON.parse(stored) : [];
    items = items.filter(i => i.url !== url);
    items.unshift({ title, url, timestamp: Date.now() });
    localStorage.setItem("skypedia_recent_tools", JSON.stringify(items.slice(0, 5)));
  } catch {
    // localStorage unavailable — silent fail
  }
};
