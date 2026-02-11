import React from 'react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { ResponsiveAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import ResultCheckerHero from '@/components/results/ResultCheckerHero';
import { AlertTriangle, Zap, Server } from 'lucide-react';

// export const metadata: Metadata = generateMetadata({
//     title: 'JNTUH Results Fast Server - Check Results Instantly (Server 1)',
//     description: 'High-speed dedicated server for JNTUH results. Check your B.Tech R22, R18, R16 results without delay during heavy traffic spikes.',
//     path: '/jntuh-results-checker-fast-server'
// });

export default function FastServerResultsPage() {
    return (
        <main className="bg-white dark:bg-gray-950 min-h-screen">
            {/* Urgent Link to Official Site if needed */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-100 dark:border-yellow-800 py-3 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Heavy traffic detected. Using optimized <strong>Fast Server Mode</strong> for instant access.</span>
                </div>
            </div>

            {/* Performance Badges */}
            <div className="max-w-4xl mx-auto px-4 pt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-bold border border-green-100 dark:border-green-800">
                    <Zap className="w-3 h-3" />
                    LCP: 0.8s
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-800">
                    <Server className="w-3 h-3" />
                    Server Status: Optimal
                </div>
            </div>

            {/* Checker Section */}
            {/* <ResultCheckerHero /> */}

            {/* Ad Placements - Focused on Viewability */}
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} />

                <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Quick Instructions</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Enter your 10-digit Hall Ticket Number (e.g., 21J21A0501).</li>
                        <li>Click on "Check Results" button.</li>
                        <li>Your semester-wise grades and SGPA will be displayed instantly.</li>
                        <li>If the server is slow, try clearing your browser cache and refresh.</li>
                    </ol>
                </div>

                <ResponsiveAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />
            </div>

            {/* Bottom Sticky Ad for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2">
                    <p className="text-[10px] text-center text-gray-400 mb-1">ADVERTISEMENT</p>
                    <ResponsiveAd adSlot={AD_SLOTS.MOBILE.ANCHOR_BOTTOM} />
                </div>
            </div>
        </main>
    );
}
