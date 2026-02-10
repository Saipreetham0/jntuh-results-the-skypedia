import React from 'react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';
import { ResponsiveAd, InContentAd, MultiplexAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';
import Link from 'next/link';
import { Calculator, Info, FileText, CheckCircle2, BookOpen, Sparkles, ArrowRight, Copy } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import WebApplicationSchema from '@/components/seo/WebApplicationSchema';

export const metadata: Metadata = generateMetadata({
    title: 'JNTUH CGPA to Percentage Formula - Official R22, R18, R16 Guide',
    description: 'Updated JNTUH CGPA to percentage conversion formula for R22, R20, R18, and R16 regulations. Use our official formula (CGPA - 0.5) * 10 for accurate marks.',
    path: '/blog/jntuh-cgpa-to-percentage-formula'
});

const formulaFaqs = [
    {
        question: "What is the official JNTUH CGPA to percentage formula?",
        answer: "As per JNTUH academic regulations (R18, R20, R22), the formula to convert CGPA to percentage is: Percentage = (CGPA - 0.5) * 10."
    },
    {
        question: "Does JNTUH use CGPA * 9.5 formula?",
        answer: "No, JNTUH specifically follows the (CGPA - 0.5) * 10 formula. The 9.5 multiplier is commonly used by CBSE and some other universities, but JNTUH students should use the university-prescribed 0.5 subtraction method."
    },
    {
        question: "Is there a different formula for R22 regulation?",
        answer: "The conversion formula remains consistent across R18, R20, and R22 regulations for B.Tech students in JNTUH. It is (CGPA - 0.5) * 10."
    },
    {
        question: "How to calculate percentage from SGPA?",
        answer: "To calculate percentage from a single semester (SGPA), you use the same formula: (SGPA - 0.5) * 10. However, for placement and degree purposes, the CGPA-based percentage is usually required."
    }
];

export default function JntuhFormulaPage() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Blog', path: '/blog' },
                    { name: 'CGPA to Percentage Formula', path: '/blog/jntuh-cgpa-to-percentage-formula' }
                ]}
            />
            <WebApplicationSchema
                name="JNTUH CGPA to Percentage Calculator"
                description="Instant official formula based conversion for JNTUH students (R22, R18, R16)."
                url="/blog/jntuh-cgpa-to-percentage-formula"
            />

            {/* Background Mesh Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
            </div>

            {/* Blog Article */}
            <article className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Modern Hero Header */}
                <header className="mb-16">
                    {/* Tags */}
                    <div className="flex justify-center gap-3 mb-8 flex-wrap">
                        {[
                            { label: 'JNTUH Official', icon: CheckCircle2 },
                            { label: 'R22/R18/R16', icon: FileText },
                            { label: 'Academic Guide', icon: BookOpen }
                        ].map(tag => (
                            <span key={tag.label} className="group px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400 border-2 border-blue-100 dark:border-blue-900/50 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:scale-105 transition-all backdrop-blur-sm flex items-center gap-2">
                                <tag.icon className="w-3.5 h-3.5" />
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                        Official JNTUH CGPA<br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            to Percentage Formula
                        </span>
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400 font-semibold gap-4 mb-12">
                        <time dateTime="2025-02-06" className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            Revised Feb 2025
                        </time>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Official Regulations</span>
                    </div>

                    {/* Formula Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] opacity-20 group-hover:opacity-30 blur-xl transition duration-500" />
                            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-16 border-2 border-white/50 dark:border-slate-700/50 shadow-2xl">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-6 text-center flex items-center justify-center gap-2">
                                    <Calculator className="w-4 h-4" />
                                    Master Conversion Formula
                                </p>
                                <div className="text-center mb-8">
                                    <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                        Percentage =
                                    </p>
                                    <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-3xl text-3xl md:text-5xl font-black shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all">
                                        (CGPA - 0.5) × 10
                                    </div>
                                </div>

                                {/* Verification Badges */}
                                <div className="pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-wrap justify-center gap-6">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Industry Accepted</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <span className="text-sm font-bold text-blue-700 dark:text-blue-300">WES Recognition</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Top Ad */}
                <ResponsiveAd adSlot={AD_SLOTS.BLOG.HEADER} format="horizontal" className="mb-12 rounded-2xl overflow-hidden" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {/* How to Convert Section */}
                            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="text-blue-600 dark:text-blue-400">🎓</span>
                                How to Convert JNTUH CGPA to Percentage?
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                                Converting your Cumulative Grade Point Average (CGPA) to a percentage is essential for job applications, higher education admissions, and competitive exams. JNTUH follows a standardized formula that is recognized globally by universities and employers alike.
                            </p>

                            {/* Calculation Steps */}
                            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/40 dark:to-slate-900/20 p-8 md:p-10 rounded-3xl border-2 border-slate-200 dark:border-slate-800 my-12 not-prose shadow-xl">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    Standard Calculation Method
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { num: '1', title: 'Identify CGPA', desc: 'Locate your final CGPA on your official degree memo or results portal.', color: 'bg-blue-600' },
                                        { num: '2', title: 'Standard Deduction', desc: 'Subtract 0.5 from your total CGPA score to account for scaling units.', color: 'bg-indigo-600' },
                                        { num: '3', title: 'Percentage Conversion', desc: 'Multiply the resulting value by 10 to get your final aggregate marks.', color: 'bg-purple-600' }
                                    ].map((step) => (
                                        <div key={step.num} className="group flex gap-5 items-start p-5 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all">
                                            <span className={`${step.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                                {step.num}
                                            </span>
                                            <div className="flex-1 pt-1">
                                                <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">{step.title}</p>
                                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <InContentAd adSlot={AD_SLOTS.CALCULATOR.MID_RECTANGLE} />

                            {/* Concrete Example */}
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-8">📊 Concrete Example</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                                For a student with a CGPA of <strong className="text-blue-600 dark:text-blue-400">8.75</strong>, the conversion would look like this:
                            </p>

                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 rounded-3xl p-10 font-mono text-white mb-12 not-prose relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all">
                                    <Calculator className="w-40 h-40" />
                                </div>
                                <div className="space-y-5 relative z-10">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                        <span className="text-slate-400 text-sm">Step 1: Deduction</span>
                                        <span className="text-2xl">8.75 - 0.5 = <span className="text-emerald-400 font-bold">8.25</span></span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                        <span className="text-slate-400 text-sm">Step 2: Multiplication</span>
                                        <span className="text-2xl">8.25 × 10 = <span className="text-emerald-400 font-bold">82.5%</span></span>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <span className="font-bold text-slate-300 uppercase tracking-wider">Final Percentage</span>
                                        <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">82.50%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Regulation Breakdown */}
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-8">📚 Regulation Breakdown</h3>
                            <div className="overflow-hidden not-prose my-10 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl">
                                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                                        <tr>
                                            <th className="px-8 py-5 text-left font-bold uppercase tracking-widest text-xs text-slate-500 dark:text-slate-400">Regulation</th>
                                            <th className="px-8 py-5 text-left font-bold uppercase tracking-widest text-xs text-slate-500 dark:text-slate-400">Pass Requirement</th>
                                            <th className="px-8 py-5 text-left font-bold uppercase tracking-widest text-xs text-slate-500 dark:text-slate-400">Formula</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                                        {[
                                            { reg: 'R22 / R20', pass: '40% Aggregate', formula: '(CGPA - 0.5) × 10' },
                                            { reg: 'R18 / R16', pass: '40% Aggregate', formula: '(CGPA - 0.5) × 10' },
                                            { reg: 'R15 / R13', pass: '40% Aggregate', formula: '(CGPA - 0.5) × 10' }
                                        ].map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{row.reg}</td>
                                                <td className="px-8 py-6 text-slate-600 dark:text-slate-400 font-medium">{row.pass}</td>
                                                <td className="px-8 py-6">
                                                    <span className="font-mono bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-sm font-bold">
                                                        {row.formula}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            {/* Interactive Tools */}
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-xl">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-600" />
                                    Interactive Tools
                                </h3>
                                <div className="space-y-4">
                                    <Link href="/cgpa-percentage-converter" className="group block p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                <Calculator className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Web Converter</p>
                                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Instant Results</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                    <Link href="/sgpa-to-cgpa-calculator" className="group block p-5 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border-2 border-transparent hover:border-emerald-300 dark:hover:border-emerald-700 transition-all hover:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">SGPA Mapper</p>
                                                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Semester Logic</p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <MultiplexAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_WIDGET} />
                            </div>
                        </div>
                    </aside>
                </div>

                {/* CTA Section */}
                <div className="mt-20 pt-16 not-prose">
                    <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 md:p-16 rounded-[3rem] text-center shadow-2xl">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                        <div className="relative z-10">
                            <h4 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                                Instant Accuracy Converter
                            </h4>
                            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                                Stop manual calculations. Use our certified JNTUH engine to get results to 2 decimal places instantly.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Link
                                    href="/cgpa-percentage-converter"
                                    className="group px-10 py-5 bg-white text-blue-600 rounded-[1.5rem] font-bold shadow-2xl hover:shadow-white/30 hover:scale-110 transition-all no-underline text-lg flex items-center gap-2"
                                >
                                    Launch Official Calculator
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/marks-percentage-calculator"
                                    className="px-10 py-5 bg-blue-800/40 text-white backdrop-blur-xl border-2 border-white/20 rounded-[1.5rem] font-bold hover:bg-blue-800/60 hover:scale-105 transition-all no-underline text-lg"
                                >
                                    Marks to %
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center not-prose">
                    <MultiplexAd adSlot={AD_SLOTS.CALCULATOR.SIDEBAR_WIDGET} />
                </div>
            </article>

            {/* FAQ Section */}
            <div className="bg-slate-50 dark:bg-slate-800/50 relative z-10">
                <FAQSectionDynamic
                    faqs={formulaFaqs}
                    title="Conversion Formula FAQs"
                    description="Common questions about JNTUH percentage calculations."
                />
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
                <MultiplexAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} />
            </div>
        </main>
    );
}
