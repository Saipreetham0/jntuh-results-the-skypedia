"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface InContentAdProps {
  adSlot: string;
  className?: string;
  label?: string;
}

/**
 * In-Content Ad Component
 * For placing ads within article/page content
 * Higher viewability and CTR
 */
const InContentAd: React.FC<InContentAdProps> = ({
  adSlot,
  className = "",
  label = "Advertisement",
}) => {
  return (
    <div className={`my-8 flex flex-col items-center ${className}`}>
      <div className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border-2 border-dashed border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 font-medium">
          {label}
        </p>
        <AdBanner
          adSlot={adSlot}
          adFormat="rectangle"
          fullWidthResponsive={true}
        />
      </div>
    </div>
  );
};

export default InContentAd;
