'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ConsolidatedResult } from '@/types/results';
import { siteConfig } from '@/config/site';

interface Props {
  results: ConsolidatedResult;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

const GRADE_POINTS: Record<string, number> = {
  O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, D: 4, F: 0, Ab: 0,
};

function bestAttempts(result: ConsolidatedResult) {
  const map = new Map<string, { grades: string; credits: number }>();
  result.results.forEach(sem =>
    sem.exams.forEach(exam =>
      exam.subjects.forEach(s => {
        const ex = map.get(s.subjectCode);
        const gp = GRADE_POINTS[s.grades] ?? 0;
        if (!ex || gp > (GRADE_POINTS[ex.grades] ?? 0)) {
          map.set(s.subjectCode, { grades: s.grades, credits: s.credits });
        }
      })
    )
  );
  return Array.from(map.values());
}

function calcSGPA(subjects: { grades: string; credits: number }[]): string {
  const main = subjects.filter(s => s.credits > 0);
  const totalCr = main.reduce((sum, s) => sum + s.credits, 0);
  if (!totalCr) return '—';
  const wSum = main.reduce((sum, s) => sum + (GRADE_POINTS[s.grades] ?? 0) * s.credits, 0);
  return (wSum / totalCr).toFixed(2);
}

function sgpaColor(val: string): string {
  const n = parseFloat(val);
  if (isNaN(n)) return '#6b7280';
  if (n >= 9) return '#16a34a';
  if (n >= 8) return '#1C61E7';
  if (n >= 7) return '#7c3aed';
  if (n >= 6) return '#d97706';
  return '#dc2626';
}

export default function ResultShareCard({ results, cardRef }: Props) {
  const { details } = results;

  // Semester-wise SGPA (best attempt per subject)
  const semSGPAs = results.results.map(sem => {
    const best = new Map<string, { grades: string; credits: number }>();
    sem.exams.forEach(exam =>
      exam.subjects.forEach(s => {
        const ex = best.get(s.subjectCode);
        const gp = GRADE_POINTS[s.grades] ?? 0;
        if (!ex || gp > (GRADE_POINTS[ex.grades] ?? 0)) best.set(s.subjectCode, { grades: s.grades, credits: s.credits });
      })
    );
    return { semester: sem.semester, sgpa: calcSGPA(Array.from(best.values())) };
  });

  // Overall CGPA + credits
  const all = bestAttempts(results);
  const cgpa = calcSGPA(all);
  const earned = all.filter(s => s.credits > 0 && s.grades !== 'F' && s.grades !== 'Ab').reduce((sum, s) => sum + s.credits, 0);
  const total = all.filter(s => s.credits > 0).reduce((sum, s) => sum + s.credits, 0);
  const passRate = total > 0 ? Math.round((earned / total) * 100) : 0;

  const shareUrl = `${siteConfig.url}/consolidated-results/${details.rollNumber}`;

  // Inline styles throughout — html2canvas reads computed styles so
  // Tailwind works too, but inline is more portable across devices/SSR.
  return (
    <div
      ref={cardRef}
      style={{
        width: 360,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C61E7 0%, #0d47c8 100%)',
          padding: '22px 22px 18px',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.75, letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>
          JNTUH Results · TheSkypedia
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.15, marginBottom: 6 }}>
          {details.name}
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, opacity: 0.9, flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 8px' }}>
            {details.rollNumber}
          </span>
          {details.branch && (
            <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 8px' }}>
              {details.branch}
            </span>
          )}
        </div>
      </div>

      {/* ── CGPA hero row ─────────────────────────────────── */}
      <div
        style={{
          background: '#f8fafc',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div>
          <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
            Overall CGPA
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, color: sgpaColor(cgpa), lineHeight: 1 }}>
            {cgpa}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>Credits</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1e293b' }}>
              {earned}<span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>/{total}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>Pass Rate</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: passRate >= 90 ? '#16a34a' : passRate >= 75 ? '#1C61E7' : '#d97706' }}>
              {passRate}%
            </div>
          </div>
        </div>
      </div>

      {/* ── Semester grid ─────────────────────────────────── */}
      <div style={{ padding: '14px 22px 16px' }}>
        <div style={{ fontSize: 9, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          Semester Performance (SGPA)
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(semSGPAs.length, 4)}, 1fr)`,
            gap: 7,
          }}
        >
          {semSGPAs.map(({ semester, sgpa }) => (
            <div
              key={semester}
              style={{
                background: '#f8fafc',
                borderRadius: 10,
                padding: '8px 4px',
                textAlign: 'center',
                border: `2px solid ${sgpaColor(sgpa)}22`,
              }}
            >
              <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700, marginBottom: 3, textTransform: 'uppercase' }}>
                {semester}
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, color: sgpaColor(sgpa) }}>
                {sgpa}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <div
        style={{
          padding: '12px 22px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #e2e8f0',
          background: '#fafbfc',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: '#1C61E7', fontWeight: 800, marginBottom: 2 }}>
            jntuhresults.theskypedia.com
          </div>
          <div style={{ fontSize: 9, color: '#94a3b8' }}>Scan to view full results</div>
        </div>
        <QRCodeSVG value={shareUrl} size={52} fgColor="#1e293b" bgColor="transparent" level="M" />
      </div>
    </div>
  );
}
