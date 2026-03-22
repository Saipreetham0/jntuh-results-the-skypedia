'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
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
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const fetchCache = new Map<string, { data: any; timestamp: number }>();
const pendingFetches = new Map<string, Promise<any>>();
const CACHE_DURATION = 5 * 60 * 1000;

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

function CreditEligibilityContent() {
  const searchParams = useSearchParams();
  const [rollNumber, setRollNumber] = useState(searchParams?.get('rollNumber') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CreditCheckResult | null>(null);
  const [error, setError] = useState('');

  const hasFetchedRef = useRef(false);

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
    const cached = fetchCache.get(roll);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setResults(cached.data);
      const url = new URL(window.location.href);
      url.searchParams.set('rollNumber', roll);
      window.history.pushState({}, '', url);
      return;
    }

    if (pendingFetches.has(roll)) {
      setLoading(true);
      try {
        const data = await pendingFetches.get(roll);
        setResults(data);
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

    const fetchPromise = (async () => {
      try {
        const response = await fetch(`/api/credit-eligibility?htno=${roll}`);
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
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching results');
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

  const getProgressColor = (obtained: number, total: number) => {
    const pct = (obtained / total) * 100;
    if (pct >= 90) return 'bg-green-500';
    if (pct >= 75) return 'bg-[#1C61E7]';
    if (pct >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusText = (obtained: number, total: number) => {
    const pct = (obtained / total) * 100;
    if (pct >= 90) return 'text-green-600 dark:text-green-400';
    if (pct >= 75) return 'text-[#1C61E7]';
    if (pct >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const isEligible = results && results.results.totalObtainedCredits >= results.results.totalRequiredCredits;
  const completionPct = results ? Math.min((results.results.totalObtainedCredits / results.results.totalRequiredCredits) * 100, 100) : 0;

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Credit Eligibility Check
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Instantly verify whether you meet the credit requirements for promotions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Top Ad */}
        <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.TOP_BANNER} format="auto" />

        {/* Search Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#1C61E7] flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">Enter Hall Ticket Number</p>
              <p className="text-xs text-gray-500">Check your credit eligibility status instantly</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
              placeholder="Enter Roll Number (e.g., 20J25A0502)"
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm font-mono uppercase"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <><ArrowPathIcon className="animate-spin h-4 w-4" /> Checking...</>
              ) : (
                <><MagnifyingGlassIcon className="h-4 w-4" /> Check Credits</>
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
        {!results && !loading && <InContentAd adSlot={AD_SLOTS.SEMESTER.INLINE_1} />}

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
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Student Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Name', value: results.details.name },
                    { label: 'Roll Number', value: results.details.rollNumber },
                    { label: 'Branch', value: results.details.branch },
                    { label: 'College Code', value: results.details.collegeCode },
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

              {/* Credits Overview */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">Credits Overview</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Obtained</p>
                    <p className={`text-3xl font-bold ${getStatusText(results.results.totalObtainedCredits, results.results.totalRequiredCredits)}`}>
                      {results.results.totalObtainedCredits}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">of {results.results.totalRequiredCredits}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Required</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{results.results.totalRequiredCredits}</p>
                    <p className="text-xs text-gray-400 mt-1">Total Credits</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Completion</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{completionPct.toFixed(1)}%</p>
                    <p className="text-xs text-gray-400 mt-1">Progress</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-3 rounded-full ${getProgressColor(results.results.totalObtainedCredits, results.results.totalRequiredCredits)}`}
                  />
                </div>
              </div>

              {/* Year-wise Breakdown */}
              <div className="space-y-3">
                <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider px-1">Year-wise Credit Details</h2>
                {results.results.academicYears.map((year, index) => {
                  const yearNumber = index + 2;
                  const pct = (year.creditsObtained / year.totalCredits) * 100;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1C61E7]/10 dark:bg-[#1C61E7]/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#1C61E7]">{yearNumber}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Year {yearNumber}</p>
                            <p className="text-xs text-gray-500">Academic Year Credits</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 text-center">
                            <p className="text-xs text-gray-500 font-medium uppercase">Obtained</p>
                            <p className={`text-lg font-bold ${getStatusText(year.creditsObtained, year.totalCredits)}`}>
                              {year.creditsObtained}/{year.totalCredits}
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 text-center">
                            <p className="text-xs text-gray-500 font-medium uppercase">Done</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{pct.toFixed(0)}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-4">
                        <div
                          className={`${getProgressColor(year.creditsObtained, year.totalCredits)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(year.semesterWiseCredits).map(([semester, credits]) => (
                          <div key={semester} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                            <p className="text-xs text-gray-500 font-medium mb-1">Sem {semester}</p>
                            <p className="text-base font-bold text-gray-900 dark:text-white">{credits} <span className="text-xs font-normal text-gray-400">cr</span></p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Eligibility Status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl border p-6 text-center ${
                  isEligible
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isEligible ? (
                    <>
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-bold text-green-700 dark:text-green-400">Eligible for Completion</span>
                    </>
                  ) : (
                    <>
                      <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
                      <span className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                        Need {results.results.totalRequiredCredits - results.results.totalObtainedCredits} More Credits
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isEligible
                    ? 'You have obtained all required credits for degree completion.'
                    : 'Complete the remaining credits to be eligible for degree completion.'}
                </p>
              </motion.div>

              {/* Bottom Ad */}
              <ResponsiveAd adSlot={AD_SLOTS.SEMESTER.BOTTOM_BANNER} format="auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CreditEligibilityCheck() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <ArrowPathIcon className="h-8 w-8 text-[#1C61E7] animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <CreditEligibilityContent />
    </Suspense>
  );
}
