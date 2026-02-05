"use client";
import React, { type JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Home, ArrowLeft, MessageSquare } from "lucide-react";

export default function NotFound(): JSX.Element {
  const router = useRouter();

  return (
    <main className="relative grid min-h-[80vh] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900 transition-colors duration-200">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50/50 dark:bg-green-900/10 rounded-full blur-3xl -z-10" />

      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#1C61E7]/20 rounded-full blur-xl group-hover:bg-[#1C61E7]/30 transition-all duration-300" />
            <div className="relative p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-50 dark:border-gray-800 flex items-center justify-center">
              <Search className="h-10 w-10 text-[#1C61E7]" />
            </div>
          </div>
        </div>

        <p className="text-base font-bold text-[#1C61E7] dark:text-[#1C61E7] uppercase tracking-[0.2em] mb-4">404 Error</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white mb-6">
          Page not found
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
          We looked everywhere, but we couldn't find the page you're looking for. Maybe it was moved or never existed.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-gray-800 px-8 py-4 text-sm font-bold text-gray-900 dark:text-white shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#1C61E7] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-[#1C61E7]/90 active:scale-95 transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            Go back home
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-6">
          <Link
            href="/help"
            className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1C61E7] transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Support
            <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
          </Link>

          <div className="flex items-center gap-2 grayscale opacity-40">
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">TheSkypedia</span>
          </div>
        </div>
      </div>
    </main>
  );
}
