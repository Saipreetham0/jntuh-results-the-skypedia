import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, getAllGuides } from '@/lib/content/guides';
import { ResponsiveAd, InContentAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);

    if (!guide) {
        return {
            title: 'Guide Not Found',
        };
    }

    return {
        title: `${guide.title} | JNTUH Results Blog`,
        description: guide.description,
        openGraph: {
            type: 'article',
            title: guide.title,
            description: guide.description,
            publishedTime: guide.publishedAt,
            tags: guide.tags,
        },
    };
}

export async function generateStaticParams() {
    const guides = getAllGuides();
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const guide = getGuideBySlug(slug);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pb-16">
            {/* Progress Bar (Simulated top border) */}
            <div className="h-1.5 bg-gradient-to-r from-[#1C61E7] to-[#21C15E] w-full"></div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-[#1C61E7]">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blog" className="hover:text-[#1C61E7]">Blog</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-gray-300 font-medium truncate">{guide.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="flex justify-center gap-2 mb-4 flex-wrap">
                        {guide.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                        {guide.title}
                    </h1>
                    <div className="flex items-center justify-center text-sm text-gray-500 gap-4">
                        <time dateTime={guide.publishedAt}>
                            {new Date(guide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                    </div>
                </header>

                {/* Top Ad */}
                <ResponsiveAd adSlot={AD_SLOTS.BLOG.HEADER} format="horizontal" className="mb-10" />

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-[#1C61E7] prose-li:marker:text-[#1C61E7]">
                    {/* We're using dangerous HTML because our content source is trusted (internal file) */}
                    <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                </div>

                {/* Middle Ad */}
                <InContentAd adSlot={AD_SLOTS.BLOG.IN_CONTENT} className="my-10" />

                {/* Share / CTA */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                    <p className="font-medium text-gray-900 dark:text-white mb-4">Find this guide helpful?</p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/cgpa-calculator"
                            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#1C61E7] text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            Calculate Your CGPA
                        </Link>
                    </div>
                </div>
            </article>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: guide.title,
                        description: guide.description,
                        datePublished: guide.publishedAt,
                        author: {
                            '@type': 'Organization',
                            name: 'TheSkypedia'
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'TheSkypedia',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://jntuhresults.theskypedia.com/logo.png'
                            }
                        }
                    })
                }}
            />
        </div>
    );
}
