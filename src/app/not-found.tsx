"use client";
import React, { type JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoFound(): JSX.Element {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-800">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button

            onClick={() => router.back()}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </button>
          <Link
            href="/help"
            className="text-sm font-semibold text-gray-900 dark:text-white"
          >
            <span>
              Contact support <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
