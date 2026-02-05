// HMR FINAL REFRESH ATTEMPT 4
// TIMESTAMP: 2026-02-05 13:28
// RANDOM HASH: a1b2c3d4e5f6
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <main className="grid min-h-[70vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 transition-colors duration-200">
            <div className="text-center max-w-xl">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full blur-2xl animate-pulse" />
                        <div className="relative p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-red-50 dark:border-red-900/30">
                            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-500" />
                        </div>
                    </div>
                </div>

                <p className="text-sm font-bold text-red-600 dark:text-red-500 uppercase tracking-widest mb-2">Unexpected Error</p>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white mb-6">
                    Something went wrong!
                </h1>
                <p className="text-base leading-7 text-gray-600 dark:text-gray-400 mb-10">
                    An unexpected error occurred while rendering this page. Our team has been notified, and we're working to fix it.
                    {error.digest && (
                        <span className="block mt-2 text-xs font-mono text-gray-400">Error ID: {error.digest}</span>
                    )}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="flex items-center gap-2 rounded-xl bg-[#1C61E7] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1C61E7]/90 active:scale-95 transition-all duration-200"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all duration-200"
                    >
                        <Home className="h-4 w-4" />
                        Return Home
                    </Link>
                </div>

                <div className="mt-16 flex items-center justify-center gap-3 grayscale opacity-50">
                    <span className="text-sm font-bold text-gray-500 tracking-tight">THE SKYPEDIA</span>
                </div>
            </div>
        </main>
    );
}
