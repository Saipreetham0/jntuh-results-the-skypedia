'use client';

import { useEffect, useState } from 'react';

/**
 * Core Web Vitals Monitor
 * 
 * Tracks and displays Core Web Vitals in real-time.
 * 
 * Target Metrics (from blueprint):
 * - LCP: <2.5s (target: 1.8s)
 * - CLS: <0.1 (target: 0.05)
 * - INP: <200ms (target: 100ms)
 * 
 * Usage:
 * ```tsx
 * import { WebVitalsMonitor } from '@/lib/performance/web-vitals';
 * 
 * // In development only
 * {process.env.NODE_ENV === 'development' && <WebVitalsMonitor />}
 * ```
 */

interface WebVital {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
}

export function WebVitalsMonitor() {
    const [vitals, setVitals] = useState<WebVital[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Dynamic import of web-vitals library
        import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
            onLCP((metric) => {
                setVitals((prev) => [
                    ...prev.filter((v) => v.name !== 'LCP'),
                    {
                        name: 'LCP',
                        value: metric.value,
                        rating: metric.value < 2500 ? 'good' : metric.value < 4000 ? 'needs-improvement' : 'poor',
                    },
                ]);
            });

            onCLS((metric) => {
                setVitals((prev) => [
                    ...prev.filter((v) => v.name !== 'CLS'),
                    {
                        name: 'CLS',
                        value: metric.value,
                        rating: metric.value < 0.1 ? 'good' : metric.value < 0.25 ? 'needs-improvement' : 'poor',
                    },
                ]);
            });

            onINP((metric) => {
                setVitals((prev) => [
                    ...prev.filter((v) => v.name !== 'INP'),
                    {
                        name: 'INP',
                        value: metric.value,
                        rating: metric.value < 200 ? 'good' : metric.value < 500 ? 'needs-improvement' : 'poor',
                    },
                ]);
            });

            onFCP((metric) => {
                setVitals((prev) => [
                    ...prev.filter((v) => v.name !== 'FCP'),
                    {
                        name: 'FCP',
                        value: metric.value,
                        rating: metric.value < 1800 ? 'good' : metric.value < 3000 ? 'needs-improvement' : 'poor',
                    },
                ]);
            });

            onTTFB((metric) => {
                setVitals((prev) => [
                    ...prev.filter((v) => v.name !== 'TTFB'),
                    {
                        name: 'TTFB',
                        value: metric.value,
                        rating: metric.value < 800 ? 'good' : metric.value < 1800 ? 'needs-improvement' : 'poor',
                    },
                ]);
            });
        });
    }, []);

    if (vitals.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-xs">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                    Core Web Vitals
                </h3>

                <div className="space-y-2">
                    {vitals.map((vital) => (
                        <div key={vital.name} className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {vital.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-gray-900 dark:text-white">
                                    {vital.name === 'CLS'
                                        ? vital.value.toFixed(3)
                                        : `${Math.round(vital.value)}ms`}
                                </span>
                                <div
                                    className={`w-3 h-3 rounded-full ${vital.rating === 'good'
                                            ? 'bg-green-500'
                                            : vital.rating === 'needs-improvement'
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                        }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Report Web Vitals to Analytics
 */
export function reportWebVitals(metric: any) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
        });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric.rating);
    }
}
