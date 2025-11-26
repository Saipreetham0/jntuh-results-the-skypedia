'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveAd, InContentAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";

// Module-level cache to prevent duplicate fetches
const fetchCache = new Map<string, { data: any; timestamp: number }>();
const pendingFetches = new Map<string, Promise<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface AcademicYear {
  semesterWiseCredits: Record<string, number>;
  creditsObtained: number;
  totalCredits: number;
}

interface CreditResults {
  academicYears: AcademicYear[];
  totalCredits: number;
  totalObtainedCredits: number;
  totalRequiredCredits: number;
}

interface StudentDetails {
  name: string;
  rollNumber: string;
  collegeCode: string;
  fatherName: string;
  branch: string;
}

interface CreditCheckResult {
  details: StudentDetails;
  results: CreditResults;
}

export default function CreditEligibilityCheck() {
  const searchParams = useSearchParams();
  const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CreditCheckResult | null>(null);
  const [error, setError] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  // Track if we've already fetched to prevent duplicate calls
  const hasFetchedRef = useRef(false);

  // Load results if rollNumber is in URL params
  useEffect(() => {
    const urlRollNumber = searchParams?.get('rollNumber');

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

    // Create a promise for this fetch and store it
    const fetchPromise = (async () => {
      try {
        // Use internal API route to avoid CORS issues
        const response = await fetch(`/api/credit-eligibility?htno=${roll}`);

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

      // Update URL with the roll number parameter
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching results');
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

  const getProgressColor = (obtained: number, total: number): string => {
    const percentage = (obtained / total) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (obtained: number, total: number): string => {
    const percentage = (obtained / total) * 100;
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                Credit Eligibility Check
              </h1>
              <p className="text-sm text-[#1C61E7] font-semibold">JNTUH Results Portal</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base">Check your academic credits and eligibility status</p>
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Check Credits</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enter hall ticket number to check credit eligibility</p>
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
                  placeholder="Enter Roll Number (e.g., 20J25A0502)"
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
                    <span>Checking...</span>
                  </div>
                ) : (
                  <span>Check Credits</span>
                )}
              </button>
            </form>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/30 p-3 rounded-lg flex items-center justify-center border border-red-100 dark:border-red-800/50"
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

        {/* Ad Banner when no results */}
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
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Branch</span>
                      <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.branch}</span>
                    </div>
                    <div className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">College Code</span>
                      <span className="text-base font-bold text-gray-900 dark:text-white">{results.details.collegeCode}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ad Banner between details and overview */}
              <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_2} className="my-4" />

              {/* Overall Credits Summary */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Credits Overview</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 shadow-md">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Credits Obtained</span>
                      <span className={`text-5xl font-bold ${getStatusColor(results.results.totalObtainedCredits, results.results.totalRequiredCredits)}`}>
                        {results.results.totalObtainedCredits}
                      </span>
                      <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">out of {results.results.totalRequiredCredits}</span>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800 shadow-md">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Required Credits</span>
                      <span className="text-5xl font-bold text-[#21C15E]">{results.results.totalRequiredCredits}</span>
                      <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">Total Credits</span>
                    </div>
                    <div className="flex flex-col items-center p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800 shadow-md">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Completion</span>
                      <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                        {((results.results.totalObtainedCredits / results.results.totalRequiredCredits) * 100).toFixed(1)}%
                      </span>
                      <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                        <div
                          className={`${getProgressColor(results.results.totalObtainedCredits, results.results.totalRequiredCredits)} h-3 rounded-full transition-all duration-500 shadow-sm`}
                          style={{ width: `${Math.min((results.results.totalObtainedCredits / results.results.totalRequiredCredits) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Academic Year-wise Credits */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#1C61E7]">
                  <div className="w-1.5 h-7 bg-[#1C61E7] rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Year-wise Credit Details</h2>
                </div>

                {results.results.academicYears.map((year, index) => {
                  const yearNumber = index + 2; // Starting from 2nd year
                  const percentage = (year.creditsObtained / year.totalCredits) * 100;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border-l-4 border-l-[#1C61E7]"
                    >
                      <div className="px-6 py-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-[#1C61E7]/10 border-2 border-[#1C61E7]/20 flex items-center justify-center">
                              <span className="text-base font-bold text-[#1C61E7]">{yearNumber}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Year {yearNumber}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Academic Year Credits</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex flex-col items-end px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Obtained</span>
                              <span className={`text-xl font-bold ${getStatusColor(year.creditsObtained, year.totalCredits)}`}>
                                {year.creditsObtained}/{year.totalCredits}
                              </span>
                            </div>
                            <div className="flex flex-col items-end px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Completion</span>
                              <span className="text-xl font-bold text-gray-900 dark:text-white">{percentage.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                            <div
                              className={`${getProgressColor(year.creditsObtained, year.totalCredits)} h-3 rounded-full transition-all duration-500 shadow-sm`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Semester-wise breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Object.entries(year.semesterWiseCredits).map(([semester, credits]) => (
                            <div key={semester} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600">
                              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Sem {semester}</div>
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{credits} Credits</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Eligibility Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="text-center mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800 rounded-lg"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  {results.results.totalObtainedCredits >= results.results.totalRequiredCredits ? (
                    <>
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xl font-bold text-green-600 dark:text-green-400">Eligible for Completion</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                        Need {results.results.totalRequiredCredits - results.results.totalObtainedCredits} More Credits
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {results.results.totalObtainedCredits >= results.results.totalRequiredCredits
                    ? 'You have obtained all required credits for degree completion.'
                    : 'Complete the remaining credits to be eligible for degree completion.'}
                </p>
              </motion.div>

              {/* Bottom Ad Banner */}
              <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.BOTTOM_BANNER} format="auto" className="mt-8 mb-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
