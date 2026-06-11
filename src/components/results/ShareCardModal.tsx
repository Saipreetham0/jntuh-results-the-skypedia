'use client';

import React, { useRef, useState, useCallback } from 'react';
import { X, Download, Share2, Loader2 } from 'lucide-react';
import { ConsolidatedResult } from '@/types/results';
import ResultShareCard from './ResultShareCard';

interface Props {
  results: ConsolidatedResult;
  onClose: () => void;
}

export default function ShareCardModal({ results, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const capture = useCallback(async () => {
    if (!cardRef.current) return null;
    const html2canvas = (await import('html2canvas')).default;
    return html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  }, []);

  const handleDownload = useCallback(async () => {
    setBusy(true);
    try {
      const canvas = await capture();
      if (!canvas) return;
      const a = document.createElement('a');
      a.download = `${results.details.rollNumber}_results_card.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } finally {
      setBusy(false);
    }
  }, [capture, results.details.rollNumber]);

  const handleShare = useCallback(async () => {
    setBusy(true);
    try {
      const canvas = await capture();
      if (!canvas) return;
      canvas.toBlob(async blob => {
        if (!blob) return;
        const file = new File([blob], `${results.details.rollNumber}_results.png`, { type: 'image/png' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${results.details.name}'s JNTUH Results`,
            text: `Check out my JNTUH results! jntuhresults.theskypedia.com`,
          });
        } else {
          // Fall back to download when Web Share isn't available
          const a = document.createElement('a');
          a.download = `${results.details.rollNumber}_results_card.png`;
          a.href = canvas.toDataURL('image/png');
          a.click();
        }
      }, 'image/png');
    } finally {
      setBusy(false);
    }
  }, [capture, results]);

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Share Result Card</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Card preview */}
        <div className="flex justify-center px-5 py-5 bg-gray-50 dark:bg-gray-800/50">
          <ResultShareCard results={results} cardRef={cardRef} />
        </div>

        {/* Actions */}
        <div className="px-5 py-4 flex gap-3">
          <button
            onClick={handleDownload}
            disabled={busy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PNG
          </button>

          {canShare && (
            <button
              onClick={handleShare}
              disabled={busy}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-sm hover:border-[#1C61E7] hover:text-[#1C61E7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
              Share
            </button>
          )}
        </div>

        <p className="px-5 pb-4 text-xs text-gray-400 text-center">
          Save the image and share on WhatsApp, Instagram, or LinkedIn.
        </p>
      </div>
    </div>
  );
}
