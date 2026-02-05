'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Web Vitals Analytics Component
 * 
 * Reports performance metrics to console in development
 * and can be extended to send to external analytics services.
 */
export default function WebVitals() {
    useReportWebVitals((metric) => {
        // In development, log vitals to console for monitoring
        if (process.env.NODE_ENV === 'development') {
            console.log('Web Vitals:', metric);
        }

        // Send to Google Analytics if gtag is available
        if (typeof window !== 'undefined' && 'gtag' in (window as any)) {
            (window as any).gtag('event', metric.name, {
                value: Math.round(
                    metric.name === 'CLS' ? metric.value * 1000 : metric.value
                ), // values must be integers
                event_label: metric.id, // id unique to current page load
                non_interaction: true, // avoids affecting bounce rate
            });
        }

        // You can also send to a custom endpoint using navigator.sendBeacon
        // const body = JSON.stringify(metric);
        // const url = '/api/v1/analytics/performance';
        // if (navigator.sendBeacon) {
        //   navigator.sendBeacon(url, body);
        // }
    });

    return null;
}
