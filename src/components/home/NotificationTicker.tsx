"use client";

import React, { useState, useEffect } from "react";
import { Bell, ChevronRight, Pause, Play, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Notice {
  title: string;
  releaseDate: string;
  link: string;
}

const NEW_WINDOW_MS = 3 * 24 * 60 * 60 * 1000;

const isRecent = (date: string) => {
  const t = Date.parse(date);
  return !Number.isNaN(t) && Date.now() - t < NEW_WINDOW_MS;
};

const NotificationTicker = () => {
  const [items, setItems] = useState<Notice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetch("/api/notifications?page=1")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setItems(data.slice(0, 5));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const stopped = isPaused || isHovered || !!reduceMotion || items.length < 2;

  useEffect(() => {
    if (stopped) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stopped, items.length]);

  const current = items[currentIndex];

  return (
    <div className="relative overflow-hidden bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800/60 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex-shrink-0 flex items-center pr-4 border-r border-gray-200 dark:border-gray-800">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
              Latest
            </span>
          </div>

          <div
            className="flex-grow overflow-hidden relative h-6 sm:h-7"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-live={stopped ? "polite" : "off"}
          >
            {current ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500/10 shrink-0" aria-hidden="true" />
                    <p className="font-display text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {current.title}
                    </p>
                    {isRecent(current.releaseDate) && (
                      <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-600 text-white">
                        NEW
                      </span>
                    )}
                  </a>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Link
                href="/notifications"
                className="absolute inset-0 flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 truncate"
              >
                Latest JNTUH notifications &amp; result updates
              </Link>
            )}
          </div>

          {items.length > 1 && !reduceMotion && (
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume updates" : "Pause updates"}
              className="flex-shrink-0 p-1.5 rounded-lg text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          )}

          <Link
            href="/notifications"
            className="hidden md:flex flex-shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 px-3 py-1.5 rounded-lg transition-all"
          >
            All Updates
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/notifications"
            aria-label="All notifications"
            className="md:hidden flex-shrink-0 p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationTicker;
