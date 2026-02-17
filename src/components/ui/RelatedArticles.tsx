import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import type { JSX } from 'react';

export interface RelatedArticle {
    title: string;
    href: string;
    category?: string;
    thumbnail?: string;
    readTime?: number;
}

interface RelatedArticlesProps {
    articles: RelatedArticle[];
    title?: string;
    className?: string;
}

/**
 * RelatedArticles Component
 * 
 * Displays related content at the end of articles to increase page depth
 * and reduce bounce rate. Horizontal scroll on mobile for better UX.
 * 
 * This is a key engagement element that drives internal traffic.
 */
export default function RelatedArticles({
    articles,
    title = 'Related Articles',
    className = ''
}: RelatedArticlesProps): JSX.Element {
    if (!articles || articles.length === 0) return <></>;

    return (
        <section className={`py-8 md:py-12 ${className}`}>
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {title}
                </h2>
            </div>

            {/* Mobile: Horizontal Scroll / Desktop: Grid */}
            <div className="relative">
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href={article.href}
                            className="flex-shrink-0 w-[280px] md:w-auto group"
                        >
                            <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                                {/* Thumbnail */}
                                {article.thumbnail && (
                                    <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                        <Image
                                            src={article.thumbnail}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 280px, 33vw"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-4">
                                    {article.category && (
                                        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md mb-2">
                                            {article.category}
                                        </span>
                                    )}

                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h3>

                                    <div className="flex items-center justify-between mt-3">
                                        {article.readTime && (
                                            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{article.readTime} min</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                                            <span>Read more</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Scroll indicator for mobile */}
                <div className="md:hidden flex justify-center gap-1.5 mt-4">
                    {articles.map((_, index) => (
                        <div
                            key={index}
                            className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
