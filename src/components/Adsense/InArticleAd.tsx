"use client";

import React from "react";
import AdBanner from "./AdBanner";

interface InArticleAdProps {
  adSlot: string;
  className?: string;
  label?: string;
  layout?: "fluid" | "default";
}

/**
 * In-Article Display Ad Component
 * Optimized for Google AdSense In-Article ads
 * These ads are specifically designed to be placed within article content
 *
 * Key Features:
 * - Uses "fluid" ad format for seamless integration
 * - Native-like appearance that matches article styling
 * - Higher engagement and CTR compared to standard display ads
 *
 * Usage:
 * <InArticleAd adSlot={AD_SLOTS.BLOG.IN_ARTICLE_1} />
 */
const InArticleAd: React.FC<InArticleAdProps> = ({
  adSlot,
  className = "",
  label = "Advertisement",
  layout = "fluid",
}) => {
  return (
    <div className={`my-6 flex flex-col items-center ${className}`}>
      {/* Subtle label */}
      <div className="w-full max-w-4xl">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 text-center mb-1 uppercase tracking-wider">
          {label}
        </p>

        {/* Ad Container with fluid layout */}
        <div className="w-full overflow-hidden">
          <AdBanner
            adSlot={adSlot}
            adFormat={layout === "fluid" ? "fluid" : "auto"}
            fullWidthResponsive={true}
            style={{
              display: "block",
              textAlign: "center",
              minHeight: layout === "fluid" ? "0" : "250px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InArticleAd;
