"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface InContentAdProps {
  adSlot: string;
  /**
   * "display"    → format=auto  (default, for INLINE_1, INLINE_2, etc.)
   * "in-article" → format=fluid + layout=in-article (for IN_ARTICLE_1/2, IN_CONTENT slots)
   * "in-feed"    → format=fluid + layout=in-feed
   */
  variant?: "display" | "in-article" | "in-feed";
  className?: string;
  label?: string;
}

const InContentAd: React.FC<InContentAdProps> = ({
  adSlot,
  variant = "display",
  className = "",
  label = "Advertisement",
}) => {
  const isFluid = variant !== "display";

  return (
    <div className={`my-8 w-full ${className}`}>
      <div className="w-full max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border-2 border-dashed border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 font-medium">
          {label}
        </p>
        <AdBanner
          adSlot={adSlot}
          adFormat={isFluid ? "fluid" : "auto"}
          adLayout={variant === "in-article" ? "in-article" : variant === "in-feed" ? "in-feed" : undefined}
          fullWidthResponsive={!isFluid}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default InContentAd;
