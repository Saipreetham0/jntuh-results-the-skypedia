'use client';

import { useEffect, useRef, useState } from 'react';
import { ResponsiveAd } from '../adsense';
import AD_SLOTS from '@/config/adSlots';

interface ArticleAdProps {
    position: 'after-intro' | 'mid-article' | 'money-zone' | 'before-conclusion' | 'after-article';
    slot?: string;
    className?: string;
}

/**
 * ArticleAd Component
 * 
 * Optimized ad placements for article pages following monetization blueprint.
 * 
 * Position Strategy (Revenue-Optimized):
 * - after-intro: After ~300 words (40% scroll) - RPM: 1.8-2.5
 * - mid-article: After first H2 (mid-content) - RPM: 2.0-2.8
 * - money-zone: At 60% content (HIGHEST RPM) - RPM: 2.5-3.2 ⭐
 * - before-conclusion: Before final section - RPM: 1.5-2.0
 * - after-article: After content, before related - RPM: 1.2-1.8
 * 
 * @example
 * ```tsx
 * // In article layout
 * <article>
 *   <p>Intro paragraph...</p>
 *   <p>More content...</p>
 *   <ArticleAd position="after-intro" />
 *   
 *   <h2>Section 1</h2>
 *   <ArticleAd position="mid-article" />
 *   
 *   <h2>Section 2</h2>
 *   <ArticleAd position="money-zone" /> // HIGHEST RPM
 *   
 *   <h2>Conclusion</h2>
 *   <ArticleAd position="before-conclusion" />
 * </article>
 * <ArticleAd position="after-article" />
 * ```
 */
export default function ArticleAd({ position, slot, className = '' }: ArticleAdProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: getScrollMargin(position),
                threshold: 0.01,
            }
        );

        if (adRef.current) {
            observer.observe(adRef.current);
        }

        return () => observer.disconnect();
    }, [position]);

    // Get optimal lazy load margin based on position
    function getScrollMargin(pos: ArticleAdProps['position']): string {
        switch (pos) {
            case 'after-intro':
                return '500px'; // Preload early
            case 'mid-article':
                return '300px'; // Standard
            case 'money-zone':
                return '200px'; // Money zone - load just in time
            case 'before-conclusion':
                return '200px';
            case 'after-article':
                return '100px'; // Tight control
            default:
                return '300px';
        }
    }

    // Get position-specific styling
    function getPositionStyles(pos: ArticleAdProps['position']): string {
        const baseStyles = 'my-8 flex justify-center';

        switch (pos) {
            case 'money-zone':
                // Highlight money zone with subtle emphasis
                return `${baseStyles} my-10`;
            case 'after-intro':
                return `${baseStyles} my-6`;
            case 'after-article':
                return `${baseStyles} my-12`;
            default:
                return baseStyles;
        }
    }

    // Determine ad slot
    const adSlot = slot || AD_SLOTS.BLOG.IN_ARTICLE_1;

    return (
        <div
            ref={adRef}
            className={`${getPositionStyles(position)} ${className}`}
            data-ad-position={position}
        >
            {isVisible && (
                <div className="w-full max-w-[336px]">
                    <ResponsiveAd
                        adSlot={adSlot}
                        format="auto"
                    />
                </div>
            )}
        </div>
    );
}

/**
 * ArticleAdMobileAnchor Component
 * 
 * Bottom sticky anchor ad for mobile devices.
 * Appears after 15s scroll, dismissible, passive revenue.
 * 
 * Revenue Impact: +$0.30-0.60 per session
 */
export function ArticleAdMobileAnchor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show anchor after 15 seconds of page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    if (isDismissed || !isVisible) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <button
                onClick={() => setIsDismissed(true)}
                className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Close ad"
            >
                ✕
            </button>
            <div className="flex justify-center p-2">
                <ResponsiveAd
                    adSlot={AD_SLOTS.BLOG.MOBILE_ANCHOR}
                    format="auto"
                />
            </div>
        </div>
    );
}

/**
 * ArticleAdDesktopSidebar Component
 * 
 * Sticky sidebar ad for desktop.
 * Follows scroll, stops at 75% page.
 * 
 * Revenue Impact: +$0.50-1.50 per session (desktop only)
 */
export function ArticleAdDesktopSidebar() {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [reachedLimit, setReachedLimit] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sidebarRef.current) return;

            const scrollTop = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / pageHeight) * 100;

            // Make sticky after scrolling past initial position
            setIsSticky(scrollTop > 300);

            // Stop at 75% page scroll
            setReachedLimit(scrollPercent > 75);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hidden lg:block">
            <div
                ref={sidebarRef}
                className={`${isSticky && !reachedLimit ? 'sticky top-20' : ''
                    } ${reachedLimit ? 'absolute bottom-0' : ''
                    } transition-all duration-200`}
            >
                <div className="w-[300px] min-h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <ResponsiveAd
                        adSlot={AD_SLOTS.BLOG.SIDEBAR_STICKY}
                        format="auto"
                    />
                </div>
            </div>
        </div>
    );
}
