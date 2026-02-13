"use client";

import React, { useEffect, useState } from "react";
import { AD_SLOTS } from "@/config/adSlots";

interface AnchorAdProps {
  adSlot: string;
  className?: string;
}

/**
 * Mobile Anchor Ad Component
 * Creates a sticky bottom ad that appears only on mobile devices
 *
 * Features:
 * - Only shows on screens < 768px (mobile)
 * - Sticky positioned at bottom of screen
 * - Collapsible/dismissible by user
 * - Non-intrusive with smooth animations
 *
 * Usage:
 * <AnchorAd adSlot={AD_SLOTS.MOBILE.ANCHOR_BOTTOM} />
 */
const AnchorAd: React.FC<AnchorAdProps> = ({
  adSlot,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMounted || !isMobile || !isVisible) return;

    // Load AdSense ad
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading anchor ad:', error);
    }
  }, [isMounted, isMobile, isVisible]);

  // Don't render on server
  if (!isMounted) return null;

  // Don't render on desktop
  if (!isMobile) return null;

  // Don't render if dismissed
  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-2xl border-t-2 border-gray-200 dark:border-gray-700 transition-transform duration-300 ${className}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 z-10 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="Close ad"
      >
        <svg
          className="w-4 h-4 text-gray-600 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Ad label */}
      <div className="text-center pt-1">
        <p className="text-[9px] text-gray-400 dark:text-gray-600 uppercase tracking-wider">
          Advertisement
        </p>
      </div>

      {/* AdSense anchor ad */}
      <div className="w-full flex justify-center items-center min-h-[50px] pb-2">
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            textAlign: "center",
            minHeight: "50px",
            maxHeight: "100px",
          }}
          data-ad-client={AD_SLOTS.PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AnchorAd;
