'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CheckCircle2, AlertCircle, ShieldCheck, Zap, Users } from 'lucide-react';
import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';

interface ResultCheckerHeroProps {
    onSearch?: (rollNumber: string) => void;
}

export default function ResultCheckerHero({ onSearch }: ResultCheckerHeroProps) {
    const [rollNumber, setRollNumber] = useState('');
    const [error, setError] = useState('');
    const [searchType, setSearchType] = useState<'consolidated' | 'latest'>('consolidated');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNumber) { setError('Please enter your roll number'); return; }
        if (rollNumber.length < 10) { setError('Please enter a valid 10-digit roll number'); return; }

        if (onSearch && searchType === 'consolidated') {
            onSearch(rollNumber);
            return;
        }

        if (searchType === 'consolidated') {
            router.push(`/consolidated-results/${rollNumber.toUpperCase()}`);
        } else {
            router.push(`/latest-results/${rollNumber.toUpperCase()}`);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-[#1C61E7]/20 border border-blue-100 dark:border-[#1C61E7]/30 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C61E7] animate-pulse" />
                    <span className="text-xs font-semibold text-[#1C61E7] uppercase tracking-wider">JNTUH Results Portal</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                    Check Your JNTUH Results{' '}
                    <span className="text-[#1C61E7]">Instantly</span>
                </h1>
                <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
                    Trusted by 1,00,000+ JNTUH students for fast and accurate academic data — no server crashes, no waiting.
                </p>

                {/* Ad above search */}
                <div className="mb-5">
                    <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.TOP_BEFORE_BUTTON} showLabel={false} />
                </div>

                {/* Search card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-2">

                    {/* Tab pills */}
                    <div className="flex justify-center p-1 pb-2">
                        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl inline-flex">
                            {(['consolidated', 'latest'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSearchType(type)}
                                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                        searchType === type
                                            ? 'bg-white dark:bg-gray-600 text-[#1C61E7] shadow-sm'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                                >
                                    {type === 'consolidated' ? 'Consolidated' : 'Latest Result'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search form */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 px-1 pb-1">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder={
                                    searchType === 'consolidated'
                                        ? 'Enter Roll Number (e.g. 20J21A0501)'
                                        : 'Enter Roll Number for Latest Result'
                                }
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent text-gray-900 dark:text-white text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans placeholder:text-gray-400"
                                value={rollNumber}
                                onChange={(e) => {
                                    setRollNumber(e.target.value.toUpperCase());
                                    setError('');
                                }}
                                maxLength={10}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#1C61E7] hover:bg-[#1552c4] active:scale-95 text-white font-bold px-7 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {searchType === 'consolidated' ? 'Check All Results' : 'Check Latest'}
                        </button>
                    </form>

                    {error && (
                        <div className="flex items-center justify-center gap-1.5 text-red-500 text-xs font-medium py-2">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {error}
                        </div>
                    )}

                    {/* Ad below button */}
                    <div className="mt-1 px-1">
                        <ResponsiveAd adSlot={AD_SLOTS.ACTIONS.TOP_AFTER_BUTTON} showLabel={false} />
                    </div>
                </div>

                {/* Trust badges */}
                <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    {[
                        { icon: ShieldCheck, label: 'Official JNTUH Data', color: 'text-green-500' },
                        { icon: Zap, label: 'Instant Results', color: 'text-yellow-500' },
                        { icon: Users, label: '1L+ Students Served', color: 'text-[#1C61E7]' },
                    ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <Icon className={`w-4 h-4 ${color}`} />
                            <span className="font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
