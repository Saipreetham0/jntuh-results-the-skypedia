import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Skeleton */}
            <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <Skeleton className="h-8 w-48 mb-6 rounded-full" />
                    <Skeleton className="h-12 md:h-16 w-full max-w-2xl mb-6 rounded-2xl" />
                    <Skeleton className="h-6 w-full max-w-lg rounded-xl" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                {/* Search/Input Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3 space-y-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>
                        <div className="flex flex-col justify-end">
                            <Skeleton className="h-14 w-full rounded-2xl" />
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="py-12 space-y-12">
                    {/* Live Updates Section */}
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64 rounded-xl" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
                            ))}
                        </div>
                    </div>

                    {/* Blog/Resources Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-48 rounded-xl" />
                            <Skeleton className="h-4 w-24 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-4 flex flex-col h-full bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <Skeleton className="h-4 w-20 rounded-lg" />
                                    <Skeleton className="h-6 w-full rounded-xl" />
                                    <Skeleton className="h-20 w-full rounded-xl" />
                                    <div className="mt-auto pt-4 flex justify-between">
                                        <Skeleton className="h-4 w-24 rounded-lg" />
                                        <Skeleton className="h-4 w-16 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

