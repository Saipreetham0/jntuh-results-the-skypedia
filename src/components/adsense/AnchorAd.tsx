"use client";

import React, { useEffect, useRef, useState } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface AnchorAdProps {
  adSlot: string;
  className?: string;
}

const AnchorAd: React.FC<AnchorAdProps> = ({ adSlot, className = "" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || !isMobile || !isVisible || pushed.current || !adRef.current) return;

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
        console.error(`AnchorAd (slot ${adSlot}):`, e?.message ?? e);
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
  }, [mounted, isMobile, isVisible, adSlot]);

  if (!mounted || !isMobile || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl border-t-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 ${className}`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 z-10 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Close ad"
      >
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-center pt-1">
        <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">Advertisement</p>
      </div>

      <div className="w-full flex justify-center items-center min-h-[50px] pb-2">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "50px", maxHeight: "100px" }}
          data-ad-client={AD_SLOTS.PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AnchorAd;
