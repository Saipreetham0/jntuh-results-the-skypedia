import React from "react";
import { Metadata } from "next";
import { generateMetadata as constructMetadata } from "@/lib/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { BookOpen, GraduationCap, Download, FileText, ChevronRight, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";
import { BRANCH_SYLLABUS } from "@/data/branch_syllabus";

export async function generateStaticParams() {
    const branches = ["cse", "ece", "eee", "me", "ce", "it"];
    return branches.map((branch) => ({
        branch: branch,
    }));
}

interface SyllabusPageProps {
    params: Promise<{ branch: string }>;
}

const branchNames: Record<string, string> = {
    cse: "Computer Science and Engineering",
    ece: "Electronics and Communication Engineering",
    eee: "Electrical and Electronics Engineering",
    me: "Mechanical Engineering",
    ce: "Civil Engineering",
    it: "Information Technology",
};

export async function generateMetadata({ params }: SyllabusPageProps): Promise<Metadata> {
    const { branch } = await params;
    const name = branchNames[branch] || branch.toUpperCase();
    return constructMetadata({
        title: `JNTUH ${name} Syllabus PDF - R22, R18 Official`,
        description: `Download official JNTUH ${name} syllabus for all semesters and regulations (R22, R18, R16). Official PDF curriculum guides for B.Tech students.`,
        path: `/syllabus/${branch}`,
    });
}

export default async function BranchSyllabusPage({ params }: SyllabusPageProps) {
    const { branch } = await params;
    const branchKey = branch.toLowerCase();
    const branchData = BRANCH_SYLLABUS[branchKey] || BRANCH_SYLLABUS.cse;
    const name = branchData.fullName;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
            <BreadcrumbSchema
                items={[
                    { name: "Home", path: "/" },
                    { name: "Syllabus", path: "/syllabus" },
                    { name: `${branch.toUpperCase()} Syllabus`, path: `/syllabus/${branch}` },
                ]}
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800/60">
                        <BookOpen className="w-4 h-4" />
                        Official Course Curriculum
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        JNTUH <span className="text-blue-600 dark:text-blue-400">{branch.toUpperCase()}</span> Syllabus PDF
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                        Complete and updated syllabus for {name}. Download the latest R22 regulation curriculum along with previous R18 and R16 versions.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-10">
                        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="auto" />

                        {/* Regulation Downloads Section */}
                        <div className="space-y-8">
                            {branchData.regulations.map((reg) => (
                                <div
                                    key={reg.regulation}
                                    className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm transition-all hover:border-blue-500/30"
                                >
                                    {/* Header */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl">
                                                {reg.regulation}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                                        {branch.toUpperCase()} - {reg.regulation} Regulation
                                                    </h2>
                                                    <span
                                                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                                            reg.status === 'Latest'
                                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                                                                : reg.status === 'Active'
                                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                        }`}
                                                    >
                                                        {reg.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {reg.description} • <span className="font-medium text-gray-700 dark:text-gray-300">{reg.creditSystem}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        {reg.docs.map((doc) => (
                                            <div
                                                key={doc.yearTitle}
                                                className="flex flex-col justify-between p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors"
                                            >
                                                <div>
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                                                            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                                                            {doc.yearTitle}
                                                        </div>
                                                        {doc.fileSize && (
                                                            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-md border border-gray-100 dark:border-gray-700">
                                                                {doc.fileSize}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-4">
                                                        {doc.semesters}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                                                    <a
                                                        href={doc.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        Download PDF
                                                    </a>
                                                    <a
                                                        href={doc.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View ${doc.yearTitle} online`}
                                                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-200/60 dark:border-gray-700"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mid-content Ad */}
                        <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />

                        {/* Informational SEO Guide */}
                        <article className="prose prose-lg dark:prose-invert max-w-none bg-blue-50/30 dark:bg-blue-900/10 p-8 rounded-[32px] border border-blue-50 dark:border-blue-900/20">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                About {name} Curriculum
                            </h2>
                            <p>
                                JNTUH updates its syllabus periodically to align with AICTE model curricula and emerging industry standards. The current **R22 Regulation** (introduced in 2022) implements continuous internal evaluation (40 internal / 60 external) and provides flexibility with professional and open electives.
                            </p>
                            <h3 className="text-xl font-bold mt-6 mb-3">Key Highlights of the {branch.toUpperCase()} Curriculum:</h3>
                            <ul className="space-y-2 text-sm md:text-base">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Complete Semester Breakdown:</strong> Detailed subject units, lecture hours, tutorial, and practical credits.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Assessment Scheme:</strong> Explicit split between internal mid examinations, assignments, and external end-semester exams.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Prescribed Textbooks:</strong> Standard reference books, authors, and publisher editions recommended by the Board of Studies.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span><strong>Electives & Minors:</strong> Tracks for B.Tech Honors, Minors in Data Science, AI, and multidisciplinary domains.</span>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-blue-100 dark:border-blue-800/40 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-base">Looking for other courses?</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Browse MBA, M.Tech, and B.Pharmacy syllabus in the repository.</p>
                                </div>
                                <Link
                                    href="/syllabus"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-colors"
                                >
                                    Browse All Courses
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Other Branches
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.entries(branchNames).map(([slug, bName]) => (
                                    slug !== branch && (
                                        <Link
                                            key={slug}
                                            href={`/syllabus/${slug}`}
                                            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-between group"
                                        >
                                            <div>
                                                <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:text-blue-400 block">
                                                    {slug.toUpperCase()}
                                                </span>
                                                <span className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                                                    {bName}
                                                </span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[32px] p-8 text-white shadow-xl">
                            <h3 className="font-bold text-xl mb-3">Check Your Results</h3>
                            <p className="text-emerald-50 text-sm mb-6">
                                Compare your marks with the new syllabus guidelines and calculate your CGPA instantly.
                            </p>
                            <Link
                                href="/jntuh-results"
                                className="block text-center py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:scale-105 transition-all shadow-lg"
                            >
                                Go to Results Portal
                            </Link>
                        </div>

                        <div className="sticky top-24">
                            <ResponsiveAd adSlot={AD_SLOTS.RESULTS.SIDEBAR_WIDGET} />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
