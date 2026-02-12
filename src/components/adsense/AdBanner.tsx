// components/Adsense/AdBanner.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

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
  publisherId = "ca-pub-4870864326886980",
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
      window.adsbygoogle.push({});
      setAdLoaded(true);
    } catch (error) {
      console.error("AdBanner error:", error);
    }
  }, [isMounted, adLoaded]);

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
      />
    </div>
  );
};

export default AdBanner;
