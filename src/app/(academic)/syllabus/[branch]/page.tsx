import React from "react";
import { Metadata } from "next";
import { generateMetadata as constructMetadata } from "@/lib/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { BookOpen, GraduationCap, Download, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

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

// export async function generateMetadata({ params }: SyllabusPageProps): Promise<Metadata> {
//     const { branch } = await params;
//     const name = branchNames[branch] || branch.toUpperCase();
//     return constructMetadata({
//         title: `JNTUH ${name} Syllabus PDF - R22, R18 Official`,
//         description: `Download official JNTUH ${name} syllabus for all semesters and regulations (R22, R18, R16). Branch-wise curriculum guides for B.Tech students.`,
//         path: `/syllabus/${branch}`,
//     });
// }

export default async function BranchSyllabusPage({ params }: SyllabusPageProps) {
    const { branch } = await params;
    const name = branchNames[branch] || branch.toUpperCase();

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-black">
            {/* <BreadcrumbSchema
                items={[
                    { name: "Home", path: "/" },
                    { name: "Syllabus", path: "/syllabus" },
                    { name: `${branch.toUpperCase()} Syllabus`, path: `/syllabus/${branch}` },
                ]}
            /> */}

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C61E7]/5 rounded-full blur-[120px] -z-10" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#1C61E7]/10 text-[#1C61E7] rounded-full text-sm font-bold border border-[#1C61E7]/20">
                        <BookOpen className="w-4 h-4" />
                        Official Course Curriculum
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        JNTUH <span className="text-[#1C61E7]">{branch.toUpperCase()}</span> Syllabus PDF
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                        Complete and updated syllabus for {name}. Download the latest R22 regulation curriculum along with previous R18 and R16 versions.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="horizontal" />

                        <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <GraduationCap className="text-[#1C61E7]" />
                                Download by Regulation
                            </h2>

                            <div className="mb-6">
                                <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.BOTTOM_BEFORE_BUTTON} showLabel={false} />
                            </div>

                            {/* ... */}

                            <div className="mt-8">
                                <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.BOTTOM_AFTER_BUTTON} showLabel={false} />
                            </div>
                        </div>

                        <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />

                        <article className="prose prose-lg dark:prose-invert max-w-none bg-blue-50/30 dark:bg-blue-900/10 p-8 rounded-[40px] border border-blue-50 dark:border-blue-900/20">
                            <h2 className="text-2xl font-bold mb-4">About {name} Curriculum</h2>
                            <p>
                                JNTUH updates its syllabus every few years to match industry standards. The latest **R22 Regulation** (introduced in 2022) focuses more on practical learning and credit flexibility compared to **R18** and **R16**.
                            </p>
                            <h3 className="text-xl font-bold mt-6 mb-3">What's in the {branch.toUpperCase()} Syllabus?</h3>
                            <ul>
                                <li>Detailed semester-wise subject listing.</li>
                                <li>Internal and External marks distribution (30/70 or 40/60 depending on regulation).</li>
                                <li>Laboratory experiments and practical guidelines.</li>
                                <li>Reference books and suggested textbooks for each subject.</li>
                                <li>Professional Elective and Open Elective options.</li>
                            </ul>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-gray-900 rounded-[32px] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <ChevronRight className="w-5 h-5 text-[#1C61E7]" />
                                Other Branches
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {Object.entries(branchNames).map(([slug, bName]) => (
                                    slug !== branch && (
                                        <Link key={slug} href={`/syllabus/${slug}`} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 transition-colors flex items-center justify-between group">
                                            <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#1C61E7]">{slug.toUpperCase()}</span>
                                            <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#21C15E] to-emerald-700 rounded-[32px] p-8 text-white shadow-xl">
                            <h3 className="font-bold text-xl mb-3">Check Your Results</h3>
                            <p className="text-emerald-50 text-sm mb-6">Compare your marks with the new syllabus guidelines and calculate your CGPA instantly.</p>
                            <Link href="/jntuh-results" className="block text-center py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:scale-105 transition-all shadow-lg">
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
