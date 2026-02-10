import React from "react";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { BookOpen, Search, Bell, History, ArrowRight, Share2, Cpu } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd, MultiplexAd } from "@/components/adsense";
import { AD_SLOTS } from "@/config/adSlots";
import FAQSectionDynamic from "@/components/seo/FAQSectionDynamic";

export const metadata: Metadata = generateMetadata({
    title: "JNTUH M.Tech Results 2025 - All Regulations R22, R21, R19",
    description: "Check your JNTUH M.Tech Results for all semesters and specializations (CSE, VLSI, Embedded Systems, Power Systems). Official Grade Reports and CGPA lookup.",
    path: "/mtech-results",
});

const mtechFaqs = [
    {
        question: "How to check JNTUH M.Tech semester results?",
        answer: "You can check your M.Tech results by entering your hall ticket number on our portal. We provide results for all major specializations including Computer Science, ECE, EEE, and Mechanical Engineering."
    },
    {
        question: "What are the passing marks for JNTUH M.Tech?",
        answer: "For M.Tech, a student must secure 40% in external exam and 50% combined (Internal + External) to pass a subject. There is no grace marks system for PG courses usually."
    }
];

export default function MTechResultsPage() {
    return (
        <main className="bg-white dark:bg-gray-950 min-h-screen">
            <BreadcrumbSchema
                items={[
                    { name: "Home", path: "/" },
                    { name: "M.Tech Results", path: "/mtech-results" },
                ]}
            />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-50 to-emerald-50/20 dark:from-gray-900 dark:to-emerald-900/10 py-12 md:py-20 px-6 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="w-16 h-16 bg-[#21C15E] rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl mb-8">
                        <Cpu size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                        JNTUH <span className="text-[#21C15E]">M.Tech Results</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Official portal for JNTUH Master of Technology grade reports. Covering all engineering specializations and regulations (R22, R21, R19, R17).
                    </p>

                    <Link
                        href="/jntuh-results"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#21C15E] text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 text-lg"
                    >
                        Fetch M.Tech Results <Search size={20} />
                    </Link>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-10">
                        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} />

                        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-7 bg-emerald-500 rounded-full"></div>
                                Top M.Tech Specializations
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Computer Science (CSE)", "VLSI & Embedded Systems",
                                    "Power Electronics", "Structural Engineering",
                                    "CAD/CAM", "Software Engineering",
                                    "Digital Systems", "Environment Engg"
                                ].map((spec, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl group cursor-pointer hover:bg-emerald-50 transition-colors">
                                        <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-emerald-600">{spec}</span>
                                        <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />

                        <div className="bg-white dark:bg-gray-800 rounded-[40px] p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-inner relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="text-center md:text-left md:flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">M.Tech Backlog Rules</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        M.Tech students have stricter promotion rules compared to B.Tech. A student must clear all subjects to be eligible for thesis submission in the final year.
                                    </p>
                                    <Link href="/check-backlogs" className="font-black text-emerald-600 hover:underline">Check M.Tech Backlogs →</Link>
                                </div>
                                <div className="p-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl border-2 border-dashed border-emerald-200">
                                    <BookOpen size={48} className="text-emerald-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-[#21C15E] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 bg-white/10 rounded-full -mr-4 -mt-4">
                                <Bell size={40} className="animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">M.Tech Alert Bot</h3>
                            <p className="text-emerald-50 mb-6 font-medium">Join our specialized M.Tech group for project alerts, results, and exam updates.</p>
                            <div className="space-y-3">
                                <a href="https://wa.me/919550421866" className="block text-center py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:scale-105 transition-all">
                                    Class & Result Group
                                </a>
                                <button className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold border border-white/30 rounded-2xl hover:bg-white/10 transition-colors">
                                    <Share2 size={16} /> Invite Colleagues
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <History className="text-[#21C15E]" /> Announcement History
                            </h4>
                            <div className="space-y-4">
                                {[
                                    "M.Tech 1st Sem Results Aug 2024",
                                    "M.Tech 2nd Sem Results July 2024",
                                    "M.Tech 3rd Sem Results June 2024",
                                    "M.Tech 4th Sem Viva Results May 2024"
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

            <FAQSectionDynamic faqs={mtechFaqs} title="M.Tech Results FAQ" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <MultiplexAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} />
            </div>
        </main>
    );
}

function ChevronRight({ size, className }: { size: number, className: string }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>;
}
