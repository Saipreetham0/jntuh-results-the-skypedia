"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { getAllGuides } from "@/lib/content/guides";

const HomepageBlog: React.FC = () => {
  const guides = getAllGuides().slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Section header — two-column ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C61E7] dark:text-blue-400 mb-3">
              Knowledge Base
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Guides &amp; Insights
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <p className="max-w-xs text-base text-gray-500 dark:text-gray-400 leading-relaxed sm:text-right">
              JNTUH regulations, exam tips, and career guidance — all in one place.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-[#1C61E7]/30 hover:text-[#1C61E7] dark:hover:text-blue-400 transition-all whitespace-nowrap shrink-0"
            >
              All guides
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Article cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-[#1C61E7]/20 dark:hover:border-blue-800/40 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top accent strip */}
              <div className="h-0.5 bg-gradient-to-r from-[#1C61E7] to-[#2d75f5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="p-6 flex flex-col flex-1">
                {/* Article number + tags row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-xs font-black text-gray-200 dark:text-gray-700 tabular-nums select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {guide.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/20 text-[#1C61E7] dark:text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-[16px] font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-[#1C61E7] dark:group-hover:text-blue-400 transition-colors line-clamp-2 tracking-tight leading-snug">
                  {guide.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
                  {guide.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50 dark:border-gray-800">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#1C61E7] dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Mobile "all guides" CTA ──────────────────────────────── */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300 hover:border-[#1C61E7]/30 hover:text-[#1C61E7] transition-all"
          >
            View all guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageBlog;
