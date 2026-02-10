"use client";

import React, { useState, useEffect } from "react";
import { Bell, ChevronRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Mock data - In production this could fetch from /api/notifications
const NOTIFICATIONS = [
    { id: 1, text: "JNTUH B.Tech 4-1 R18 Regular/Supply Results Released", isNew: true, type: "result" },
    { id: 2, text: "B.Tech 3-2 R18 Recounting/Revaluation Results Out", isNew: true, type: "result" },
    { id: 3, text: "Check your Consolidated Marks Memo (CMM) instantly!", isNew: false, type: "info" },
    { id: 4, text: "Updated Regulation R22 Syllabus now available", isNew: false, type: "resource" },
];

const NotificationTicker = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotate notifications
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        }, 5000); // Change every 5 seconds for better readability

        return () => clearInterval(timer);
    }, [isPaused]);

    return (
        <div className="relative overflow-hidden bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800/60 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Enhanced Live Indicator */}
                    <div className="flex-shrink-0 flex items-center pr-4 border-r border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 px-2.5 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Ticker Content */}
                    <div
                        className="flex-grow overflow-hidden relative h-6 sm:h-7"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center"
                            >
                                <div className="flex items-center gap-3 w-full group cursor-pointer">
                                    {NOTIFICATIONS[currentIndex].type === 'result' ? (
                                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                    )}

                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-[#1C61E7] dark:group-hover:text-blue-400 transition-colors">
                                        {NOTIFICATIONS[currentIndex].text}
                                    </p>

                                    {NOTIFICATIONS[currentIndex].isNew && (
                                        <motion.span
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-[#1C61E7] text-white shadow-lg shadow-blue-500/20"
                                        >
                                            NEW
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Interactive View All Button */}
                    <Link
                        href="/notifications"
                        className="hidden md:flex flex-shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#1C61E7] hover:bg-[#1C61E7]/5 px-3 py-1.5 rounded-lg transition-all"
                    >
                        All Updates
                        <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Mobile Icon Button */}
                    <Link
                        href="/notifications"
                        className="md:hidden flex-shrink-0 p-1.5 text-gray-400 hover:text-[#1C61E7] transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Decorative gradient overlay for edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent pointer-events-none hidden md:block"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent pointer-events-none hidden md:block"></div>
        </div>
    );
};

export default NotificationTicker;
