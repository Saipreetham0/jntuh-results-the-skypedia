'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ExitIntentPopupProps {
    title: string;
    description: string;
    ctaText: string;
    ctaHref?: string;
    onCTA?: () => void;
    frequencyDays?: number; // Show once every N days (default: 7)
}

/**
 * ExitIntentPopup Component
 * 
 * Shows popup when user moves mouse to leave page.
 * 
 * Strategy from monetization blueprint:
 * - Trigger: Mouse leaves viewport (desktop) or 70% scroll (mobile)
 * - Frequency: Once per 7 days (cookie)
 * - Offer: Newsletter, related article, content upgrade
 * 
 * Revenue Impact: Captures abandoning users, increases return visits
 * 
 * Use Cases:
 * - Newsletter signup
 * - Download PDF guide
 * - Recommend related content
 * - Special offer
 */
export default function ExitIntentPopup({
    title,
    description,
    ctaText,
    ctaHref,
    onCTA,
    frequencyDays = 7,
}: ExitIntentPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if popup was shown recently
        const lastShownKey = 'exit-popup-last-shown';
        const lastShown = localStorage.getItem(lastShownKey);

        if (lastShown) {
            const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
            if (daysSince < frequencyDays) {
                return; // Don't show again
            }
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger if mouse leaves from top of page
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem(lastShownKey, Date.now().toString());
            }
        };

        // Desktop: Mouse leave detection
        document.addEventListener('mouseout', handleMouseLeave);

        // Mobile: Show at 70% scroll
        const handleScroll = () => {
            if (hasShown) return;

            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 70 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                localStorage.setItem(lastShownKey, Date.now().toString());
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            document.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasShown, frequencyDays]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleCTAClick = () => {
        if (onCTA) onCTA();
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
                onClick={handleClose}
            />

            {/* Popup Modal */}
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 animate-scale-in">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>

                    {/* Content */}
                    <div className="text-center">
                        {/* Icon/Emoji */}
                        <div className="text-6xl mb-4">👋</div>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            {title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {description}
                        </p>

                        {/* CTA Button */}
                        {ctaHref ? (
                            <a
                                href={ctaHref}
                                onClick={handleCTAClick}
                                className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                {ctaText}
                            </a>
                        ) : (
                            <button
                                onClick={handleCTAClick}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                {ctaText}
                            </button>
                        )}

                        {/* No Thanks Link */}
                        <button
                            onClick={handleClose}
                            className="mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            No thanks, I'll continue reading
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
