'use client';

import Link from 'next/link';
import { ArrowRight, Lightbulb } from 'lucide-react';

interface ContextualLink {
    title: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
}

interface YouMightAlsoNeedProps {
    links: ContextualLink[];
    title?: string;
    variant?: 'default' | 'compact' | 'inline';
    className?: string;
}

/**
 * YouMightAlsoNeed Component
 * 
 * Contextual linking boxes to increase pages/session.
 * 
 * Best placement (from blueprint):
 * - After providing value, before conclusion
 * - Mid-article at natural break points
 * - After explaining a concept
 * 
 * Psychology: Guides user journey at decision points
 * Revenue Impact: +30-40% internal navigation
 * 
 * CTR: 35-50% (highly contextual)
 */
export default function YouMightAlsoNeed({
    links,
    title = 'You Might Also Need',
    variant = 'default',
    className = '',
}: YouMightAlsoNeedProps) {
    if (!links || links.length === 0) return null;

    if (variant === 'inline') {
        return (
            <div className={`my-6 p-4 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 rounded-r-lg ${className}`}>
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            💡 {title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <span>{link.title}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div className={`my-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700 ${className}`}>
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white mb-3">
                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{title}</span>
                </h3>
                <div className="space-y-2">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="group flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all"
                        >
                            <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {link.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    // Default variant - Full featured
    return (
        <div className={`my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                    {title}
                </h3>
            </div>

            <div className="space-y-3">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="group flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
                    >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {link.title}
                            </div>
                            {link.description && (
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                    {link.description}
                                </div>
                            )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

/**
 * InlineResourceLink - Lightweight inline version
 * Use within paragraphs for immediate context
 */
export function InlineResourceLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline-offset-2 hover:underline"
        >
            <span>{children}</span>
            <ArrowRight className="w-3 h-3" />
        </Link>
    );
}
