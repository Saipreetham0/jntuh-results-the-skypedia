'use client';

import { AdBanner } from '@/components/adsense';

interface InFeedAdProps {
    adSlot: string;
    /**
     * "display" -> standard Display ad (format="auto")
     * "in-feed" -> true In-feed ad (format="fluid" + layout="in-feed")
     * defaults to display to maintain backwards compatibility with homepage usage
     */
    variant?: 'display' | 'in-feed';
    className?: string;
}

export default function InFeedAd({ adSlot, variant = 'display', className = '' }: InFeedAdProps) {
    const isFluid = variant === 'in-feed';

    return (
        <div className={`ad-container rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden ${className}`}>
            <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
                    Sponsored
                </p>
            </div>
            <div className="p-4">
                <AdBanner 
                    adSlot={adSlot} 
                    adFormat={isFluid ? "fluid" : "auto"}
                    adLayout={isFluid ? "in-feed" : undefined}
                    fullWidthResponsive={!isFluid}
                />
            </div>
        </div>
    );
}
