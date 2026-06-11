'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Sparkles } from 'lucide-react';
import { ResponsiveAd, InContentAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';

interface EligibleSubject {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  graceMarksAwarded: number;
  semester?: string;
}

interface GraceMarksResult {
  details?: {
    name?: string;
    rollNumber?: string;
    branch?: string;
  };
  isEligible?: boolean;
  eligibleSubjects?: EligibleSubject[];
  message?: string;
}

const ROLL_RE = /^[0-9]{1,2}[A-Z]{1,2}[0-9]{2}[A-Z][0-9]{4}$/;

export default function GraceMarksEligibilityPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GraceMarksResult | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const roll = rollNumber.trim().toUpperCase();

    if (!ROLL_RE.test(roll)) {
      setError('Enter a valid JNTUH roll number (e.g. 20J25A0501)');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/grace-marks/eligibility?rollNumber=${roll}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to fetch grace marks eligibility');
      }
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subjects: EligibleSubject[] = result?.eligibleSubjects ?? [];
  const eligible = subjects.length > 0 || result?.isEligible === true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1C61E7] transition-colors mb-4">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              JNTUH Grace Marks
            </p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Grace Marks Eligibility</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Check which subjects qualify for JNTUH grace marks. Students who scored 23–24 in external exams
            may receive 1–2 grace marks to achieve a passing grade.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} />

        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={rollNumber}
              onChange={e => setRollNumber(e.target.value.toUpperCase())}
              placeholder="Enter Roll Number (e.g. 20J25A0501)"
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading
                ? <><ArrowPathIcon className="animate-spin h-4 w-4" /> Checking…</>
                : <><MagnifyingGlassIcon className="h-4 w-4" /> Check Eligibility</>}
            </button>
          </form>

          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3">
              <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Student info strip */}
            {result.details?.name && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span><span className="text-gray-500 dark:text-gray-400">Name: </span><strong className="text-gray-900 dark:text-white">{result.details.name}</strong></span>
                <span><span className="text-gray-500 dark:text-gray-400">Roll: </span><strong className="font-mono text-gray-900 dark:text-white">{result.details.rollNumber}</strong></span>
                {result.details.branch && <span><span className="text-gray-500 dark:text-gray-400">Branch: </span><strong className="text-gray-900 dark:text-white">{result.details.branch}</strong></span>}
              </div>
            )}

            {/* Eligibility verdict */}
            <div className={`rounded-2xl border p-5 flex items-start gap-4 ${
              eligible
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
            }`}>
              {eligible
                ? <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                : <XCircleIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5" />}
              <div>
                <p className={`font-semibold text-sm ${eligible ? 'text-green-800 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {eligible ? `Eligible — ${subjects.length} subject${subjects.length !== 1 ? 's' : ''} qualify for grace marks` : 'No grace marks applicable'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {eligible
                    ? 'The following subjects have external marks just below passing. JNTUH may award grace marks per regulation.'
                    : result.message ?? 'All subjects either already passed or external marks are too far below the passing threshold.'}
                </p>
              </div>
            </div>

            {/* Subject cards */}
            {subjects.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-semibold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider px-1">Eligible Subjects</h2>
                {subjects.map((sub, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{sub.subjectName}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{sub.subjectCode}{sub.semester ? ` · Sem ${sub.semester}` : ''}</p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Internal</p>
                          <p className="font-bold text-gray-900 dark:text-white">{sub.internalMarks}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">External</p>
                          <p className="font-bold text-red-600">{sub.externalMarks}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Grace</p>
                          <p className="font-bold text-amber-600">+{sub.graceMarksAwarded}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">New Ext</p>
                          <p className="font-bold text-green-600">{sub.externalMarks + sub.graceMarksAwarded}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />
          </>
        )}

        {/* Info box */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p className="font-semibold text-gray-800 dark:text-gray-200">JNTUH Grace Marks Rules</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>External passing marks: 25 out of 75</li>
            <li>Students scoring 23 or 24 in external exams are eligible for 1–2 grace marks</li>
            <li>Grace marks are subject to JNTUH regulation and semester rules</li>
            <li>Internal marks must meet the minimum requirement independently</li>
          </ul>
        </div>

        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} />
      </div>
    </div>
  );
}
