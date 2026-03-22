"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
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

const DISMISS_KEY = "announcement_bar_dismissed_v1";

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = "🚀 NEW: Check your Backlogs & Consolidated Results now available!",
  link = "/check-backlogs",
  bgColor = "bg-[#1C61E7]",
  textColor = "text-white",
  isDismissible = true,
  duration = null,
  showCTA = true,
  ctaText = "Learn more",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!dismissed) setIsVisible(true);
  }, []);

  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => handleDismiss(), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const inner = (
    <div className="flex items-center gap-2.5">
      {/* Live indicator */}
      <span className="hidden sm:flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/70">
          New
        </span>
        <span className="w-px h-3 bg-white/20 mx-0.5" />
      </span>

      {/* Message */}
      <span className="font-display text-[13px] font-semibold text-white leading-snug">
        {message}
      </span>

      {/* Inline CTA */}
      {showCTA && (
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-white/80 hover:text-white transition-colors group-hover:text-white">
          {ctaText}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className={`relative z-50 overflow-hidden ${bgColor} border-b border-white/10`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-center py-2.5 min-h-[40px]">

              {/* Centered content */}
              {link ? (
                <Link href={link} className="group flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                  {inner}
                </Link>
              ) : (
                <div className="flex items-center gap-2.5">{inner}</div>
              )}

              {/* Dismiss — absolute right so it never shifts center content */}
              {isDismissible && (
                <button
                  onClick={handleDismiss}
                  aria-label="Dismiss announcement"
                  className="absolute right-0 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
