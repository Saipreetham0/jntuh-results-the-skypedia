// components/Adsense/AdBanner.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  publisherId?: string;
  style?: React.CSSProperties;
}

// Define the structure for adsbygoogle
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
  const [isMounted, setIsMounted] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || adLoaded || typeof window === "undefined" || !adRef.current) {
      return;
    }

    try {
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      // React 18 StrictMode remount guard: AdSense mutates the DOM by adding status flags.
      // If flags are present, Google already processed this INS tag.
      if (
        adRef.current.getAttribute('data-adsbygoogle-status') ||
        adRef.current.getAttribute('data-ad-status') ||
        adRef.current.children.length > 0
      ) {
        setAdLoaded(true);
        return;
      }

      // availableWidth=0 Error Fix:
      // Adsense requires the container to have actual width before rendering.
      if (adRef.current.offsetWidth === 0) {
        const observer = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const node = entry.target as HTMLElement;
            if (node.offsetWidth > 0) {
              observer.disconnect();
              try {
                console.log(`AdBanner: Pushing ad for slot ${adSlot} after resize`);
                window.adsbygoogle.push({});
                setAdLoaded(true);
              } catch (e: any) {
                console.error(`AdBanner Error after resize (Slot ${adSlot}):`, e?.message || e);
              }
            }
          }
        });
        observer.observe(adRef.current);
        return;
      }

      console.log(`AdBanner: Pushing ad for slot ${adSlot}`);
      window.adsbygoogle.push({});
      setAdLoaded(true);
    } catch (error: any) {
      console.error(`AdBanner Error (Slot ${adSlot}):`, error?.message || error);
    }
  }, [adSlot, isMounted, adLoaded]);

  // Handle min-height for layout stability
  const getMinHeight = () => {
    if (adFormat === "vertical") return "600px";
    if (adFormat === "rectangle") return "250px";
    if (adFormat === "horizontal") return "90px";
    return "250px";
  };

  if (!isMounted) {
    return (
      <div
        className={`result-box-container my-4 ${className}`}
        style={{ minHeight: getMinHeight(), width: '100%', backgroundColor: 'rgba(249, 250, 251, 0.05)', ...style }}
      />
    );
  }

  return (
    <div className={`result-box-container my-4 ${className}`}
      style={{ minHeight: getMinHeight(), width: '100%', backgroundColor: 'rgba(249, 250, 251, 0.05)', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        data-adtest={process.env.NODE_ENV === 'development' ? 'on' : undefined}
      />
    </div>
  );
};

export default AdBanner;
