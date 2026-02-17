'use client';

import { useEffect, useState } from 'react';

/**
 * ReadProgressIndicator Component
 * 
 * Shows reading progress as user scrolls through article.
 * Increases completion rate by 15-25% (monetization blueprint).
 * 
 * Psychology: Visual feedback encourages completion
 * Revenue Impact: +15-25% scroll completion = +1-2 ad views
 */
export default function ReadProgressIndicator() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 transition-all duration-150 ease-out"
            style={{
                width: `${progress}%`,
                opacity: progress > 0 ? 1 : 0,
            }}
            aria-label={`Reading progress: ${Math.round(progress)}%`}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
        />
    );
}

/**
 * EstimatedReadTime Component
 * 
 * Shows estimated reading time at top of article.
 * Increases completion rate and sets user expectations.
 * 
 * @param {number} wordCount - Total words in article
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 */
export function EstimatedReadTime({
    wordCount,
    wordsPerMinute = 200
}: {
    wordCount: number;
    wordsPerMinute?: number;
}) {
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return (
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{minutes} min read</span>
        </span>
    );
}
