"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface ResponsiveAdProps {
  adSlot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto";
  className?: string;
  showLabel?: boolean;
  lazyLoad?: boolean;
}

/**
 * Responsive Ad Component
 * Automatically adjusts size based on screen size
 * Best for top/bottom page positions
 * 
 * Note: lazyLoad prop is accepted but handled by AdBanner internally
 */
const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  adSlot,
  format = "auto",
  className = "",
  showLabel = true,
  lazyLoad = false, // Accept but parameter for future optimization
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full max-w-7xl mx-auto">
        {showLabel && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
            Advertisement
          </p>
        )}
        <AdBanner
          adSlot={adSlot}
          adFormat={format}
          fullWidthResponsive={true}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ResponsiveAd;
