'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

// Module-level cache to prevent duplicate fetches across component remounts
const fetchCache = new Map<string, { data: any; timestamp: number }>();
const pendingFetches = new Map<string, Promise<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
    description = "View your complete semester-wise academic performance"
}: SemesterResultsClientProps) {
    const searchParams = useSearchParams();
    const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || defaultRollNumber || '');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<StudentResult | null>(null);
    const [error, setError] = useState('');
    const [expandedSemester, setExpandedSemester] = useState<string | null>(null);
    const [searchFocus, setSearchFocus] = useState(false);

    // Track if we've already fetched to prevent duplicate calls
    const hasFetchedRef = useRef(false);
    const lastFetchedRollNumber = useRef<string>('');

    // Load results if rollNumber is in URL params
    useEffect(() => {
        const urlRollNumber = searchParams?.get('rollNumber') || defaultRollNumber;

        // Only fetch if we haven't fetched yet
        if (urlRollNumber && !hasFetchedRef.current) {
            setRollNumber(urlRollNumber);
            hasFetchedRef.current = true;
            fetchResults(urlRollNumber);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchResults = async (roll: string) => {
        // Check module-level cache first
        const cached = fetchCache.get(roll);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            setResults(cached.data);
            lastFetchedRollNumber.current = roll;

            // Update URL
            const url = new URL(window.location.href);
            url.searchParams.set('rollNumber', roll);
            window.history.pushState({}, '', url);

            // Expand the latest semester
            if (cached.data.results && cached.data.results.length > 0) {
                setExpandedSemester(cached.data.results[cached.data.results.length - 1].semester);
            }
            return;
        }

        // Check if there's already a pending fetch for this roll number
        if (pendingFetches.has(roll)) {
            setLoading(true);
            try {
                const data = await pendingFetches.get(roll);
                setResults(data);
                lastFetchedRollNumber.current = roll;

                // Update URL
                const url = new URL(window.location.href);
                url.searchParams.set('rollNumber', roll);
                window.history.pushState({}, '', url);

                // Expand the latest semester
                if (cached?.data?.results && cached.data.results.length > 0) {
                    setExpandedSemester(cached.data.results[cached.data.results.length - 1].semester);
                }
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

        // Create a promise for this fetch and store it
        const fetchPromise = (async () => {
            try {
                const response = await fetch(`/api/semester-wise-results?rollNumber=${roll}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Failed to fetch results');
                }

                const data = await response.json();

                // Cache the result
                fetchCache.set(roll, { data, timestamp: Date.now() });

                return data;
            } finally {
                // Remove from pending fetches
                pendingFetches.delete(roll);
            }
        })();

        pendingFetches.set(roll, fetchPromise);

        try {
            const data = await fetchPromise;
            setResults(data);

            // Update URL with the roll number parameter without navigation
            const url = new URL(window.location.href);
            url.searchParams.set('rollNumber', roll);
            window.history.pushState({}, '', url);

            // Expand the latest semester by default
            if (data.results && data.results.length > 0) {
                setExpandedSemester(data.results[data.results.length - 1].semester);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching results');
            lastFetchedRollNumber.current = ''; // Reset on error to allow retry
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rollNumber) {
            setError('Please enter a roll number');
            return;
        }

        // Reset the ref to allow manual search
        hasFetchedRef.current = false;
        fetchResults(rollNumber);
    };

    // Function to get color based on grade
    const getGradeColor = (grade: string): string => {
        switch (grade) {
            case 'O': return 'bg-green-100 text-green-800';
            case 'A+': return 'bg-green-50 text-green-700';
            case 'A': return 'bg-blue-100 text-blue-800';
            case 'B+': return 'bg-blue-50 text-blue-700';
            case 'B': return 'bg-indigo-50 text-indigo-700';
            case 'C': return 'bg-yellow-50 text-yellow-800';
            case 'P': return 'bg-yellow-100 text-yellow-800';
            case 'F': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Calculate GPA color
    const getGPAColor = (gpa: number): string => {
        if (gpa >= 9) return 'text-green-600';
        if (gpa >= 8) return 'text-blue-600';
        if (gpa >= 7) return 'text-indigo-600';
        if (gpa >= 6) return 'text-yellow-600';
        return 'text-red-600';
    };

    const toggleSemester = (semester: string) => {
        setExpandedSemester(expandedSemester === semester ? null : semester);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center mb-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 rounded-xl bg-[#1C61E7] flex items-center justify-center mr-4 shadow-md">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                {title}
                            </h1>
                            <p className="text-sm text-[#1C61E7] font-semibold">JNTUH Results Portal</p>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-base">{description}</p>
                </motion.div>

                {/* Top Ad Banner */}
                <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.TOP_BANNER} format="horizontal" className="my-4" />

                {/* Search Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`bg-white dark:bg-gray-800 shadow-xl border-l-4 border-l-[#1C61E7] rounded-xl mb-8 transition-all duration-300 ${searchFocus ? 'ring-2 ring-[#1C61E7] ring-opacity-50' : ''}`}
                >
                    <div className="px-6 py-8 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-[#1C61E7] rounded-lg shadow-md">
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Search Results</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Enter hall ticket number to view result</p>
                            </div>
                        </div>
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="rollNumber"
                                    name="rollNumber"
                                    value={rollNumber}
                                    onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                    onFocus={() => setSearchFocus(true)}
                                    onBlur={() => setSearchFocus(false)}
                                    placeholder="Enter Roll Number (e.g., 20J25A0501)"
                                    className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-[#1C61E7] text-base font-medium uppercase"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3.5 rounded-lg bg-[#1C61E7] text-white font-semibold hover:bg-[#1C61E7]/90 focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:ring-offset-2 transition-all duration-150 disabled:bg-[#1C61E7]/50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center min-w-[140px]"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Loading</span>
                                    </div>
                                ) : (
                                    <span>Search Results</span>
                                )}
                            </button>
                        </form>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg flex items-center justify-center"
                                >
                                    <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Ad Banner when no results are shown */}
                {!results && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_1} className="my-8" />
                    </motion.div>
                )}

                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            {/* Student Details Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-l-4 border-l-[#1C61E7]"
                            >
                                <div className="px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-[#1C61E7]/10 rounded-lg border-2 border-[#1C61E7]/20">
                                            <svg className="h-6 w-6 text-[#1C61E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Information</h2>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Student Name</span>
                                            <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.name}</span>
                                        </div>
                                        <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Roll Number</span>
                                            <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.rollNumber}</span>
                                        </div>
                                        <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">College Code</span>
                                            <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.collegeCode}</span>
                                        </div>
                                        <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Father's Name</span>
                                            <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.fatherName}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Ad Banner between student details and overview */}
                            <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_2} className="my-4" />

                            {/* Overall Performance Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-l-4 border-l-[#21C15E]"
                            >
                                <div className="px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-[#21C15E]/10 rounded-lg border-2 border-[#21C15E]/20">
                                            <svg className="h-6 w-6 text-[#21C15E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Academic Overview</h2>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col items-center p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 shadow-md">
                                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">OVERALL CGPA</span>
                                            <span className={`text-5xl font-bold ${getGPAColor(results.overallGPA || 0)}`}>
                                                {results.overallGPA?.toFixed(2)}
                                            </span>
                                            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                                                <div
                                                    className="bg-[#1C61E7] h-3 rounded-full transition-all duration-500 shadow-sm"
                                                    style={{ width: `${Math.min((results.overallGPA || 0), 10) * 10}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800 shadow-md">
                                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">TOTAL CREDITS</span>
                                            <span className="text-5xl font-bold text-[#21C15E]">{results.totalCredits}</span>
                                            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm">Credits Earned</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Semester Results */}
                            <div className="space-y-4">
                                {results.results.map((semester, index) => (
                                    <motion.div
                                        key={semester.semester}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div
                                            onClick={() => toggleSemester(semester.semester)}
                                            className="px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                        >
                                            <div className="flex items-center space-x-5">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C61E7] to-[#1552c4] flex items-center justify-center shadow-lg text-white font-bold text-lg">
                                                    {semester.semester}
                                                </div>
                                                <div>
                                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Semester {semester.semester}</h2>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                                            {semester.latestResults?.length || 0} Subjects
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-8">
                                                <div className="flex flex-col items-end hidden sm:flex">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">SGPA</span>
                                                    <span className={`text-xl font-bold ${getGPAColor(semester.semesterGPA || 0)}`}>
                                                        {semester.semesterGPA?.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-end hidden sm:flex">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Credits</span>
                                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{semester.totalCredits}</span>
                                                </div>
                                                <div className={`p-2 rounded-full transition-all duration-300 ${expandedSemester === semester.semester ? 'bg-[#1C61E7]/10 rotate-180' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                                    <svg
                                                        className={`w-5 h-5 transition-colors duration-200 ${expandedSemester === semester.semester ? 'text-[#1C61E7]' : 'text-gray-500'}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedSemester === semester.semester && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700"
                                                >
                                                    <div className="p-4 md:p-6">
                                                        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            Subject Information
                                                                        </th>
                                                                        <th scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            Internal
                                                                        </th>
                                                                        <th scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            External
                                                                        </th>
                                                                        <th scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            Total
                                                                        </th>
                                                                        <th scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            Grade
                                                                        </th>
                                                                        <th scope="col" className="px-4 py-4 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                                            Credits
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                                    {semester.latestResults?.map((subject) => (
                                                                        <tr key={subject.subjectCode} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors duration-150">
                                                                            <td className="px-6 py-4">
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{subject.subjectName}</span>
                                                                                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded w-fit">{subject.subjectCode}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-600 dark:text-gray-300">
                                                                                {subject.internalMarks}
                                                                            </td>
                                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-600 dark:text-gray-300">
                                                                                {subject.externalMarks}
                                                                            </td>
                                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900 dark:text-white">
                                                                                {subject.totalMarks}
                                                                            </td>
                                                                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${getGradeColor(subject.grades)}`}>
                                                                                    {subject.grades}
                                                                                </span>
                                                                            </td>
                                                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-center font-bold text-gray-900 dark:text-white">
                                                                                {subject.credits}
                                                                            </td>
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

                            {/* Footer with instructions */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                                className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 py-3 rounded-lg"
                            >
                                <p>Click on a semester row to expand and see detailed subject-wise results.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
