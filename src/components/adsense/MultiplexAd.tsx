"use client";

import React, { useEffect, useRef } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface MultiplexAdProps {
  adSlot: string;
  className?: string;
}

const MultiplexAd: React.FC<MultiplexAdProps> = ({ adSlot, className = "" }) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !adRef.current) return;

    if (
      adRef.current.getAttribute("data-adsbygoogle-status") ||
      adRef.current.getAttribute("data-ad-status")
    ) {
      pushed.current = true;
      return;
    }

    const doPush = () => {
      if (pushed.current) return;
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e: any) {
        console.error(`MultiplexAd (slot ${adSlot}):`, e?.message ?? e);
      }
    };

    if (adRef.current.offsetWidth > 0) {
      doPush();
      return;
    }

    const observer = new ResizeObserver(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        observer.disconnect();
        doPush();
      }
    });
    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [adSlot]);

  return (
    <div className={`w-full my-6 ${className}`}>
      <div className="text-center mb-2">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">
          Recommended for you
        </p>
      </div>
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center", minHeight: "200px" }}
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
