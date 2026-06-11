'use client';

import React, { useState, useMemo } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { ResponsiveAd } from '@/components/adsense';
import AD_SLOTS from '@/config/adSlots';

const TOTAL_SEMS_OPTIONS = [6, 8] as const; // Diploma / B.Tech

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function calcRequired(targetCgpa: number, currentCgpa: number, semsDone: number, semsLeft: number): number {
  // CGPA = (current_cgpa * sems_done + required * sems_left) / total
  return (targetCgpa * (semsDone + semsLeft) - currentCgpa * semsDone) / semsLeft;
}

type Feasibility = 'already' | 'easy' | 'hard' | 'stretch' | 'impossible';

function feasibility(sgpa: number): Feasibility {
  if (sgpa > 10) return 'impossible';
  if (sgpa <= 0) return 'already'; // target already exceeded — any score works
  if (sgpa >= 9.5) return 'stretch';
  if (sgpa >= 8.5) return 'hard';
  return 'easy';
}

const FEASIBILITY_CONFIG: Record<Feasibility, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  already:    { label: 'Already Exceeded', color: 'text-green-700 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',    icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
  easy:       { label: 'Achievable',        color: 'text-green-700 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',    icon: <CheckCircle2 className="h-5 w-5 text-green-600" /> },
  hard:       { label: 'Challenging',       color: 'text-blue-700 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',        icon: <TrendingUp className="h-5 w-5 text-blue-600" /> },
  stretch:    { label: 'Very Tough',        color: 'text-orange-700 dark:text-orange-400',bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', icon: <AlertTriangle className="h-5 w-5 text-orange-500" /> },
  impossible: { label: 'Not Possible',      color: 'text-red-700 dark:text-red-400',      bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',            icon: <AlertTriangle className="h-5 w-5 text-red-600" /> },
};

const SCENARIOS = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0];

export default function CGPATargetPlannerPage() {
  const [currentCgpa, setCurrentCgpa] = useState('');
  const [semsDone, setSemsDone] = useState('');
  const [targetCgpa, setTargetCgpa] = useState('');
  const [totalSems, setTotalSems] = useState<number>(8);

  const result = useMemo(() => {
    const cur = parseFloat(currentCgpa);
    const done = parseInt(semsDone, 10);
    const target = parseFloat(targetCgpa);

    if (isNaN(cur) || isNaN(done) || isNaN(target)) return null;
    if (cur < 0 || cur > 10 || target < 0 || target > 10) return null;
    if (done < 1 || done >= totalSems) return null;

    const left = totalSems - done;
    const required = calcRequired(target, cur, done, left);
    const f = feasibility(required);

    // What CGPA you get if you maintain X SGPA per remaining semester
    const scenarios = SCENARIOS.map(sgpa => ({
      sgpa,
      finalCgpa: (cur * done + sgpa * left) / totalSems,
    }));

    return { required, left, f, scenarios };
  }, [currentCgpa, semsDone, targetCgpa, totalSems]);

  const fc = result ? FEASIBILITY_CONFIG[result.f] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C61E7]/10 text-[#1C61E7] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Target className="h-3.5 w-3.5" />
            JNTUH Calculator
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CGPA Target Planner</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Find out the SGPA you need each remaining semester to hit your CGPA goal.
          </p>
        </div>

        <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} />

        {/* Calculator card */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 space-y-5">

          {/* Total semesters toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Programme</label>
            <div className="flex gap-2">
              {TOTAL_SEMS_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setTotalSems(n)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
                    totalSems === n
                      ? 'bg-[#1C61E7] text-white border-[#1C61E7]'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#1C61E7]'
                  }`}
                >
                  {n === 8 ? 'B.Tech (8 sems)' : 'Diploma (6 sems)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Current CGPA */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Current CGPA
              </label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.01}
                placeholder="e.g. 7.40"
                value={currentCgpa}
                onChange={e => setCurrentCgpa(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent"
              />
            </div>

            {/* Semesters completed */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Semesters Done
              </label>
              <select
                value={semsDone}
                onChange={e => setSemsDone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent"
              >
                <option value="">Select</option>
                {Array.from({ length: totalSems - 1 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Target CGPA */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Target CGPA
              </label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.01}
                placeholder="e.g. 8.00"
                value={targetCgpa}
                onChange={e => setTargetCgpa(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1C61E7] focus:border-transparent"
              />
            </div>
          </div>

          {/* Result banner */}
          {result && fc && (
            <div className={`rounded-xl border p-4 ${fc.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                {fc.icon}
                <span className={`font-bold text-sm ${fc.color}`}>{fc.label}</span>
              </div>
              {result.f === 'impossible' ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  It's not mathematically possible to reach <strong>{targetCgpa}</strong> in{' '}
                  {result.left} remaining semester{result.left !== 1 ? 's' : ''}, even with a perfect 10 SGPA.
                  Consider adjusting your target.
                </p>
              ) : result.f === 'already' ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your current CGPA of <strong>{currentCgpa}</strong> already exceeds your target of{' '}
                  <strong>{targetCgpa}</strong>. You'll stay above it as long as you pass your remaining semesters.
                </p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You need a minimum of{' '}
                  <strong className={fc.color} style={{ fontSize: '1.1em' }}>
                    {result.required.toFixed(2)} SGPA
                  </strong>{' '}
                  in each of your {result.left} remaining semester{result.left !== 1 ? 's' : ''}.
                </p>
              )}
            </div>
          )}

          {/* Hint */}
          {!result && (
            <div className="flex items-start gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>Fill in all three fields above. CGPA is calculated as the simple average of all semester SGPAs.</span>
            </div>
          )}
        </div>

        {/* What-if scenarios table */}
        {result && result.f !== 'impossible' && result.f !== 'already' && (
          <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm">What if I score…</h2>
              <p className="text-xs text-gray-400 mt-0.5">Final CGPA for different average SGPAs across your remaining {result.left} semester{result.left !== 1 ? 's' : ''}.</p>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {result.scenarios.map(({ sgpa, finalCgpa }) => {
                const clamped = clamp(finalCgpa, 0, 10);
                const meetsTarget = finalCgpa >= parseFloat(targetCgpa) - 0.005;
                return (
                  <div key={sgpa} className={`flex items-center justify-between px-5 py-3 ${meetsTarget ? 'bg-green-50/60 dark:bg-green-900/10' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-14">
                        {sgpa.toFixed(1)} SGPA
                      </span>
                      <div className="w-32 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                        <div
                          className={`h-1.5 rounded-full ${meetsTarget ? 'bg-green-500' : 'bg-[#1C61E7]'}`}
                          style={{ width: `${(clamped / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${meetsTarget ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                        {clamped.toFixed(2)} CGPA
                      </span>
                      {meetsTarget && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6">
          <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.RESULT_BOTTOM} />
        </div>

        {/* Formula note */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p className="font-semibold text-gray-700 dark:text-gray-300">How is this calculated?</p>
          <p>CGPA = (sum of all semester SGPAs) ÷ total semesters</p>
          <p>Required SGPA = (Target × Total sems − Current × Sems done) ÷ Remaining sems</p>
        </div>

      </div>
    </div>
  );
}
