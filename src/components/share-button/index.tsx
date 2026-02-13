"use client";

import React, { useState, useEffect, useRef } from "react";
import { Share2, X, Copy, Check, Link2, Twitter, Facebook, Linkedin, Mail, Send, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import QRCode component with no SSR
const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeSVG),
  { ssr: false }
);

interface ShareButtonProps {
  url?: string;
  title?: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title = "Check out this page!",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareTab, setShareTab] = useState<'link' | 'qr'>('link');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShareUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [url, isOpen]);

  const handleShare = async () => {
    if (isSharing) return;

    if (isMobile && navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share({
          title: document.title || title,
          text: title,
          url: shareUrl
        });
      } catch (error) {
        console.error("Error sharing:", error);
      } finally {
        setIsSharing(false);
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`, '_blank')
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-[#0088cc] hover:bg-[#0077b5]",
      action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1a94e0]",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#4267B2] hover:bg-[#3b5998]",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-[#0077B5] hover:bg-[#006699]",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-700 hover:bg-gray-800",
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this link: ${shareUrl}`)}`, '_blank')
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Premium Trigger Button */}
      <button
        onClick={handleShare}
        className="group relative inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800"
        disabled={isSharing}
      >
        <Share2 className="w-4 h-4 text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400 transition-colors" />
        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Share</span>
      </button>

      <AnimatePresence>
        {isOpen && !isMobile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />

              <div className="relative p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Share Page</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Spread the word</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                  {(['link', 'qr'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setShareTab(tab)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${shareTab === tab
                          ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                    >
                      {tab === 'link' ? 'Share Link' : 'QR Code'}
                    </button>
                  ))}
                </div>

                {shareTab === 'link' ? (
                  <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
                    <div className="relative group">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                      />
                      <button
                        onClick={handleCopy}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-blue-600 transition-all shadow-sm"
                      >
                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {platforms.map((platform) => (
                        <button
                          key={platform.name}
                          onClick={platform.action}
                          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 ${platform.color} text-white shadow-lg`}
                        >
                          <platform.icon className="w-5 h-5" />
                          <span className="text-[10px] font-bold tracking-wide">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100 mb-6">
                      <QRCodeSVG
                        value={shareUrl}
                        size={180}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: "/favicon.ico",
                          height: 30,
                          width: 30,
                          excavate: true,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                      Scan this code with your phone camera to open this page instantly.
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