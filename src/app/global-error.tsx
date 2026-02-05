'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { AlertCircle, RefreshCcw } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white dark:bg-gray-900 min-h-screen grid place-items-center px-6 transition-colors duration-200`}>
                <div className="text-center max-w-xl">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-red-600 rounded-3xl shadow-2xl shadow-red-600/30">
                            <AlertCircle className="h-12 w-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
                        System Error
                    </h1>
                    <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-10">
                        A critical system error occurred. We apologize for the inconvenience.
                        Please try refreshing the application.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#1C61E7] px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-[#1C61E7]/90 active:scale-95 transition-all duration-200"
                    >
                        <RefreshCcw className="h-5 w-5" />
                        Refresh Application
                    </button>

                    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-sm text-gray-400 font-medium tracking-tight">THE SKYPEDIA SYSTEM RECOVERY</p>
                        {error.digest && (
                            <p className="mt-2 text-xs font-mono text-gray-400/60 uppercase tracking-widest">DIGEST: {error.digest}</p>
                        )}
                    </div>
                </div>
            </body>
        </html>
    );
}
