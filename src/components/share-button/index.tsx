"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Share2, X, Copy, Check, Twitter, Facebook, Linkedin, Mail, Send, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { trackGAEvent } from "@/components/analytics/GoogleAnalytics";

// Dynamically import QRCode component with no SSR
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { ssr: false }
);

export interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title = "Check out JNTUH Results & Academic Hub!",
  text,
  className = "",
  children
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "");
  const [isSharing, setIsSharing] = useState(false);
  const [shareTab, setShareTab] = useState<'link' | 'qr'>('link');
  const modalRef = useRef<HTMLDivElement>(null);

  // Keep share URL in sync with dynamic route changes when url prop is omitted
  useEffect(() => {
    if (url) {
      setShareUrl(url);
    } else if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [url, pathname]);

  // Handle ESC key, outside click & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const activeTitle = title || (typeof document !== "undefined" ? document.title : "Check this out!");
  const activeText = text || activeTitle;

  const handleShare = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isSharing) return;

    const resolvedUrl = shareUrl || (typeof window !== "undefined" ? window.location.href : "");

    // Prefer native share if available (Mobile browsers & supported modern desktops)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setIsSharing(true);
      try {
        await navigator.share({
          title: activeTitle,
          text: activeText,
          url: resolvedUrl,
        });
        trackGAEvent("share", { method: "native", item_id: resolvedUrl });
        setIsSharing(false);
        return; // User completed native share
      } catch (error: unknown) {
        // If user cancelled, quietly dismiss without error
        if (error instanceof Error && error.name === "AbortError") {
          setIsSharing(false);
          return;
        }
        // If failed for any other reason, fall through to modal dialog
      } finally {
        setIsSharing(false);
      }
    }

    // Fallback: Open accessible modal for webviews & desktop browsers without Web Share
    setIsOpen(true);
  };

  const handleCopy = async () => {
    const resolvedUrl = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resolvedUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = resolvedUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      trackGAEvent("share", { method: "copy_link", item_id: resolvedUrl });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // In case clipboard permissions are blocked
      setCopied(false);
    }
  };

  const platforms = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
      action: () => {
        trackGAEvent("share", { method: "whatsapp", item_id: shareUrl });
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(`${activeTitle}\n${shareUrl}`)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-[#0088cc] hover:bg-[#0077b5]",
      action: () => {
        trackGAEvent("share", { method: "telegram", item_id: shareUrl });
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(activeTitle)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "bg-black hover:bg-neutral-800 text-white",
      action: () => {
        trackGAEvent("share", { method: "twitter", item_id: shareUrl });
        window.open(
          `https://x.com/intent/tweet?text=${encodeURIComponent(activeTitle)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      action: () => {
        trackGAEvent("share", { method: "facebook", item_id: shareUrl });
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0A66C2] hover:bg-[#095196]",
      action: () => {
        trackGAEvent("share", { method: "linkedin", item_id: shareUrl });
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-700 hover:bg-gray-800",
      action: () =>
        window.open(
          `mailto:?subject=${encodeURIComponent(activeTitle)}&body=${encodeURIComponent(`Check out this link: ${shareUrl}`)}`,
          "_blank",
          "noopener,noreferrer"
        ),
    },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      {children ? (
        <div onClick={handleShare} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleShare()}>
          {children}
        </div>
      ) : (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this page"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="group relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          disabled={isSharing}
        >
          <Share2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-colors" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Share</span>
        </button>
      )}

      {/* Share Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-dialog-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Dialog Card */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 pointer-events-none" />

              <div className="relative p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#1C61E7] dark:text-blue-400">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="share-dialog-title" className="text-lg font-bold text-gray-900 dark:text-white">
                        Share Page
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Share with classmates or friends</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close share dialog"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tab Controls */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6" role="tablist">
                  {(['link', 'qr'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={shareTab === tab}
                      onClick={() => setShareTab(tab)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                        shareTab === tab
                          ? 'bg-white dark:bg-gray-700 text-[#1C61E7] dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      {tab === 'link' ? 'Share Link' : 'QR Code'}
                    </button>
                  ))}
                </div>

                {/* Tab Panels */}
                {shareTab === 'link' ? (
                  <div className="space-y-6 animate-in slide-in-from-left-3 fade-in duration-200">
                    {/* Copy Link Input Bar */}
                    <div className="relative group">
                      <label htmlFor="share-url-input" className="sr-only">Page URL to share</label>
                      <input
                        id="share-url-input"
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#1C61E7]/40 focus:border-[#1C61E7] outline-none transition-all truncate"
                      />
                      <button
                        type="button"
                        onClick={handleCopy}
                        aria-label={copied ? "Link copied" : "Copy link to clipboard"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[#1C61E7] transition-all shadow-sm border border-gray-200/50 dark:border-gray-600"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Quick Social Share Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.name}
                          type="button"
                          onClick={platform.action}
                          aria-label={`Share on ${platform.name}`}
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 ${platform.color} text-white shadow-md`}
                        >
                          <platform.icon className="w-5 h-5" />
                          <span className="text-[11px] font-bold tracking-wide">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-3 animate-in slide-in-from-right-3 fade-in duration-200">
                    <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100 mb-5">
                      <QRCodeSVG
                        value={shareUrl}
                        size={180}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: "/favicon-32x32.png",
                          height: 28,
                          width: 28,
                          excavate: true,
                        }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs leading-relaxed">
                      Scan this QR code with any phone camera to open this page instantly.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
