'use client';

import { useEffect, useState } from 'react';
import { AD_SLOTS } from '@/config/adSlots';

/**
 * AdSense Debug Component
 * 
 * Visualizes the state of AdSense integration.
 * Use this to troubleshoot "Ads not working" issues.
 */
export default function AdDebug() {
    const [status, setStatus] = useState<any>({
        loaded: false,
        scriptFound: false,
        publisherId: AD_SLOTS.PUBLISHER_ID,
        adUnits: 0,
        filledUnits: 0,
        errors: [],
        windowObj: false,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run in client
        if (typeof window === 'undefined') return;

        const checkStatus = () => {
            const script = document.getElementById('adsbygoogle-init');
            const ads = document.querySelectorAll('.adsbygoogle');
            const filled = document.querySelectorAll('.adsbygoogle[data-ad-status="filled"]');
            const winObj = (window as any).adsbygoogle;

            setStatus({
                loaded: !!script,
                scriptFound: !!script,
                publisherId: AD_SLOTS.PUBLISHER_ID,
                adUnits: ads.length,
                filledUnits: filled.length,
                windowObj: !!winObj,
                isArray: Array.isArray(winObj),
                length: Array.isArray(winObj) ? winObj.length : 'N/A',
            });
        };

        // Check periodically
        const interval = setInterval(checkStatus, 2000);
        checkStatus();

        return () => clearInterval(interval);
    }, []);

    if (process.env.NODE_ENV !== 'development' && !isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 font-mono text-xs">
            <button
                onClick={() => setIsVisible(!isVisible)}
                className="bg-red-600 text-white px-3 py-1 rounded shadow-lg hover:bg-red-700 transition-colors"
            >
                {isVisible ? 'Hide Ad Debug' : 'Ad Debug'}
            </button>

            {isVisible && (
                <div className="bg-black/90 text-green-400 p-4 rounded mt-2 w-80 shadow-2xl border border-green-900">
                    <h3 className="font-bold border-b border-green-800 pb-2 mb-2 text-white">AdSense Diagnostic</h3>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Script Loaded:</span>
                            <span className={status.scriptFound ? 'text-green-500' : 'text-red-500'}>
                                {status.scriptFound ? 'YES' : 'NO'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>window.adsbygoogle:</span>
                            <span className={status.windowObj ? 'text-green-500' : 'text-red-500'}>
                                {status.windowObj ? 'YES' : 'NO'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Queue Length:</span>
                            <span>{status.length}</span>
                        </div>

                        <div className="flex justify-between border-t border-gray-800 pt-2">
                            <span>Ad Units Found:</span>
                            <span className="text-white">{status.adUnits}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Filled Units:</span>
                            <span className={status.filledUnits > 0 ? 'text-green-500' : 'text-yellow-500'}>
                                {status.filledUnits}
                            </span>
                        </div>

                        <div className="mt-2 text-gray-500 text-[10px] break-all">
                            Pub ID: {status.publisherId}
                        </div>

                        {status.adUnits > 0 && status.filledUnits === 0 && (
                            <div className="mt-2 p-2 bg-red-900/30 text-red-300 rounded border border-red-900/50">
                                <strong>Potential Issues:</strong>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    <li>Account not approved yet</li>
                                    <li>Ad blocker active</li>
                                    <li>Script blocked by CSP</li>
                                    <li>Invalid Publisher ID</li>
                                    <li>New domain (wait 2-4 weeks)</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
