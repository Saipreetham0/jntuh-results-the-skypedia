'use client';

import { useEffect, useState } from 'react';

/**
 * ReadProgressBar Component
 * 
 * Displays a thin progress bar at the top of the page that tracks
 * reading progress based on scroll position.
 * 
 * Increases engagement by providing visual feedback and encouraging
 * readers to complete the article.
 */
export default function ReadProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            setProgress(Math.min(scrollPercent, 100));
        };

        // Update on scroll
        window.addEventListener('scroll', updateProgress, { passive: true });

        // Update on resize
        window.addEventListener('resize', updateProgress, { passive: true });

        // Initial update
        updateProgress();

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800 z-50"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        >
            <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
