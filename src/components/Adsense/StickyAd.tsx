"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface StickyAdProps {
  adSlot: string;
  position?: "sidebar" | "footer";
  className?: string;
}

/**
 * Sticky Ad Component for Sidebar or Footer
 * Best for desktop revenue optimization
 */
const StickyAd: React.FC<StickyAdProps> = ({
  adSlot,
  position = "sidebar",
  className = "",
}) => {
  const stickyClass = position === "sidebar"
    ? "sticky top-20 hidden lg:block"
    : "sticky bottom-0 z-40";

  return (
    <div className={`${stickyClass} ${className}`}>
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-1">
          Advertisement
        </p>
        <AdBanner
          adSlot={adSlot}
          adFormat={position === "sidebar" ? "vertical" : "auto"}
          fullWidthResponsive={true}
        />
      </div>
    </div>
  );
};

export default StickyAd;
