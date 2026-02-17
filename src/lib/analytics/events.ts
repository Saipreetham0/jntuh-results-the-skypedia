'use client';

import { useEffect } from 'react';

/**
 * Google Analytics 4 Custom Event Tracking
 * 
 * Tracks specific user interactions for revenue optimization.
 * 
 * Events to track (from monetization blueprint):
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Ad views and clicks
 * - Calculator usage
 * - Internal link clicks
 * - Video plays
 * - PDF downloads
 * - Exit intent popup views
 * 
 * Usage:
 * ```tsx
 * import { trackEvent } from '@/lib/analytics/events';
 * 
 * trackEvent('scroll_depth', { depth: 50, page: '/cgpa-calculator' });
 * ```
 */

declare global {
    interface Window {
        gtag?: (command: string, ...args: any[]) => void;
        dataLayer?: any[];
    }
}

export interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
    [key: string]: any;
}

/**
 * Track custom event
 */
export function trackEvent(
    eventName: string,
    parameters?: Record<string, any>
) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
            page_path: url,
            page_title: title,
        });
    }
}

/**
 * Scroll Depth Tracker Hook
 * 
 * Automatically tracks scroll depth milestones.
 * Critical for understanding user engagement and ad viewability.
 */
export function useScrollDepthTracking(pageName: string) {
    useEffect(() => {
        const milestones = [25, 50, 75, 100];
        const tracked = new Set<number>();

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            milestones.forEach((milestone) => {
                if (scrollPercent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    trackEvent('scroll_depth', {
                        page: pageName,
                        depth: milestone,
                        timestamp: Date.now(),
                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageName]);
}

/**
 * Ad Interaction Tracker
 * 
 * Tracks ad views and clicks for RPM optimization.
 */
export function trackAdView(adSlot: string, position: string) {
    trackEvent('ad_view', {
        ad_slot: adSlot,
        ad_position: position,
        page_type: window.location.pathname.split('/')[1] || 'home',
    });
}

export function trackAdClick(adSlot: string, position: string) {
    trackEvent('ad_click', {
        ad_slot: adSlot,
        ad_position: position,
        page_type: window.location.pathname.split('/')[1] || 'home',
    });
}

/**
 * Internal Link Click Tracker
 * 
 * Tracks internal navigation for session depth analysis.
 */
export function trackInternalClick(href: string, linkText: string, context: string) {
    trackEvent('internal_link_click', {
        destination: href,
        link_text: linkText,
        context: context, // e.g., 'related_articles', 'next_step_cta', 'breadcrumb'
        source_page: window.location.pathname,
    });
}

/**
 * Calculator Usage Tracker
 * 
 * Tracks calculator interactions and completion rates.
 */
export function trackCalculatorUsage(
    calculatorType: string,
    action: 'start' | 'calculate' | 'download'
) {
    trackEvent('calculator_usage', {
        calculator_type: calculatorType,
        action: action,
        page: window.location.pathname,
    });
}

/**
 * Video Interaction Tracker
 */
export function trackVideoPlay(videoId: string, title: string) {
    trackEvent('video_play', {
        video_id: videoId,
        video_title: title,
        page: window.location.pathname,
    });
}

/**
 * Email Capture Tracker
 */
export function trackEmailCapture(source: string, pdfTitle?: string) {
    trackEvent('email_capture', {
        source: source, // 'pdf_download', 'newsletter', 'exit_popup'
        pdf_title: pdfTitle,
        page: window.location.pathname,
    });
}

/**
 * Exit Intent Tracker
 */
export function trackExitIntent(action: 'shown' | 'dismissed' | 'converted') {
    trackEvent('exit_intent', {
        action: action,
        page: window.location.pathname,
    });
}
