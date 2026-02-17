'use client';

import { useEffect, useRef, useState } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
    headings: Array<{
        id: string;
        text: string;
        level: number; // 2 or 3 (H2 or H3)
    }>;
    className?: string;
}

/**
 * TableOfContents Component
 * 
 * Auto-highlighting, scrollspy table of contents for long articles (>1,200 words).
 * 
 * Benefits from monetization blueprint:
 * - Users see full content scope, commit to reading  
 * - Jump links improve UX
 * - Increases scroll depth (+15-25%)
 * - More ad impressions
 * 
 * Revenue Impact: +1-2 ad views per session
 */
export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Intersection Observer to track which heading is visible
        const handleObserve = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleObserve, {
            rootMargin: '-100px 0px -80% 0px',
            threshold: [0, 1],
        });

        // Observe all headings
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observerRef.current?.observe(element);
            }
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [headings]);

    if (!headings || headings.length === 0) return null;

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
        setIsOpen(false); // Close mobile menu after click
    };

    return (
        <>
            {/* Mobile: Collapsible Button */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <List className="w-5 h-5" />
                    <span>Table of Contents</span>
                    <svg
                        className={`ml-auto w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <nav className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <TOCList
                            headings={headings}
                            activeId={activeId}
                            onItemClick={handleClick}
                        />
                    </nav>
                )}
            </div>

            {/* Desktop: Sticky Sidebar */}
            <div className={`hidden lg:block ${className}`}>
                <div className="sticky top-24">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
                            <List className="w-4 h-4" />
                            <span>On This Page</span>
                        </h3>

                        <TOCList
                            headings={headings}
                            activeId={activeId}
                            onItemClick={handleClick}
                        />

                        {/* Progress Indicator */}
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <span>Reading Progress</span>
                                <span>
                                    {headings.findIndex((h) => h.id === activeId) + 1} / {headings.length}
                                </span>
                            </div>
                            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-600 transition-all duration-300"
                                    style={{
                                        width: `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function TOCList({
    headings,
    activeId,
    onItemClick,
}: {
    headings: TableOfContentsProps['headings'];
    activeId: string;
    onItemClick: (id: string) => void;
}) {
    return (
        <ul className="space-y-1">
            {headings.map((heading) => {
                const isActive = activeId === heading.id;
                const isH3 = heading.level === 3;

                return (
                    <li key={heading.id}>
                        <button
                            onClick={() => onItemClick(heading.id)}
                            className={`
                w-full text-left px-3 py-1.5 rounded-md text-sm transition-all
                ${isH3 ? 'pl-6 text-xs' : ''}
                ${isActive
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }
              `}
                        >
                            {heading.text}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
