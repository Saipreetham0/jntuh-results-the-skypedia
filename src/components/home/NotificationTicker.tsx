"use client";

import React from "react";
import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data - In production this could fetch from /api/notifications
const NOTIFICATIONS = [
    { id: 1, text: "JNTUH B.Tech 4-1 R18 Regular/Supply Results Released", isNew: true },
    { id: 2, text: "B.Tech 3-2 R18 Recounting/Revaluation Results Out", isNew: true },
    { id: 3, text: "Check your Consolidated Marks Memo (CMM) instantly!", isNew: false },
    { id: 4, text: "Updated Regulation R22 Syllabus now available", isNew: false },
];

const NotificationTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate notifications
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center">
                    {/* Label */}
                    <div className="flex-shrink-0 flex items-center pr-4 border-r border-gray-200 dark:border-gray-700">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Live Updates
                        </span>
                    </div>

                    {/* Ticker Content */}
                    <div className="flex-grow pl-4 overflow-hidden relative h-6">
                        {NOTIFICATIONS.map((note, index) => (
                            <div
                                key={note.id}
                                className={`absolute top-0 left-4 w-full transition-all duration-500 transform ${index === currentIndex
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-8 opacity-0"
                                    }`}
                            >
                                <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                    {note.text}
                                    {note.isNew && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            NEW
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Details Link */}
                    <Link
                        href="/notifications"
                        className="hidden sm:flex flex-shrink-0 items-center text-xs font-semibold text-[#1C61E7] hover:text-[#1650c4] transition-colors ml-4"
                    >
                        View All
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotificationTicker;
