import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, getAllGuides } from '@/lib/content/guides';
import { ResponsiveAd, InContentAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import { GlassCard } from '@/components/ui/glass-card';
import { Calendar, Tag, ChevronLeft, Clock, Share2, Calculator, ArrowRight } from 'lucide-react';

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
    const allGuides = getAllGuides();
    const relatedGuides = allGuides.filter(g => g.slug !== slug).slice(0, 3);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
            {/* Background Mesh Gradients Removed */}

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 origin-left scale-x-0 animate-scroll-progress" /> {/* Note: CSS based scroll progress logic would be needed here or client component. For now, simple reliable design without external dependency */}
            </div>

            <main className="relative z-10 container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Guides
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Article Content */}
                    <article className="lg:col-span-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {guide.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                                {guide.title}
                            </h1>
                            <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(guide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    5 min read
                                </span>
                            </div>
                        </div>

                        {/* Top Content Ad */}
                        <div className="mb-8">
                            <ResponsiveAd adSlot={AD_SLOTS.BLOG.HEADER} format="horizontal" className="rounded-2xl overflow-hidden shadow-sm" />
                        </div>

                        {/* Content Body */}
                        <GlassCard className="p-6 md:p-10 mb-8 !bg-white/70 dark:!bg-slate-900/70">
                            <div className="prose prose-lg dark:prose-invert max-w-none 
                                prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white 
                                prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-slate-900 dark:prose-strong:text-white
                                prose-ul:marker:text-blue-500 dark:prose-ul:marker:text-blue-400
                                prose-img:rounded-2xl prose-img:shadow-lg">
                                <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                            </div>
                        </GlassCard>

                        {/* In-Content Ad (Bottom of article) */}
                        <div className="mb-10">
                            <InContentAd adSlot={AD_SLOTS.BLOG.IN_CONTENT} className="rounded-2xl overflow-hidden" />
                        </div>

                        {/* Share & CTA */}
                        <GlassCard variant="gradient" className="p-8 text-center bg-gradient-to-br from-blue-600 to-indigo-700 border-none">
                            <h3 className="text-2xl font-bold text-white mb-4">Was this guide helpful?</h3>
                            <p className="text-blue-100 mb-8 max-w-lg mx-auto">Share it with your friends or check your results now.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href="/cgpa-calculator"
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-blue-600 font-bold shadow-lg hover:bg-blue-50 transition-all hover:scale-105"
                                >
                                    <Calculator className="w-5 h-5 mr-2" /> Calculate CGPA
                                </Link>
                                <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-500/30 backdrop-blur-md text-white font-bold border border-white/20 hover:bg-blue-500/40 transition-all">
                                    <Share2 className="w-5 h-5 mr-2" /> Share Guide
                                </button>
                            </div>
                        </GlassCard>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* More From Blog */}
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span> More Guides
                            </h3>
                            <div className="space-y-4">
                                {relatedGuides.map(g => (
                                    <Link key={g.slug} href={`/blog/${g.slug}`} className="group block">
                                        <div className="flex flex-col gap-1 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-sm leading-snug">
                                                {g.title}
                                            </h4>
                                            <span className="text-xs text-slate-500 dark:text-slate-500">
                                                {new Date(g.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <Link href="/blog" className="flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all">
                                    View All Guides <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar Ad */}
                        <div className="sticky top-24">
                            <ResponsiveAd adSlot={AD_SLOTS.SIDEBAR.STICKY_TOP} format="rectangle" className="rounded-2xl overflow-hidden shadow-lg" />
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
