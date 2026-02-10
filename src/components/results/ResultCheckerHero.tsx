'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Info, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';

export default function ResultCheckerHero() {
    const [rollNumber, setRollNumber] = useState('');
    const [error, setError] = useState('');
    const [searchType, setSearchType] = useState<'consolidated' | 'latest'>('consolidated');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNumber) {
            setError('Please enter your roll number');
            return;
        }
        if (rollNumber.length < 10) {
            setError('Please enter a valid 10-digit roll number');
            return;
        }

        // Redirect based on search type
        if (searchType === 'consolidated') {
            router.push(`/consolidated-results/${rollNumber.toUpperCase()}`);
        } else {
            router.push(`/latest-results/${rollNumber.toUpperCase()}`);
        }
    };

    return (
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                        JNTUH Results <span className="text-[#1C61E7]">2025</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Check your semester results and consolidated marks instantly. Trusted by over 100,000+ JNTUH students for fast and accurate academic data.
                    </p>
                </motion.div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl inline-flex shadow-inner">
                            <button
                                onClick={() => setSearchType('consolidated')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${searchType === 'consolidated'
                                    ? 'bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm scale-105'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                Consolidated
                            </button>
                            <button
                                onClick={() => setSearchType('latest')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${searchType === 'latest'
                                    ? 'bg-white dark:bg-gray-700 text-[#1C61E7] shadow-sm scale-105'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                Latest Results
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.TOP_BEFORE_BUTTON} showLabel={false} />
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-blue-500/10 p-2 md:p-3 border border-gray-100 dark:border-gray-700">
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder={searchType === 'consolidated' ? "Enter Roll Number (e.g. 20J21A0501)" : "Enter Roll Number for Latest Result"}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#1C61E7] text-gray-900 dark:text-white font-medium uppercase placeholder:normal-case"
                                    value={rollNumber}
                                    onChange={(e) => {
                                        setRollNumber(e.target.value.toUpperCase());
                                        setError('');
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#1C61E7] hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                {searchType === 'consolidated' ? 'Check All' : 'Check Latest'}
                            </button>
                        </form>
                        {error && (
                            <div className="mt-3 flex items-center justify-center gap-1.5 text-red-500 text-sm font-medium animate-shake">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <div className="mt-8">
                            <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.TOP_AFTER_BUTTON} showLabel={false} />
                        </div>
                    </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12"
                >
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-sm">Official Data</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <Info className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-sm">Instant Updates</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Award className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-semibold text-sm">Secure Portal</span>
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
