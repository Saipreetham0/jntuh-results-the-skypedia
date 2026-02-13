"use client";

import React, { useEffect, useRef, useState } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface MultiplexAdProps {
  adSlot: string;
  className?: string;
}

/**
 * Multiplex Ad Component
 * Displays multiple ads in a grid layout (3-6 ads)
 *
 * Best for:
 * - Calculator results pages
 * - After form submissions
 * - Below content sections
 *
 * Features:
 * - Auto-relaxed format (Google optimizes grid)
 * - Responsive grid layout
 * - High engagement
 * - Better CTR than single ads
 *
 * Usage:
 * <MultiplexAd adSlot="YOUR_MULTIPLEX_SLOT_ID" />
 *
 * Note: Create a multiplex ad unit in AdSense dashboard:
 * Ads → By ad unit → Multiplex ads
 */
const MultiplexAd: React.FC<MultiplexAdProps> = ({
  adSlot,
  className = "",
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (adLoaded || typeof window === "undefined" || !adRef.current) {
      return;
    }

    const loadAd = () => {
      try {
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }
        window.adsbygoogle.push({});
        setAdLoaded(true);
      } catch (error) {
        console.error("Error loading multiplex ad:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);

    return () => clearTimeout(timer);
  }, [adLoaded]);

  return (
    <div className={`w-full my-6 ${className}`}>
      {/* Ad label */}
      <div className="text-center mb-2">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">
          Recommended for you
        </p>
      </div>

      {/* Multiplex Ad Container */}
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            textAlign: "center",
            minHeight: "200px",
          }}
          data-ad-client={AD_SLOTS.PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format="autorelaxed"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default MultiplexAd;
