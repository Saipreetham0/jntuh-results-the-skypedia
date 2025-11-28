"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface ResponsiveAdProps {
  adSlot: string;
  format?: "horizontal" | "vertical" | "rectangle" | "auto";
  className?: string;
  showLabel?: boolean;
}

/**
 * Responsive Ad Component
 * Automatically adjusts size based on screen size
 * Best for top/bottom page positions
 */
const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  adSlot,
  format = "auto",
  className = "",
  showLabel = true,
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-7xl">
        {showLabel && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
            Advertisement
          </p>
        )}
        <AdBanner
          adSlot={adSlot}
          adFormat={format}
          fullWidthResponsive={true}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default ResponsiveAd;
