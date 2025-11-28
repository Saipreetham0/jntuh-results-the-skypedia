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
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Prevent multiple loads
    if (adLoaded || typeof window === "undefined" || !adRef.current) {
      return;
    }

    const loadAd = () => {
      try {
        // Initialize adsbygoogle array if it doesn't exist
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Push the ad configuration
        window.adsbygoogle.push({});
        setAdLoaded(true);
        setAdError(false);
      } catch (error) {
        console.error("Error loading Google AdSense ad:", error);
        setAdError(true);

        // Retry after 3 seconds
        setTimeout(() => {
          setAdLoaded(false);
        }, 3000);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);

    return () => clearTimeout(timer);
  }, [adLoaded]);

  // Merge provided className with default styles
  const adStyles = `adsbygoogle ${className}`.trim();

  // Combine default and custom styles
  const adStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    minHeight: "50px",
    ...style,
  };

  return (
    <div className="ad-container w-full">
      <ins
        ref={adRef}
        className={adStyles}
        style={adStyle}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        aria-label="Advertisement"
      />
      {adError && process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-red-500 text-center mt-2">
          Ad failed to load. Retrying...
        </div>
      )}
    </div>
  );
};

export default AdBanner;
