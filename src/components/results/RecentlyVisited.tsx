"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
// We'll reuse the icons from the main file, but we need to map URLs to icons or just use a generic one if not passed props
// For simplicity in this separated component, we'll use a clean text-based pill design or simple icons.

interface VisitedItem {
    title: string;
    url: string;
    timestamp: number;
}

const RecentlyVisited: React.FC = () => {
    const [items, setItems] = useState<VisitedItem[]>([]);

    useEffect(() => {
        // Load from local storage
        try {
            const stored = localStorage.getItem("skypedia_recent_tools");
            if (stored) {
                setItems(JSON.parse(stored).slice(0, 3)); // Limit to 3 items
            }
        } catch (e) {
            console.error("Failed to load recently visited items", e);
        }
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="mb-8 animate-fade-in">
            <div className="flex items-center mb-3">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Recently Visited
                </h3>
            </div>
            <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                    <Link
                        key={item.url}
                        href={item.url}
                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentlyVisited;

// Helper function to add item to history (to be exported and used in parent)
export const addToHistory = (title: string, url: string) => {
    try {
        const stored = localStorage.getItem("skypedia_recent_tools");
        let items: VisitedItem[] = stored ? JSON.parse(stored) : [];

        // Remove if exists (to move to top)
        items = items.filter(i => i.url !== url);

        // Add to front
        items.unshift({ title, url, timestamp: Date.now() });

        // Limit to 5 stored
        items = items.slice(0, 5);

        localStorage.setItem("skypedia_recent_tools", JSON.stringify(items));
    } catch (e) {
        console.error("Failed to save visited item", e);
    }
};
