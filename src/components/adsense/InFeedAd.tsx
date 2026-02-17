'use client';

import { useEffect, useState } from 'react';
import { ResponsiveAd } from '@/components/adsense';

interface InFeedAdProps {
    adSlot: string;
    className?: string;
}

/**
 * InFeedAd Component
 * 
 * Native in-feed ad that matches content card styling.
 * Uses intersection observer for lazy loading to improve performance.
 * Includes skeleton loader to prevent CLS (Cumulative Layout Shift).
 * 
 * Optimized for mobile-first ad revenue with minimal UX impact.
 */
export default function InFeedAd({ adSlot, className = '' }: InFeedAdProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '200px', // Load 200px before entering viewport
            }
        );

        observer.observe(ref);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return (
        <div
            ref={setRef}
            className={`ad-container rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden ${className}`}
        >
            {/* Ad Label */}
            <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
                    Sponsored
                </p>
            </div>

            {/* Ad Content */}
            <div className="p-4">
                {isVisible ? (
                    <ResponsiveAd adSlot={adSlot} format="auto" />
                ) : (
                    // Skeleton loader
                    <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                )}
            </div>
        </div>
    );
}
