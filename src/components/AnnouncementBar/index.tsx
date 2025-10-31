"use client";

import { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight, Bell } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  message?: string;
  link?: string;
  bgColor?: string;
  textColor?: string;
  isDismissible?: boolean;
  duration?: number | null;
  icon?: 'sparkles' | 'bell' | 'none';
  showCTA?: boolean;
  ctaText?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "🚀 NEW: Check your Backlogs & Consolidated Results now available!",
  link = "/check-backlogs",
  bgColor = "bg-gradient-to-r from-[#1C61E7] to-[#1C61E7]/90",
  textColor = "text-white",
  isDismissible = true,
  duration = null,
  icon = 'sparkles',
  showCTA = true,
  ctaText = "Explore Now",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Handle auto-dismiss if duration is provided
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  // Entrance animation
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  const IconComponent = icon === 'sparkles' ? Sparkles : icon === 'bell' ? Bell : null;

  return (
    <div
      className={`
        ${bgColor}
        ${textColor}
        relative
        overflow-hidden
        shadow-md
        border-b-2 border-white/10
        transition-all duration-300 ease-out
        ${isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Left side - Icon + Message */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {IconComponent && (
              <div className="flex-shrink-0 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
            )}

            {link ? (
              <Link
                href={link}
                className="
                  flex items-center gap-2 group
                  text-sm sm:text-base font-medium
                  hover:opacity-90 transition-opacity
                  flex-1 min-w-0
                "
              >
                <span className="truncate">{message}</span>
                {showCTA && (
                  <span className="
                    hidden sm:inline-flex items-center gap-1
                    px-3 py-1 rounded-lg
                    bg-white/20 backdrop-blur-sm
                    text-xs font-semibold
                    hover:bg-white/30 hover:scale-105
                    transition-all duration-200
                    shadow-sm
                  ">
                    {ctaText}
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                )}
              </Link>
            ) : (
              <span className="text-sm sm:text-base font-medium truncate flex-1">
                {message}
              </span>
            )}
          </div>

          {/* Right side - CTA button (mobile) + Dismiss */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile CTA button */}
            {showCTA && link && (
              <Link
                href={link}
                className="
                  sm:hidden
                  inline-flex items-center gap-1
                  px-3 py-1.5 rounded-lg
                  bg-white/20 backdrop-blur-sm
                  text-xs font-semibold
                  hover:bg-white/30 hover:scale-105
                  transition-all duration-200
                  shadow-sm
                "
              >
                View
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}

            {/* Dismiss button */}
            {isDismissible && (
              <button
                onClick={handleDismiss}
                className="
                  flex-shrink-0
                  p-1.5 rounded-lg
                  hover:bg-white/20
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/50
                  transition-all duration-200
                  hover:scale-110
                  group
                "
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
};

export default AnnouncementBar;