"use client";

import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { ResponsiveAd, InContentAd, MultiplexAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';
import { MOCK_PAPERS, QuestionPaper } from '@/app/_data/papers';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';

const branches = [
    "Common", "CSE", "ECE", "EEE", "ME", "CE", "IT"
];

const regulations = ["R22", "R18", "R16", "R15", "R13"];

const paperFaqs = [
    {
        question: "How do I download JNTUH previous papers in PDF?",
        answer: "Click on the 'Download PDF' button next to your desired subject. The file will open in a new tab where you can save it. All papers are provided in standard PDF format."
    },
    {
        question: "Are these papers official JNTUH question papers?",
        answer: "Yes, these are authentic previous year question papers collected from various JNTUH affiliated colleges and examinations."
    },
    {
        question: "Can I find papers for R22 regulation?",
        answer: "Yes, our repository includes the latest R22 regulation papers along with R18 and R16 for all engineering branches."
    }
];

export default function PreviousPapersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('Common');
    const [selectedReg, setSelectedReg] = useState('R22');

    const filteredPapers = useMemo(() => {
        return MOCK_PAPERS.filter(paper => {
            const matchesSearch = paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBranch = paper.branch === selectedBranch;
            const matchesReg = paper.regulation === selectedReg;
            return matchesSearch && matchesBranch && matchesReg;
        });
    }, [searchQuery, selectedBranch, selectedReg]);

    return (
        <main className="bg-[#F8FAFC] dark:bg-black min-h-screen">
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Academic Resources', path: '/syllabus' },
                    { name: 'Previous Question Papers', path: '/jntuh-previous-question-papers' }
                ]}
            />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C61E7]/5 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#1C61E7]/10 text-[#1C61E7] rounded-full text-sm font-bold border border-[#1C61E7]/20">
                        <BookOpen className="w-4 h-4" />
                        Official Repository
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        JNTUH Previous <span className="text-[#1C61E7]">Question Papers</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        Access a massive collection of JNTUH B.Tech, M.Tech, and B.Pharm previous papers organized by regulation and branch.
                    </p>

                    <div className="max-w-2xl mx-auto relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1C61E7] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by subject name or code (e.g. Mathematics, CS102ES)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-[24px] text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#1C61E7]/10 focus:border-[#1C61E7] transition-all shadow-xl"
                        />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-[#1C61E7]" />
                                Filter Papers
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Branch</label>
                                    <div className="flex flex-wrap gap-2">
                                        {branches.map(branch => (
                                            <button
                                                key={branch}
                                                onClick={() => setSelectedBranch(branch)}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedBranch === branch
                                                    ? "bg-[#1C61E7] text-white shadow-lg shadow-blue-500/20"
                                                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {branch}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Regulation</label>
                                    <div className="flex flex-wrap gap-2">
                                        {regulations.map(reg => (
                                            <button
                                                key={reg}
                                                onClick={() => setSelectedReg(reg)}
                                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedReg === reg
                                                    ? "bg-[#21C15E] text-white shadow-lg shadow-emerald-500/20"
                                                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {reg}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <ResponsiveAd adSlot={AD_SLOTS.RESULTS.SIDEBAR_WIDGET} />
                            </div>
                        </div>
                    </aside>

                    {/* Papers List */}
                    <div className="lg:col-span-3 space-y-8">
                        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="horizontal" />

                        <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="w-6 h-6 text-[#1C61E7]" />
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedBranch} - {selectedReg} Question Papers
                                    </h2>
                                </div>
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-[#1C61E7] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                    {filteredPapers.length} Papers Found
                                </span>
                            </div>

                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredPapers.length > 0 ? (
                                    filteredPapers.map((paper, idx) => (
                                        <React.Fragment key={paper.id}>
                                            <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-[#1C61E7]/5 flex items-center justify-center text-[#1C61E7] border border-[#1C61E7]/10 group-hover:scale-110 transition-transform">
                                                        <FileText size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#1C61E7] transition-colors">
                                                            {paper.subject}
                                                        </h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{paper.code}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${paper.examType === 'Regular' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                                                }`}>
                                                                {paper.year} {paper.examType}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1C61E7] hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                                    Download PDF <Download size={18} />
                                                </button>
                                            </div>
                                            {/* Inject ad between items */}
                                            {(idx + 1) % 4 === 0 && (
                                                <div className="p-4 bg-gray-50/30 dark:bg-gray-800/10">
                                                    <InContentAd
                                                        adSlot={(idx + 1) % 8 === 0 ? AD_SLOTS.RESULTS.INLINE_2 : AD_SLOTS.RESULTS.INLINE_1}
                                                    />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <div className="py-20 text-center">
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-10 h-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No papers found</h3>
                                        <p className="text-gray-500 max-w-xs mx-auto">Try changing your filters or searching for a different subject.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1C61E7] to-blue-700 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-md">
                                    <GraduationCap size={48} />
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold mb-2">Ace Your Semester Exams!</h2>
                                    <p className="text-blue-100 max-w-xl">
                                        Practicing previous papers is the most effective way to understand the JNTUH marking scheme and repeated questions.
                                    </p>
                                </div>
                                <div className="md:ml-auto">
                                    <button className="px-8 py-4 bg-white text-[#1C61E7] font-bold rounded-2xl hover:scale-105 transition-all shadow-xl">
                                        Join Study Group
                                    </button>
                                </div>
                            </div>
                        </div>

                        <MultiplexAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} />
                    </div>
                </div>
            </div>

            <FAQSectionDynamic
                faqs={paperFaqs}
                title="Question Paper FAQs"
                description="Everything you need to know about JNTUH previous year resources."
            />
        </main>
    );
}

// Minimal placeholder FileText to avoid missing imports in this block
function FileText({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>;
}
