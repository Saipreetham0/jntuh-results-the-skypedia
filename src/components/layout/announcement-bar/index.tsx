"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ChevronRight, Bell, Megaphone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  message?: string;
  link?: string;
  bgColor?: string;
  textColor?: string;
  isDismissible?: boolean;
  duration?: number | null;
  icon?: "sparkles" | "bell" | "megaphone" | "none";
  showCTA?: boolean;
  ctaText?: string;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "🚀 NEW: Check your Backlogs & Consolidated Results now available!",
  link = "/check-backlogs",
  bgColor = "bg-[#1C61E7]",
  textColor = "text-white",
  isDismissible = true,
  duration = null, // Set to null effectively disabling auto-dismiss by default for better UX unless specified
  icon = "sparkles",
  showCTA = true,
  ctaText = "Explore Now",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check session storage if needed in future to persist dismissal
  }, []);

  // Handle auto-dismiss
  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  if (!isMounted) return null;

  const IconComponent =
    icon === "sparkles"
      ? Sparkles
      : icon === "bell"
        ? Bell
        : icon === "megaphone"
          ? Megaphone
          : null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} // Smooth ease-out cubic
          className={`relative z-50 overflow-hidden ${bgColor} ${textColor} border-b border-white/10 shadow-lg backdrop-blur-md`}
        >
          {/* subtle animated texture/gloss */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between py-2.5 sm:py-3 gap-3">
              {/* Content Container */}
              <div className="flex items-center gap-3 flex-1 min-w-0 justify-center sm:justify-start">
                {IconComponent && (
                  <div className="hidden sm:flex flex-shrink-0 w-8 h-8 rounded-full bg-white/10 items-center justify-center animate-pulse">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                )}

                {link ? (
                  <Link
                    href={link}
                    className="flex items-center gap-2 group min-w-0"
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-wide truncate">
                      {message}
                    </span>
                    {showCTA && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider group-hover:bg-white/30 transition-colors">
                        {ctaText}
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </Link>
                ) : (
                  <span className="text-xs sm:text-sm font-semibold tracking-wide truncate">
                    {message}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Mobile CTA (only if link exists) */}
                {link && showCTA && (
                  <Link
                    href={link}
                    className="sm:hidden inline-flex items-center justify-center px-3 py-1 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
                  >
                    View
                  </Link>
                )}

                {isDismissible && (
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4 opacity-80 hover:opacity-100" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;