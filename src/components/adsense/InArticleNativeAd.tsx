"use client";

import React, { useEffect } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface InArticleNativeAdProps {
    adSlot: string;
    className?: string;
}

/**
 * In-Article Native Ad Component
 * Non-intrusive ads that blend with article content for better CTR.
 * 
 * Usage:
 * <InArticleNativeAd adSlot={AD_SLOTS.BLOG.NATIVE_IN_ARTICLE} />
 */
const InArticleNativeAd: React.FC<InArticleNativeAdProps> = ({
    adSlot,
    className = "",
}) => {
    useEffect(() => {
        try {
            if (typeof window !== "undefined" && window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error("Error loading native in-article ad:", error);
        }
    }, []);

    return (
        <div className={`my-8 bg-white dark:bg-transparent ${className}`}>
            <div className="flex items-center gap-2 mb-2 px-1">
                <div className="h-[1px] flex-grow bg-gray-100 dark:bg-gray-800"></div>
                <span className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold">Suggested for you</span>
                <div className="h-[1px] flex-grow bg-gray-100 dark:bg-gray-800"></div>
            </div>
            <div className="min-h-[200px] flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50/30 dark:bg-gray-900/10">
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "block",
                        textAlign: "center"
                    }}
                    data-ad-layout="in-article"
                    data-ad-format="fluid"
                    data-ad-client={AD_SLOTS.PUBLISHER_ID}
                    data-ad-slot={adSlot}
                />
            </div>
        </div>
    );
};

export default InArticleNativeAd;
