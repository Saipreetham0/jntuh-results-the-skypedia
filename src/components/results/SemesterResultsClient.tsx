'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const fetchCache = new Map<string, { data: any; timestamp: number }>();
const pendingFetches = new Map<string, Promise<any>>();
const CACHE_DURATION = 5 * 60 * 1000;

interface Subject {
    subjectCode: string;
    subjectName: string;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    grades: string;
    credits: number;
}

interface SemesterResult {
    semester: string;
    latestResults?: Subject[];
    semesterGPA?: number;
    totalCredits?: number;
}

interface StudentResult {
    details: {
        name: string;
        rollNumber: string;
        collegeCode: string;
        fatherName: string;
    };
    results: SemesterResult[];
    overallGPA?: number;
    totalCredits?: number;
}

interface SemesterResultsClientProps {
    defaultRollNumber?: string;
    title?: string;
    description?: string;
    regulation?: string;
    semester?: string;
}

export default function SemesterResultsClient({
    defaultRollNumber = '',
    title = "Semester Results",
    description = "Look up results for any specific semester quickly and accurately."
}: SemesterResultsClientProps) {
    const searchParams = useSearchParams();
    const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || defaultRollNumber || '');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<StudentResult | null>(null);
    const [error, setError] = useState('');
    const [expandedSemester, setExpandedSemester] = useState<string | null>(null);

    const hasFetchedRef = useRef(false);
    const lastFetchedRollNumber = useRef<string>('');

    useEffect(() => {
        const urlRollNumber = searchParams?.get('rollNumber') || defaultRollNumber;
        if (urlRollNumber && !hasFetchedRef.current) {
            setRollNumber(urlRollNumber);
            hasFetchedRef.current = true;
            fetchResults(urlRollNumber);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchResults = async (roll: string) => {
        const cached = fetchCache.get(roll);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            setResults(cached.data);
            lastFetchedRollNumber.current = roll;
            const url = new URL(window.location.href);
            url.searchParams.set('rollNumber', roll);
            window.history.pushState({}, '', url);
            if (cached.data.results?.length > 0) {
                setExpandedSemester(cached.data.results[cached.data.results.length - 1].semester);
            }
            return;
        }

        if (pendingFetches.has(roll)) {
            setLoading(true);
            try {
                const data = await pendingFetches.get(roll);
                setResults(data);
                lastFetchedRollNumber.current = roll;
                const url = new URL(window.location.href);
                url.searchParams.set('rollNumber', roll);
                window.history.pushState({}, '', url);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching results');
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setError('');
        lastFetchedRollNumber.current = roll;

        const fetchPromise = (async () => {
            try {
                const response = await fetch(`/api/semester-wise-results?rollNumber=${roll}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Failed to fetch results');
                }
                const data = await response.json();
                fetchCache.set(roll, { data, timestamp: Date.now() });
                return data;
            } finally {
                pendingFetches.delete(roll);
            }
        })();

        pendingFetches.set(roll, fetchPromise);

        try {
            const data = await fetchPromise;
            setResults(data);
            const url = new URL(window.location.href);
            url.searchParams.set('rollNumber', roll);
            window.history.pushState({}, '', url);
            if (data.results?.length > 0) {
                setExpandedSemester(data.results[data.results.length - 1].semester);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching results');
            lastFetchedRollNumber.current = '';
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rollNumber) { setError('Please enter a roll number'); return; }
        hasFetchedRef.current = false;
        fetchResults(rollNumber);
    };

    const getGradeColor = (grade: string): string => {
        switch (grade) {
            case 'O': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'A+': return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400';
            case 'A': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'B+': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
            case 'B': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
            case 'C': return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'P': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'F': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getGPAColor = (gpa: number): string => {
        if (gpa >= 9) return 'text-green-600 dark:text-green-400';
        if (gpa >= 8) return 'text-blue-600 dark:text-blue-400';
        if (gpa >= 7) return 'text-indigo-600 dark:text-indigo-400';
        if (gpa >= 6) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const toggleSemester = (semester: string) => {
        setExpandedSemester(expandedSemester === semester ? null : semester);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1C61E7] transition-colors mb-4">
                        <ArrowLeftIcon className="h-3.5 w-3.5" />
                        Back to home
                    </Link>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1C61E7] mb-2">JNTUH Results</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{description}</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Top Ad */}
                <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.TOP_BANNER} format="auto" />

                {/* Search Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-[#1C61E7] flex items-center justify-center flex-shrink-0">
                            <DocumentTextIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">Enter Hall Ticket Number</p>
                            <p className="text-xs text-gray-500">Fetches all semester results in real-time</p>
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                            placeholder="Enter Roll Number (e.g., 20J25A0501)"
                            className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm font-mono uppercase"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            {loading ? (
                                <><ArrowPathIcon className="animate-spin h-4 w-4" /> Loading...</>
                            ) : (
                                <><MagnifyingGlassIcon className="h-4 w-4" /> Search Results</>
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 flex items-center gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3"
                            >
                                <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Ad when no results */}
                {!results && !loading && (
                    <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_1} />
                )}

                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {/* Student Info */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Student Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Name', value: results.details.name },
                                        { label: 'Roll Number', value: results.details.rollNumber },
                                        { label: 'College Code', value: results.details.collegeCode },
                                        { label: "Father's Name", value: results.details.fatherName },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">{label}</p>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* In-content Ad */}
                            <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_2} />

                            {/* Overview stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex flex-col items-center">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Overall CGPA</p>
                                    <p className={`text-4xl font-bold ${getGPAColor(results.overallGPA || 0)}`}>
                                        {results.overallGPA?.toFixed(2)}
                                    </p>
                                    <div className="mt-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                                        <div
                                            className="bg-[#1C61E7] h-2 rounded-full transition-all duration-700"
                                            style={{ width: `${Math.min((results.overallGPA || 0) * 10, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 flex flex-col items-center">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Credits Earned</p>
                                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">{results.totalCredits}</p>
                                    <p className="mt-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full">Total Credits</p>
                                </div>
                            </div>

                            {/* Semester Accordion */}
                            <div className="space-y-3">
                                <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider px-1">Semester Breakdown</h2>
                                {results.results.map((semester, index) => (
                                    <motion.div
                                        key={semester.semester}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
                                    >
                                        {/* Accordion Header */}
                                        <button
                                            onClick={() => toggleSemester(semester.semester)}
                                            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-[#1C61E7] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {semester.semester}
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-semibold text-gray-900 dark:text-white">Semester {semester.semester}</p>
                                                    <p className="text-xs text-gray-500">{semester.latestResults?.length || 0} Subjects</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="hidden sm:flex flex-col items-end">
                                                    <p className="text-xs text-gray-400 font-medium">SGPA</p>
                                                    <p className={`text-lg font-bold ${getGPAColor(semester.semesterGPA || 0)}`}>{semester.semesterGPA?.toFixed(2)}</p>
                                                </div>
                                                <div className="hidden sm:flex flex-col items-end">
                                                    <p className="text-xs text-gray-400 font-medium">Credits</p>
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{semester.totalCredits}</p>
                                                </div>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSemester === semester.semester ? 'rotate-180 text-[#1C61E7]' : ''}`}
                                                />
                                            </div>
                                        </button>

                                        {/* Accordion Body */}
                                        <AnimatePresence>
                                            {expandedSemester === semester.semester && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-gray-100 dark:border-gray-800">
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-sm">
                                                                <thead>
                                                                    <tr className="bg-gray-50 dark:bg-gray-800/60">
                                                                        <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Int</th>
                                                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Ext</th>
                                                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                                                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Cr</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                                    {semester.latestResults?.map((subject) => (
                                                                        <tr key={subject.subjectCode} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                                                            <td className="px-5 py-3">
                                                                                <p className="font-medium text-gray-900 dark:text-white text-sm">{subject.subjectName}</p>
                                                                                <p className="text-xs font-mono text-gray-400 mt-0.5">{subject.subjectCode}</p>
                                                                            </td>
                                                                            <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{subject.internalMarks}</td>
                                                                            <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{subject.externalMarks}</td>
                                                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">{subject.totalMarks}</td>
                                                                            <td className="px-4 py-3 text-center">
                                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getGradeColor(subject.grades)}`}>
                                                                                    {subject.grades}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-4 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">{subject.credits}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Ad */}
                            <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.BOTTOM_BANNER} format="auto" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
