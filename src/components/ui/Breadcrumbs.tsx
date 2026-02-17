import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { JSX } from 'react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * Breadcrumbs Component
 * 
 * Hierarchical navigation component with Schema.org markup for SEO.
 * Improves internal navigation and reduces bounce rate.
 * 
 * Mobile-optimized with proper truncation on small screens.
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps): JSX.Element {
    if (!items || items.length === 0) return <></>;

    return (
        <nav
            aria-label="Breadcrumb"
            className={`py-3 px-4 md:px-0 ${className}`}
        >
            <ol
                className="flex items-center flex-wrap gap-2 text-sm"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={index}
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                            className="flex items-center gap-2"
                        >
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    itemProp="item"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] md:max-w-none"
                                >
                                    <span itemProp="name">{item.label}</span>
                                </Link>
                            ) : (
                                <span
                                    itemProp="name"
                                    className={`${isLast
                                            ? 'text-gray-900 dark:text-gray-100 font-medium'
                                            : 'text-gray-600 dark:text-gray-400'
                                        } truncate max-w-[150px] md:max-w-none`}
                                >
                                    {item.label}
                                </span>
                            )}
                            <meta itemProp="position" content={String(index + 1)} />

                            {!isLast && (
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
