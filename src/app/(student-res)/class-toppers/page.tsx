'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, MagnifyingGlassIcon, ArrowPathIcon, ExclamationCircleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ResponsiveAd, InContentAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';

const ROLL_RE = /^[0-9]{1,2}[A-Z]{1,2}[0-9]{2}[A-Z][0-9]{4}$/;

const GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F', 'Ab'] as const;
type Grade = typeof GRADES[number];

const GRADE_POINTS: Record<Grade, number> = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, F: 0, Ab: 0, D: 4 } as Record<Grade, number>;
const GRADE_COLORS: Record<string, string> = {
  O: '#16a34a', 'A+': '#22c55e', A: '#1C61E7', 'B+': '#3b82f6',
  B: '#8b5cf6', C: '#f59e0b', F: '#ef4444', Ab: '#9ca3af',
};

interface StudentRecord {
  name?: string;
  rollNumber?: string;
  cgpa?: number | string;
  grades?: Partial<Record<Grade, number>>;
  rank?: number;
}

interface ClassResultsData {
  students?: StudentRecord[];
  details?: { name?: string; rollNumber?: string };
  totalStudents?: number;
  yourRank?: number;
}

function computeGradeDistribution(students: StudentRecord[]) {
  const counts: Record<string, number> = {};
  GRADES.forEach(g => (counts[g] = 0));

  students.forEach(s => {
    if (!s.grades) return;
    Object.entries(s.grades).forEach(([g, c]) => {
      if (g in counts) counts[g] += c as number;
    });
  });

  return GRADES.map(g => ({ grade: g, count: counts[g] })).filter(d => d.count > 0);
}

const MEDAL_COLORS = ['#f59e0b', '#9ca3af', '#b45309'];

export default function ClassToppersPage() {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassResultsData | null>(null);
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
    setData(null);

    try {
      const res = await fetch(`/api/class-results?rollNumber=${roll}&type=academicresult`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Failed to fetch class results');
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const students: StudentRecord[] = data?.students ?? [];
  const gradeData = students.length > 0 ? computeGradeDistribution(students) : [];
  const toppers = [...students]
    .sort((a, b) => Number(b.cgpa ?? 0) - Number(a.cgpa ?? 0))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1C61E7] transition-colors mb-4">
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#1C61E7] flex items-center justify-center flex-shrink-0">
              <TrophyIcon className="h-5 w-5 text-white" />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#1C61E7]">Class Analytics</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Class Toppers & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter any roll number to see the leaderboard and grade distribution for your entire batch.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} />

        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={rollNumber}
              onChange={e => setRollNumber(e.target.value.toUpperCase())}
              placeholder="Enter Roll Number (e.g. 20J25A0501)"
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading
                ? <><ArrowPathIcon className="animate-spin h-4 w-4" />Loading… (may take ~30s)</>
                : <><MagnifyingGlassIcon className="h-4 w-4" />Fetch Class Results</>}
            </button>
          </form>

          {loading && (
            <p className="mt-3 text-xs text-gray-400 text-center">
              Fetching the full class dataset — this usually takes 15–30 seconds.
            </p>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3">
              <ExclamationCircleIcon className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {data && students.length > 0 && (
          <>
            {/* Stats summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Total Students', value: data.totalStudents ?? students.length },
                { label: 'Your Rank',      value: data.yourRank ? `#${data.yourRank}` : '—' },
                { label: 'Class Average',  value: students.length > 0 ? (students.reduce((s, st) => s + Number(st.cgpa ?? 0), 0) / students.length).toFixed(2) : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* Top 10 leaderboard */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-semibold text-gray-900 dark:text-white">Top 10 — Class Leaderboard</h2>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-800">
                {toppers.map((s, i) => {
                  const rank = i + 1;
                  const medal = rank <= 3 ? MEDAL_COLORS[rank - 1] : null;
                  const isYou = s.rollNumber === rollNumber.toUpperCase();
                  return (
                    <div
                      key={s.rollNumber ?? i}
                      className={`flex items-center gap-4 px-5 py-3.5 ${isYou ? 'bg-blue-50/60 dark:bg-blue-900/10' : ''}`}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: medal ? medal + '22' : '#f1f5f9', color: medal ?? '#64748b' }}
                      >
                        {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm truncate ${isYou ? 'text-[#1C61E7]' : 'text-gray-900 dark:text-white'}`}>
                          {s.name ?? 'Student'}{isYou ? ' (You)' : ''}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">{s.rollNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-gray-900 dark:text-white">{Number(s.cgpa ?? 0).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">CGPA</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />

            {/* Grade distribution chart */}
            {gradeData.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Grade Distribution</h2>
                <p className="text-xs text-gray-400 mb-5">Total grade counts across all subjects in the class.</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={gradeData} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="grade" tick={{ fontSize: 12, fontWeight: 700 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(v: number) => [v, 'Students']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {gradeData.map(d => (
                        <Cell key={d.grade} fill={GRADE_COLORS[d.grade] ?? '#6b7280'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}

        {data && students.length === 0 && !error && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-400">
            No class data returned for this roll number.
          </div>
        )}

        <ResponsiveAd adSlot={AD_SLOTS.RESULTS.BOTTOM_BANNER} />
      </div>
    </div>
  );
}
