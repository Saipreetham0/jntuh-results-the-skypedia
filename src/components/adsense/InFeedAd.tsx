'use client';

import { ResponsiveAd } from '@/components/adsense';

interface InFeedAdProps {
    adSlot: string;
    className?: string;
}

export default function InFeedAd({ adSlot, className = '' }: InFeedAdProps) {
    return (
        <div className={`ad-container rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden ${className}`}>
            <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
                    Sponsored
                </p>
            </div>
            <div className="p-4">
                <ResponsiveAd adSlot={adSlot} format="auto" />
            </div>
        </div>
    );
}
