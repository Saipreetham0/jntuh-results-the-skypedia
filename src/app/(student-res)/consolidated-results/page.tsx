'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  PrinterIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Module-level cache to prevent duplicate fetches
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

interface Exam {
  examCode: string;
  rcrv: boolean;
  graceMarks: boolean;
  subjects: Subject[];
}

interface SemesterResult {
  semester: string;
  exams: Exam[];
}

interface StudentDetails {
  name: string;
  rollNumber: string;
  collegeCode: string;
  fatherName: string;
  branch: string;
}

interface ConsolidatedResult {
  details: StudentDetails;
  results: SemesterResult[];
}

export default function ConsolidatedResults() {
  const searchParams = useSearchParams();
  const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ConsolidatedResult | null>(null);
  const [error, setError] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  // Track if we've already fetched to prevent duplicate calls
  const hasFetchedRef = useRef(false);
  const lastFetchedRollNumber = useRef<string>('');

  // Load results if rollNumber is in URL params
  useEffect(() => {
    const urlRollNumber = searchParams?.get('rollNumber');

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
      return;
    }

    // Check if there's already a pending fetch
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
        const response = await fetch(`https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${roll}`);

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

      // Update URL
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching results');
      lastFetchedRollNumber.current = '';
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

    hasFetchedRef.current = false;
    fetchResults(rollNumber);
  };

  // Get color based on grade
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'O': return 'bg-green-600 text-white';
      case 'A+': return 'bg-green-500 text-white';
      case 'A': return 'bg-blue-500 text-white';
      case 'B+': return 'bg-cyan-500 text-white';
      case 'B': return 'bg-yellow-500 text-white';
      case 'C': return 'bg-orange-500 text-white';
      case 'F': return 'bg-red-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Calculate overall statistics
  const getOverallStats = () => {
    if (!results) return null;

    let totalCredits = 0;
    let earnedCredits = 0;
    let passedSubjects = 0;
    let failedSubjects = 0;
    const subjectMap = new Map<string, Subject>();

    results.results.forEach(semester => {
      semester.exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          const existing = subjectMap.get(subject.subjectCode);
          if (!existing || subject.totalMarks > existing.totalMarks) {
            subjectMap.set(subject.subjectCode, subject);
          }
        });
      });
    });

    subjectMap.forEach(subject => {
      if (subject.credits > 0) {
        totalCredits += subject.credits;
        if (subject.grades !== 'F') {
          earnedCredits += subject.credits;
          passedSubjects++;
        } else {
          failedSubjects++;
        }
      }
    });

    return { totalCredits, earnedCredits, passedSubjects, failedSubjects, totalSubjects: subjectMap.size };
  };

  const handlePrint = () => {
    window.print();
  };

  // Flatten all subjects across all semesters with only the best attempt
  const getAllSubjects = () => {
    if (!results) return [];

    const subjectMap = new Map<string, Subject & { semester: string; examCode: string }>();

    results.results.forEach(semester => {
      semester.exams.forEach(exam => {
        exam.subjects.forEach(subject => {
          const key = `${semester.semester}-${subject.subjectCode}`;
          const existing = subjectMap.get(key);

          // Keep the best attempt (highest marks)
          if (!existing || subject.totalMarks > existing.totalMarks) {
            subjectMap.set(key, {
              ...subject,
              semester: semester.semester,
              examCode: exam.examCode
            });
          }
        });
      });
    });

    return Array.from(subjectMap.values());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 print:p-0 print:bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Section - Hide on print */}
        <div className="print:hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            {/* Icon with solid background */}
            <div className="inline-flex items-center justify-center p-5 bg-[#1C61E7] rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <DocumentTextIcon className="h-16 w-16 text-white" strokeWidth={2} />
            </div>

            {/* Title with solid color */}
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-[#1C61E7] dark:text-[#21C15E]">
              Consolidated Results
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              Access your complete academic transcript with all semester results,
              grades, and credits in one comprehensive view
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                All Semesters
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                Print Ready
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                Instant Access
              </span>
            </div>
          </motion.div>

          {/* Top Ad */}
          <ResponsiveAd
            adSlot={AD_SLOTS.CONSOLIDATED.TOP_BANNER}
            format="horizontal"
          />

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            {/* Card with glassmorphism effect */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-gray-200/50 dark:border-gray-700/50">
              {/* Header */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-full border-2 border-[#1C61E7]/30">
                  <MagnifyingGlassIcon className="h-6 w-6 text-[#1C61E7]" strokeWidth={2.5} />
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                    Get Your Results
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label
                    htmlFor="rollNumber"
                    className="block text-base font-bold text-gray-900 dark:text-white mb-4"
                  >
                    Enter JNTUH Roll Number
                  </label>

                  {/* Input with enhanced styling */}
                  <div className={`relative rounded-2xl transition-all duration-300 ${searchFocus ? 'ring-4 ring-[#1C61E7]/30 scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <AcademicCapIcon className={`h-6 w-6 transition-colors duration-300 ${searchFocus ? 'text-[#1C61E7]' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="rollNumber"
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                      onFocus={() => setSearchFocus(true)}
                      onBlur={() => setSearchFocus(false)}
                      placeholder="20J25A0201"
                      className="block w-full pl-14 pr-6 py-6 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:border-[#1C61E7] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-xl font-bold uppercase tracking-widest transition-all duration-300"
                      maxLength={10}
                    />
                  </div>

                  {/* Helper text */}
                  <div className="mt-3 flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Enter your 10-digit roll number (e.g., 20J25A0201) to view your complete academic record
                    </p>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="rounded-2xl bg-red-50 dark:bg-red-900/30 p-5 border-2 border-red-200 dark:border-red-800/50"
                  >
                    <div className="flex items-start gap-3">
                      <ExclamationCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-red-900 dark:text-red-200 mb-1">Error</h4>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Submit button with solid color */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1552c4] text-white font-black py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center text-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="animate-spin h-6 w-6 mr-3" strokeWidth={2.5} />
                      <span>Fetching Your Results...</span>
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-6 w-6 mr-3" strokeWidth={2.5} />
                      <span>View Consolidated Results</span>
                    </>
                  )}
                </button>
              </form>

              {/* Additional info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <DocumentTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">All Subjects</p>
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">All Semesters</p>
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <PrinterIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Download PDF</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results Display */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Statistics Cards - Hide on print */}
              {(() => {
                const stats = getOverallStats();
                const completionPercentage = stats ? Math.round((stats.earnedCredits / stats.totalCredits) * 100) : 0;

                return stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="print:hidden mb-8"
                  >
                    {/* Statistics header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                        Your Academic Overview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Quick summary of your academic performance
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Total Subjects Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-blue-500 dark:bg-blue-600 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                              <DocumentTextIcon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                          </div>
                          <p className="text-white/80 text-sm font-bold uppercase tracking-wide mb-1">Total Subjects</p>
                          <p className="text-4xl font-black text-white">{stats.totalSubjects}</p>
                          <p className="text-white/70 text-xs mt-2 font-medium">Across all semesters</p>
                        </div>
                      </motion.div>

                      {/* Passed Subjects Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-green-500 dark:bg-emerald-600 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                              <CheckCircleIcon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                              <span className="text-xs font-bold text-white">
                                {stats.totalSubjects > 0 ? Math.round((stats.passedSubjects / stats.totalSubjects) * 100) : 0}%
                              </span>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm font-bold uppercase tracking-wide mb-1">Passed</p>
                          <p className="text-4xl font-black text-white">{stats.passedSubjects}</p>
                          <p className="text-white/70 text-xs mt-2 font-medium">Successfully cleared</p>
                        </div>
                      </motion.div>

                      {/* Failed Subjects Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-red-500 dark:bg-rose-600 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                              <XCircleIcon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                            {stats.failedSubjects > 0 && (
                              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                <span className="text-xs font-bold text-white">Needs attention</span>
                              </div>
                            )}
                          </div>
                          <p className="text-white/80 text-sm font-bold uppercase tracking-wide mb-1">Failed</p>
                          <p className="text-4xl font-black text-white">{stats.failedSubjects}</p>
                          <p className="text-white/70 text-xs mt-2 font-medium">Requires reappearance</p>
                        </div>
                      </motion.div>

                      {/* Credits Card */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-[#1C61E7] dark:bg-indigo-600 rounded-3xl p-6 shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                              <AcademicCapIcon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                              <span className="text-xs font-bold text-white">{completionPercentage}%</span>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm font-bold uppercase tracking-wide mb-1">Credits Earned</p>
                          <p className="text-4xl font-black text-white">{stats.earnedCredits}</p>
                          <p className="text-white/70 text-xs mt-2 font-medium">Out of {stats.totalCredits} total</p>

                          {/* Progress bar */}
                          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${completionPercentage}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-white rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Print Button */}
              <div className="print:hidden flex justify-center mb-8">
                <motion.button
                  onClick={handlePrint}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all font-black text-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <PrinterIcon className="h-7 w-7 relative z-10" strokeWidth={2.5} />
                  <span className="relative z-10">Download PDF / Print</span>
                  <svg className="h-5 w-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Ad - Hide on print */}
              <div className="print:hidden mb-6">
                <InContentAd adSlot={AD_SLOTS.CONSOLIDATED.INLINE_1} />
              </div>

              {/* A4 Result Sheet */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 shadow-2xl print:shadow-none rounded-3xl print:rounded-none overflow-hidden print:w-full print:max-w-none print:m-0 border border-gray-200 dark:border-gray-700 print:border-0"
              >
                {/* Header Section */}
                <div className="bg-[#1C61E7] text-white p-8 print:bg-white print:text-black print:border-b-2 print:border-black print:p-1 relative overflow-hidden">
                  {/* Decorative background pattern */}
                  <div className="absolute inset-0 opacity-10 print:hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
                  </div>

                  <div className="text-center relative z-10">
                    <div className="inline-flex items-center justify-center mb-4 print:hidden">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <AcademicCapIcon className="h-12 w-12 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black print:text-black print:text-[10px] print:mb-0 tracking-tight">
                      JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY HYDERABAD
                    </h1>
                    <div className="mt-3 print:mt-0">
                      <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-base md:text-lg font-bold print:bg-transparent print:px-0 print:py-0 print:text-black print:text-[8px]">
                        Consolidated Academic Results
                      </span>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 print:bg-white print:border-black print:p-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm print:text-[7px] print:gap-0.5 print:grid-cols-3">
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Name:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.name}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Roll No:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold print:text-black">{results.details.rollNumber}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">College:</span>
                      <span className="text-gray-900 dark:text-white font-mono font-semibold print:text-black">{results.details.collegeCode}</span>
                    </div>
                    <div className="flex items-center print:gap-1 md:col-span-2 print:col-span-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Father:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.fatherName}</span>
                    </div>
                    <div className="flex items-center print:gap-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300 w-32 print:w-auto print:text-black">Branch:</span>
                      <span className="text-gray-900 dark:text-white font-semibold print:text-black">{results.details.branch}</span>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="p-6 print:p-1">
                  <div className="overflow-x-auto">
                    <table className="w-full border-2 border-gray-300 dark:border-gray-600 print:border-black text-sm print:text-[6.5px]">
                      <thead>
                        <tr className="bg-gray-800 dark:bg-gray-700 text-white print:bg-gray-200 print:text-black">
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Sem</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-4 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Code</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-4 py-2 text-left font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Subject Name</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Int</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Ext</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Tot</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Grd</th>
                          <th className="border border-gray-600 dark:border-gray-500 px-3 py-2 text-center font-bold print:border-black print:px-0.5 print:py-0.5 print:text-[6.5px]">Cr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllSubjects().map((subject, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
                            } print:bg-white hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors`}
                          >
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.semester}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.subjectCode}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-medium text-gray-700 dark:text-gray-300 print:border-black print:px-0.5 print:py-0.5 print:text-black print:text-left">
                              {subject.subjectName}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.internalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-semibold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.externalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.totalMarks}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center print:border-black print:px-0.5 print:py-0.5">
                              <span className={`inline-block px-3 py-1 rounded-lg font-bold ${getGradeColor(subject.grades)} print:bg-white print:text-black print:px-0 print:py-0 print:rounded-none`}>
                                {subject.grades}
                              </span>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-center font-bold text-gray-900 dark:text-white print:border-black print:px-0.5 print:py-0.5 print:text-black">
                              {subject.credits}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-900 p-4 border-t-2 border-gray-300 dark:border-gray-700 print:bg-white print:border-black print:p-0.5">
                  <div className="flex justify-between items-center text-xs print:text-[6px] print:mb-0">
                    <p className="text-gray-600 dark:text-gray-400 print:text-black font-medium">
                      Computer-generated document - No signature required
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 print:text-black">
                      Generated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  {(() => {
                    const stats = getOverallStats();
                    return stats ? (
                      <p className="text-center text-sm print:text-[6px] font-bold text-gray-900 dark:text-white print:text-black mt-2 print:mt-0">
                        Credits Earned: {stats.earnedCredits} / {stats.totalCredits}
                      </p>
                    ) : null;
                  })()}
                </div>
              </div>

              {/* Bottom Ad */}
              <div className="print:hidden mt-6">
                <ResponsiveAd
                  adSlot={AD_SLOTS.CONSOLIDATED.BOTTOM_RECTANGLE}
                  format="auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print styles for A4 professional sheet */}
      <style jsx global>{`
        @media print {
          /* A4 page setup - remove browser headers/footers */
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }

          /* Remove browser print elements */
          html, body {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm;
            height: 297mm;
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide all screen-only elements */
          .print\\:hidden {
            display: none !important;
          }

          /* Compact table for single page */
          table {
            font-size: 6.5px !important;
            line-height: 1.1 !important;
            width: 100% !important;
            border-collapse: collapse !important;
            page-break-inside: auto !important;
          }

          thead {
            display: table-header-group !important;
          }

          tbody {
            display: table-row-group !important;
          }

          tr {
            page-break-inside: avoid !important;
            page-break-after: auto !important;
          }

          td, th {
            padding: 0.5px 1px !important;
            font-size: 6.5px !important;
            line-height: 1.1 !important;
            word-break: break-word !important;
          }

          /* Header styling */
          h1, h2 {
            margin: 0 !important;
            padding: 2px 0 !important;
            line-height: 1.2 !important;
          }

          /* Ensure proper spacing */
          .print\\:p-3 {
            padding: 3mm !important;
          }

          .print\\:p-2 {
            padding: 2mm !important;
          }

          .print\\:p-1 {
            padding: 1mm !important;
          }

          /* Force black borders */
          .print\\:border-black {
            border-color: black !important;
          }

          /* Remove background colors in print */
          .print\\:bg-white {
            background: white !important;
          }

          .print\\:text-black {
            color: black !important;
          }

          /* Prevent orphans and widows */
          p, div {
            orphans: 3;
            widows: 3;
          }

          /* Ensure no extra margins */
          * {
            box-sizing: border-box;
          }
        }

        /* Screen view */
        @media screen {
          table {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
