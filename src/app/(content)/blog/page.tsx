import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllGuides } from '@/lib/content/guides';
import { ResponsiveAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';

export const metadata: Metadata = {
    title: 'JNTUH Academic Guides & Resources | TheSkypedia Blog',
    description: 'Helpful guides for JNTUH students regarding grading systems, CGPA calculation, grace marks rules, and academic regulations.',
};

export default function BlogIndex() {
    const guides = getAllGuides();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Academic Guides & <span className="text-[#1C61E7]">Insights</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about JNTUH regulations, exam tips, and career guidance.
                    </p>
                </div>

                {/* Top Ad */}
                <ResponsiveAd adSlot={AD_SLOTS.BLOG.HEADER} format="horizontal" className="mb-10" />

                {/* Grid with Sidebar */}
                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {guides.map((guide) => (
                                <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group">
                                    <article className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                        <div className="p-6 flex-1 flex flex-col">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {guide.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1C61E7] transition-colors line-clamp-2">
                                                {guide.title}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                                                {guide.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </span>
                                                <span className="text-sm font-semibold text-[#1C61E7] flex items-center group-hover:underline">
                                                    Read Guide
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="mt-12 lg:mt-0 lg:col-span-1 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="w-1.5 h-6 bg-[#1C61E7] rounded-full mr-3"></span>
                                Academic Tools
                            </h3>
                            <div className="space-y-4">
                                <Link href="/cgpa-calculator" className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[#1C61E7] mr-4">
                                        🔢
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">CGPA Calculator</h4>
                                        <p className="text-xs text-gray-500">Calculate SGPA/CGPA</p>
                                    </div>
                                </Link>
                                <Link href="/check-backlogs" className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 mr-4">
                                        🔍
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Backlog Checker</h4>
                                        <p className="text-xs text-gray-500">Check pending exams</p>
                                    </div>
                                </Link>
                                <Link href="/jntuh-cgpa-to-percentage-formula" className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[#1C61E7] mr-4">
                                        📊
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Formula Guide</h4>
                                        <p className="text-xs text-gray-500">Official JNTUH Rules</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Newsletter/CTA */}
                        <div className="bg-gradient-to-br from-[#1C61E7] to-blue-700 rounded-2xl p-6 text-white shadow-xl">
                            <h3 className="font-bold text-lg mb-2">Join result alerts!</h3>
                            <p className="text-blue-100 text-sm mb-4">Get notified on WhatsApp when JNTUH results are released.</p>
                            <a href="https://wa.me/919550421866" className="block text-center py-3 bg-white text-[#1C61E7] rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                                Join WhatsApp Group
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
