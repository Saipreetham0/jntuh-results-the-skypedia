import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 rounded-full border-4 border-gray-100 dark:border-gray-800 animate-pulse"></div>

                {/* Spinning Ring */}
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-[#1C61E7] border-t-transparent animate-spin"></div>

                {/* Pulse Logo Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#21C15E] rounded-full animate-ping"></div>
            </div>

            <div className="mt-8 text-center space-y-2 animate-pulse">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    Loading JNTUH Portal
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
                    Searching academic records...
                </p>
            </div>

            {/* Skeleton placeholders for standard page structure */}
            <div className="w-full max-w-4xl mt-12 space-y-6">
                <div className="h-40 w-full bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
