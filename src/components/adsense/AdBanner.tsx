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
      // Check if element exists and has width
      if (!adRef.current) return;

      // If width is 0, the container is likely hidden or not yet rendered.
      // Retry after a short delay to allow layout to settle.
      if (adRef.current.offsetWidth === 0) {
        console.warn("AdBanner: Ad slot has 0 width, retrying in 100ms...");
        setTimeout(loadAd, 100);
        return;
      }

      try {
        // Initialize adsbygoogle array if it doesn't exist
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Push the ad configuration
        window.adsbygoogle.push({});
        setAdLoaded(true);
        setAdError(false);
      } catch (error: any) {
        console.error("Error loading Google AdSense ad:", error);

        // Don't retry immediately if it's a tag error (likely permanent or config issue),
        // but for now we'll keep the retry logic for consistency
        setAdError(true);

        // Retry after 2 seconds
        setTimeout(() => {
          setAdLoaded(false);
          // Only retry if it wasn't a "no slot size" error (which we now prevent)
          if (!error?.message?.includes('No slot size')) {
            loadAd();
          }
        }, 2000);
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
    <div className={`text-center my-4 min-h-[250px] bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center ${className}`}>
      {/* Label for better UX */}
      {!adLoaded && (
        <span className="text-xs text-gray-400 absolute">Advertisement</span>
      )}
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
