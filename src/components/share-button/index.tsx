"use client";

import React, { useState, useEffect, useRef } from "react";
import { Share2, X, Copy, Check, Link2, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";

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
    // Set the share URL when component mounts or URL prop changes
    setShareUrl(url || (typeof window !== 'undefined' ? window.location.href : ''));

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Handle clicks outside the modal to close it
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

  // Handle direct shares for mobile devices
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

  // Copy URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share to different platforms
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this link: ${shareUrl}`)}`, '_blank');
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`, '_blank');
  };

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="p-2 rounded-lg hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 hover:text-[#1C61E7] text-gray-700 dark:text-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]"
        aria-label="Share this page"
        disabled={isSharing}
      >
        <Share2 className="h-5 w-5" />
      </button>

      {/* Share modal dialog */}
      {isOpen && !isMobile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border-t-4 border-[#1C61E7] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 mx-4"
            aria-modal="true"
            role="dialog"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1C61E7]/10 flex items-center justify-center">
                  <Share2 className="h-5 w-5 text-[#1C61E7]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share This Page</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-[#1C61E7] dark:text-gray-400 dark:hover:text-[#1C61E7] rounded-lg p-2 hover:bg-[#1C61E7]/10 dark:hover:bg-[#1C61E7]/20 transition-all"
                aria-label="Close share modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg mb-6">
              <button
                className={`flex-1 px-4 py-2.5 font-semibold text-sm rounded-md transition-all duration-200 ${shareTab === 'link'
                    ? 'bg-white dark:bg-gray-800 text-[#1C61E7] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                onClick={() => setShareTab('link')}
              >
                Share Links
              </button>
              <button
                className={`flex-1 px-4 py-2.5 font-semibold text-sm rounded-md transition-all duration-200 ${shareTab === 'qr'
                    ? 'bg-white dark:bg-gray-800 text-[#1C61E7] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                onClick={() => setShareTab('qr')}
              >
                QR Code
              </button>
            </div>

            {/* Tab content */}
            {shareTab === 'link' ? (
              <div className="space-y-5">
                {/* Copy link section */}
                <div className="relative mb-5">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Copy Link
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full p-3 pr-16 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-[#1C61E7] transition-all text-sm"
                    />
                    <button
                      onClick={handleCopy}
                      className={`absolute right-2 p-2.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${copied
                          ? 'bg-[#21C15E] text-white shadow-lg shadow-[#21C15E]/25'
                          : 'bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white shadow-lg shadow-[#1C61E7]/25 hover:scale-105'
                        }`}
                      aria-label={copied ? "Copied!" : "Copy link"}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Social sharing buttons */}
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Share via Social Media
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Share this page with your friends and followers on social platforms
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={shareToTwitter}
                      className="group flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a94e0] text-white py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Twitter size={18} />
                      <span className="font-semibold">Twitter</span>
                    </button>

                    <button
                      onClick={shareToFacebook}
                      className="group flex items-center justify-center gap-2 bg-[#4267B2] hover:bg-[#3b5998] text-white py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Facebook size={18} />
                      <span className="font-semibold">Facebook</span>
                    </button>

                    <button
                      onClick={shareToWhatsApp}
                      className="group flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span className="font-semibold">WhatsApp</span>
                    </button>

                    <button
                      onClick={shareToLinkedIn}
                      className="group flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#006699] text-white py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Linkedin size={18} />
                      <span className="font-semibold">LinkedIn</span>
                    </button>

                    <button
                      onClick={shareViaEmail}
                      className="group flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white py-3 px-4 rounded-xl transition-all hover:scale-105 shadow-md hover:shadow-lg col-span-2"
                    >
                      <Mail size={18} />
                      <span className="font-semibold">Share via Email</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-[#1C61E7]/20">
                  <QRCodeSVG
                    value={shareUrl}
                    size={220}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "/android-chrome-512x512.png",
                      height: 44,
                      width: 44,
                      excavate: true,
                    }}
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Scan to Share
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
                    Point your camera at the QR code to open this page on your mobile device
                  </p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${copied
                      ? 'bg-[#21C15E] text-white shadow-[#21C15E]/25'
                      : 'bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white shadow-[#1C61E7]/25 hover:scale-105'
                    }`}
                >
                  {copied ? <Check size={18} /> : <Link2 size={18} />}
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;