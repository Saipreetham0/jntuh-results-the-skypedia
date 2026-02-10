import React from "react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { GraduationCap, Search, Bell, History, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd, MultiplexAd } from "@/components/adsense";
import { AD_SLOTS } from "@/config/adSlots";
import FAQSectionDynamic from "@/components/seo/FAQSectionDynamic";

export const metadata: Metadata = generateMetadata({
    title: "JNTUH MBA Results 2025 - All Semesters Regular/Supply",
    description: "Check your JNTUH MBA 1st, 2nd, 3rd, and 4th Semester Results instantly. Complete portal for R22, R19, R17 MBA results with grade reports.",
    path: "/mba-results",
});

const mbaFaqs = [
    {
        question: "When will JNTUH MBA 1st Sem results be released?",
        answer: "Typically, JNTUH releases MBA results 45-60 days after the completion of examinations. You can join our WhatsApp group for instant alerts when they are announced."
    },
    {
        question: "How to check JNTUH MBA individual student result?",
        answer: "Enter your Hall Ticket number on the official results portal or use our simplified results checker for faster access during peak traffic."
    }
];

export default function MBAResultsPage() {
    return (
        <main className="bg-white dark:bg-gray-950 min-h-screen">
            <BreadcrumbSchema
                items={[
                    { name: "Home", path: "/" },
                    { name: "MBA Results", path: "/mba-results" },
                ]}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 py-12 md:py-20 px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="w-16 h-16 bg-[#1C61E7] rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl mb-8">
                        <GraduationCap size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        JNTUH <span className="text-[#1C61E7]">MBA Results</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Fastest portal to check JNTUH Master of Business Administration results for all years and regulations (R22, R19, R17, R15).
                    </p>

                    <Link
                        href="/jntuh-results"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C61E7] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-lg"
                    >
                        Check Results Now <Search size={20} />
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-10">
                        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "MBA 1st Sem Results", status: "Latest Announced", color: "blue" },
                                { title: "MBA 2nd Sem Results", status: "Exams Completed", color: "emerald" },
                                { title: "MBA 3rd Sem Results", status: "Evaluation Phase", color: "blue" },
                                { title: "MBA 4th Sem Results", status: "Project Vivavoce", color: "emerald" },
                            ].map((sem, idx) => (
                                <div key={idx} className="group p-8 bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 hover:border-[#1C61E7] transition-all relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className={`text-xs font-black uppercase tracking-widest mb-2 ${sem.color === 'blue' ? 'text-blue-500' : 'text-emerald-500'}`}>
                                            {sem.status}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            {sem.title}
                                        </h3>
                                        <div className="flex items-center text-sm font-bold text-[#1C61E7] group-hover:translate-x-1 transition-transform">
                                            Check Results <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <History size={64} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />

                        <article className="prose prose-lg dark:prose-invert max-w-none bg-blue-50/30 dark:bg-blue-900/10 p-10 rounded-[40px] border border-blue-100/50 dark:border-blue-900/20">
                            <h2 className="text-3xl font-bold mb-6">JNTUH MBA Grading System</h2>
                            <p>
                                The Master of Business Administration program at JNTUH follows a Choice Based Credit System (CBCS). Unlike B.Tech, MBA students must maintain a different SGPA threshold for promotion.
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                                <li className="flex gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>Minimum Pass Marks: 50% combined</span>
                                </li>
                                <li className="flex gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>Internal Assessment: 25-40 Marks</span>
                                </li>
                                <li className="flex gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>External Examination: 60-75 Marks</span>
                                </li>
                                <li className="flex gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>Project Work is mandatory in 4th Sem</span>
                                </li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-[#1C61E7] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-white/10 rounded-full -mr-4 -mt-4">
                                <Bell size={40} className="animate-bounce" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">MBA Result Alerts</h3>
                            <p className="text-blue-100 mb-6 font-medium">Be the first to know when MBA 1-1, 1-2, 2-1 or 2-2 results are out.</p>
                            <div className="space-y-3">
                                <a href="https://wa.me/919550421866" className="block text-center py-4 bg-white text-[#1C61E7] font-bold rounded-2xl hover:scale-105 transition-all">
                                    Join WhatsApp
                                </a>
                                <button className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold border border-white/30 rounded-2xl hover:bg-white/10 transition-colors">
                                    <Share2 size={16} /> Share With Classmates
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <History className="text-[#1C61E7]" /> Recent Result Updates
                            </h4>
                            <div className="space-y-4">
                                {[
                                    "MBA 1st Sem Regular Results June 2024",
                                    "MBA 2nd Sem Supply Results May 2024",
                                    "MBA 3rd Sem Regular Results April 2024",
                                    "MBA 4th Sem Supply Results March 2024"
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer border-b border-gray-50 last:border-0 pb-4">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sticky top-24">
                            <ResponsiveAd adSlot={AD_SLOTS.RESULTS.SIDEBAR_WIDGET} />
                        </div>
                    </aside>
                </div>
            </div>

            <FAQSectionDynamic faqs={mbaFaqs} title="MBA Results FAQ" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <MultiplexAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} />
            </div>
        </main>
    );
}
