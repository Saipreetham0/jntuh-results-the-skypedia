"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllGuides } from '@/lib/content/guides';
import { ResponsiveAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import { GlassCard } from '@/components/ui/glass-card';
import { Calendar, ChevronRight, BookOpen, Calculator, Search, Share2 } from 'lucide-react';

export default function BlogIndex() {
    const guides = getAllGuides();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
            {/* Background Mesh Gradients Removed */}

            <main className="relative z-10 container mx-auto px-4 py-8 lg:py-16 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                        The Skypedia Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                        Academic Guides & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Insights</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Expert advice on JNTUH regulations, exam strategies, and career planning to help you navigate your engineering journey.
                    </p>
                </motion.div>

                {/* Top Ad */}
                <div className="mb-16">
                    <ResponsiveAd adSlot={AD_SLOTS.BLOG.HEADER} format="horizontal" className="rounded-2xl overflow-hidden shadow-sm" />
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Feed */}
                    <div className="lg:col-span-8 space-y-8">
                        {guides.map((guide, index) => (
                            <motion.div
                                key={guide.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Link href={`/blog/${guide.slug}`} className="group block h-full">
                                    <GlassCard className="h-full p-6 md:p-8 hover:scale-[1.01] transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/50 group-hover:shadow-xl group-hover:shadow-blue-500/10 dark:group-hover:shadow-blue-900/20">
                                        <div className="flex flex-col h-full">
                                            {/* Meta Tags */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                {guide.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                                                        {tag}
                                                    </span>
                                                ))}
                                                <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                {guide.title}
                                            </h2>

                                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
                                                {guide.description}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                                                    Read Article <ChevronRight className="w-4 h-4" />
                                                </div>
                                                <div className="flex items-center gap-4 text-slate-400 text-sm">
                                                    <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                                        <BookOpen className="w-4 h-4" /> 5 min read
                                                    </span>
                                                    <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                                                        <Share2 className="w-4 h-4" /> Share
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Search Widget */}
                        <GlassCard className="p-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search guides..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </GlassCard>

                        {/* Recent Tools Widget */}
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5 text-blue-500" /> Popular Tools
                            </h3>
                            <div className="space-y-3">
                                <Link href="/cgpa-calculator" className="flex items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 group-hover:scale-110 transition-transform">
                                        📈
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">CGPA Calculator</h4>
                                        <p className="text-xs text-slate-500">Calculate your aggregate</p>
                                    </div>
                                </Link>
                                <Link href="/check-backlogs" className="flex items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                                        ✅
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Backlog Checker</h4>
                                        <p className="text-xs text-slate-500">Status of your exams</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar Ad */}
                        <div className="sticky top-24">
                            <ResponsiveAd adSlot={AD_SLOTS.SIDEBAR.STICKY} format="rectangle" className="rounded-2xl overflow-hidden shadow-lg" />
                        </div>
                    </aside>
                </div>

                {/* Bottom Ad */}
                <div className="mt-16">
                    <ResponsiveAd adSlot={AD_SLOTS.BLOG.FOOTER} format="horizontal" className="rounded-2xl overflow-hidden" />
                </div>

            </main>
        </div>
    );
}
