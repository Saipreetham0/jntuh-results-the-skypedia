"use client";

import React, { useEffect, useRef } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  publisherId?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  publisherId = AD_SLOTS.PUBLISHER_ID,
  style,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !adRef.current) return;

    // Already processed by AdSense (e.g. StrictMode second mount)
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
        console.error(`AdBanner (slot ${adSlot}):`, e?.message ?? e);
      }
    };

    if (adRef.current.offsetWidth > 0) {
      doPush();
      return;
    }

    // Container has zero width — wait for layout before pushing
    const observer = new ResizeObserver(() => {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        observer.disconnect();
        doPush();
      }
    });
    observer.observe(adRef.current);

    return () => observer.disconnect();
  }, [adSlot]);

  const minHeight =
    adFormat === "vertical" ? "600px" :
    adFormat === "horizontal" ? "90px" : "250px";

  return (
    <div
      className={`w-full ${className}`}
      style={{ minHeight, ...style }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
};

export default AdBanner;
