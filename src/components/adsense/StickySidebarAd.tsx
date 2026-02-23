"use client";

import React, { useEffect, useState } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface StickySidebarAdProps {
    adSlot: string;
    className?: string;
    top?: string | number;
}

/**
 * Sticky Sidebar Ad Component
 * A vertical ad unit that sticks to the top of the sidebar while scrolling.
 * 
 * Usage:
 * <StickySidebarAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_STICKY} />
 */
const StickySidebarAd: React.FC<StickySidebarAdProps> = ({
    adSlot,
    className = "",
    top = "100px",
}) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [adLoaded, setAdLoaded] = useState(false);
    const adRef = React.useRef<HTMLModElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMounted || !isDesktop || adLoaded || typeof window === 'undefined' || !adRef.current) return;
        try {
            if (!window.adsbygoogle) {
                window.adsbygoogle = [];
            }

            if (
                adRef.current.getAttribute('data-adsbygoogle-status') ||
                adRef.current.getAttribute('data-ad-status') ||
                adRef.current.children.length > 0
            ) {
                setAdLoaded(true);
                return;
            }

            if (adRef.current.offsetWidth === 0) {
                const observer = new ResizeObserver((entries) => {
                    for (let entry of entries) {
                        const node = entry.target as HTMLElement;
                        if (node.offsetWidth > 0) {
                            observer.disconnect();
                            try {
                                window.adsbygoogle.push({});
                                setAdLoaded(true);
                            } catch (e) {
                                console.error('Error loading sticky sidebar ad after resize:', e);
                            }
                        }
                    }
                });
                observer.observe(adRef.current);
                return;
            }

            window.adsbygoogle.push({});
            setAdLoaded(true);
        } catch (error) {
            console.error('Error loading sticky sidebar ad:', error);
        }
    }, [isMounted, isDesktop, adLoaded]);

    if (!isMounted) return null;

    if (!isDesktop) return null;

    return (
        <div
            className={`sticky z-10 hidden lg:block ${className}`}
            style={{ top: typeof top === 'number' ? `${top}px` : top }}
        >
            <div className="text-center mb-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">Advertisement</span>
            </div>
            <div className="bg-gray-50/50 dark:bg-gray-800/20 rounded-xl overflow-hidden min-h-[600px] flex items-center justify-center border border-gray-100 dark:border-gray-800">
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{
                        display: "block",
                        minWidth: "160px",
                        maxWidth: "300px",
                        minHeight: "600px"
                    }}
                    data-ad-client={AD_SLOTS.PUBLISHER_ID}
                    data-ad-slot={adSlot}
                    data-ad-format="vertical"
                    data-full-width-responsive="false"
                />
            </div>
        </div>
    );
};

export default StickySidebarAd;
