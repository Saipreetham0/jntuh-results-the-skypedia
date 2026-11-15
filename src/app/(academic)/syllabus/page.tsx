"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FileText,
  ChevronRight,
  Search,
  Download,
  FolderOpen,
  ArrowLeft,
  BookOpen,
  Info,
  Calendar,
  Layers,
  ExternalLink,
  Sparkles,
  Check,
  Copy,
  GraduationCap,
  X,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import { AD_SLOTS } from "@/config/adSlots";
import allPdfsFlat from "@/data/all_syllabus_pdfs_flat.json";
import ShareButton from "@/components/share-button";

interface SyllabusItem {
  title: string;
  link: string;
  isPdf: boolean;
  params?: {
    type: string | null;
    level: string | null;
    l123: string | null;
  };
}

interface Breadcrumb {
  title: string;
  level: string | null;
  l123: string | null;
}

interface FlatPdf {
  course: string;
  regulation: string;
  year: string;
  title: string;
  url: string;
}

const POPULAR_SHORTCUTS = [
  { label: "B.Tech R22", query: "R22 B.Tech" },
  { label: "B.Tech R18", query: "R18 B.Tech" },
  { label: "CSE", query: "CSE" },
  { label: "ECE", query: "ECE" },
  { label: "AI & ML", query: "AI&ML" },
  { label: "Data Science", query: "Data Science" },
  { label: "Civil", query: "Civil" },
  { label: "Mechanical", query: "Mechanical" },
  { label: "MBA", query: "MBA" },
  { label: "B.Pharmacy", query: "B.Pharmacy" },
];

export default function SyllabusPage() {
  const [items, setItems] = useState<SyllabusItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegFilter, setSelectedRegFilter] = useState<string>("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchLevel = useCallback(async (level: string | null = null, l123: string | null = "0", path: string[] = []) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (level) params.append("level", level);
      if (l123) params.append("l123", l123);
      if (path.length > 0) params.append("path", path.join(","));

      const response = await axios.get(`/api/syllabus?${params.toString()}`);

      if (response.data.error) {
        setError(response.data.error);
        setItems([]);
      } else {
        setItems(response.data.items || []);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch syllabus data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const loadInitial = async () => {
      try {
        const response = await axios.get('/api/syllabus?l123=0');
        if (!ignore) {
          if (response.data.error) {
            setError(response.data.error);
            setItems([]);
          } else {
            setItems(response.data.items || []);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Fetch Error:", err);
          setError("Failed to fetch syllabus data. Please try again later.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    loadInitial();
    return () => {
      ignore = true;
    };
  }, []);

  const handleItemClick = (item: SyllabusItem) => {
    if (item.isPdf) {
      window.open(item.link, "_blank");
    } else if (item.params) {
      const newBreadcrumb: Breadcrumb = {
        title: item.title,
        level: item.params.level,
        l123: item.params.l123,
      };

      const currentPath = breadcrumbs.map(b => b.level).filter(Boolean) as string[];
      setBreadcrumbs(prev => [...prev, newBreadcrumb]);
      fetchLevel(item.params.level, item.params.l123, currentPath);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setBreadcrumbs([]);
      fetchLevel();
    } else {
      const target = breadcrumbs[index];
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setBreadcrumbs(newBreadcrumbs);

      const newPath = breadcrumbs.slice(0, index).map(b => b.level).filter(Boolean) as string[];
      fetchLevel(target.level, target.l123, newPath);
    }
  };

  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      // Fallback for restricted clipboard contexts
    }
  };

  // Instant global search across all 518 PDFs
  const isGlobalSearch = searchQuery.trim().length > 0;

  const globalSearchResults = useMemo(() => {
    if (!isGlobalSearch) return [];
    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    return (allPdfsFlat as FlatPdf[]).filter(pdf => {
      const matchesReg = selectedRegFilter === "all" || pdf.regulation.toLowerCase().includes(selectedRegFilter.toLowerCase());
      if (!matchesReg) return false;

      const haystack = `${pdf.title} ${pdf.course} ${pdf.regulation} ${pdf.year}`.toLowerCase();
      return tokens.every(token => haystack.includes(token));
    });
  }, [searchQuery, isGlobalSearch, selectedRegFilter]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative pt-24 pb-14 px-4 sm:px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px] -z-10" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm font-bold tracking-tight border border-blue-200 dark:border-blue-800/60"
          >
            <GraduationCap className="w-4 h-4" />
            Official JNTUH Academic Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight"
          >
            JNTUH <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Syllabus</span> Repository
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-8"
          >
            Instant access to 500+ official curriculum guides, course structures, and PDFs across R22, R18, R16, and all departments.
          </motion.p>

          {/* Quick Stats Badges & Share */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <span className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              ⚡ 518 Official PDFs
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
              🎓 R22 (I, II, III & IV Year)
            </span>
            <span className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
              📚 R18 Active Curriculum
            </span>
            <span className="px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              🏛️ 10 Degree Programs
            </span>
            <ShareButton title="JNTUH Official Syllabus Repository (R22, R18, R16)" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Universal Search & Quick Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative group max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors" />
            <input
              id="syllabus-search"
              type="text"
              aria-label="Search 500+ syllabus PDFs by branch, regulation, or keyword"
              placeholder="Search 500+ syllabus PDFs (e.g. CSE R22, AI&ML, ECE, Civil, MBA Finance)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSearchQuery("");
              }}
              className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-md placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Shortcuts */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-4xl mx-auto px-1">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Popular:
            </span>
            {POPULAR_SHORTCUTS.map(sc => (
              <button
                key={sc.label}
                onClick={() => setSearchQuery(sc.query)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  searchQuery.toLowerCase() === sc.query.toLowerCase()
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Search Results Mode */}
        {isGlobalSearch ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Found <span className="text-blue-600 dark:text-blue-400">{globalSearchResults.length}</span> documents for &ldquo;{searchQuery}&rdquo;
                </h2>
              </div>

              {/* Regulation filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
                {["all", "r22", "r18", "r16", "r19", "r17"].map(reg => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegFilter(reg)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${
                      selectedRegFilter === reg
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {reg === "all" ? "All" : reg.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {globalSearchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">No syllabus PDFs matched &ldquo;{searchQuery}&rdquo;</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                  Try checking your spelling or use general keywords like &ldquo;CSE&rdquo;, &ldquo;Civil&rdquo;, or &ldquo;R22&rdquo;.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {globalSearchResults.map((pdf, idx) => (
                  <motion.div
                    key={pdf.url + idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                    className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-500/40 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          pdf.regulation.includes('R22')
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : pdf.regulation.includes('R18')
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {pdf.regulation}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                          {pdf.course}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 mb-1.5">
                        {pdf.title.replace(/\.pdf$/i, '')}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-4">
                        {pdf.year}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </a>
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View PDF online"
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-200/60 dark:border-gray-700"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={(e) => handleCopyLink(pdf.url, e)}
                        aria-label="Copy PDF link"
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-200/60 dark:border-gray-700"
                      >
                        {copiedUrl === pdf.url ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Interactive Folder Explorer Mode */
          <div className="space-y-6">
            {/* Sticky Navigation & Breadcrumbs Bar */}
            <div className="flex items-center justify-between gap-4 sticky top-20 z-40 bg-slate-50/90 dark:bg-gray-950/90 backdrop-blur-md py-3 px-4 rounded-2xl border border-gray-200/70 dark:border-gray-800 shadow-sm">
              <nav className="flex items-center overflow-x-auto no-scrollbar py-1 max-w-full text-xs sm:text-sm font-semibold">
                <button
                  onClick={() => handleBreadcrumbClick(-1)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    breadcrumbs.length === 0
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  All Courses
                </button>

                <AnimatePresence mode="popLayout">
                  {breadcrumbs.map((crumb, idx) => (
                    <motion.div
                      key={crumb.level || idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center shrink-0"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400 mx-1 shrink-0" />
                      <button
                        onClick={() => handleBreadcrumbClick(idx)}
                        className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                          idx === breadcrumbs.length - 1
                            ? "bg-blue-600 text-white font-bold shadow-sm"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        {crumb.title.replace(/^[0-9]+\./, '')}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </nav>

              {breadcrumbs.length > 0 && (
                <button
                  onClick={() => handleBreadcrumbClick(breadcrumbs.length - 2)}
                  aria-label="Go back to previous folder level"
                  className="shrink-0 flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              )}
            </div>

            {/* Stable Top Banner Ad above Explorer */}
            <div className="w-full overflow-hidden flex items-center justify-center min-h-[90px]">
              <ResponsiveAd adSlot={AD_SLOTS.RESULTS.TOP_BANNER} format="auto" />
            </div>

            {/* Folder / File Grid */}
            <div className="relative min-h-[400px]">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="h-44 rounded-3xl bg-white dark:bg-gray-800/60 animate-pulse border border-gray-100 dark:border-gray-800" />
                  ))}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 px-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4 text-red-500">
                    <Info className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Temporary Server Interruption</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                    {error}
                  </p>
                  <button
                    onClick={() => handleBreadcrumbClick(-1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Return to All Courses
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 font-bold text-base">No items found in this section</p>
                  <button
                    onClick={() => handleBreadcrumbClick(-1)}
                    className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Back to All Courses
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {items.map((item, idx) => (
                    <React.Fragment key={item.title + item.link}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: Math.min(idx * 0.03, 0.25) }}
                        whileHover={{ y: -4 }}
                        onClick={() => handleItemClick(item)}
                        className={`group p-5 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                          item.isPdf
                            ? "bg-white dark:bg-gray-900 border-red-100/60 dark:border-red-950/40 hover:shadow-xl hover:shadow-red-500/5 hover:border-red-300"
                            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3.5 rounded-2xl ${
                              item.isPdf
                                ? "bg-red-50 dark:bg-red-950/30 text-red-500"
                                : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                            }`}>
                              {item.isPdf ? <FileText className="w-6 h-6" /> : <FolderOpen className="w-6 h-6" />}
                            </div>

                            {item.isPdf ? (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-sm">
                                PDF
                              </span>
                            ) : (
                              <span className="text-gray-300 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words line-clamp-2">
                            {item.title.replace(/^[0-9]+\./, '').replace(/\.pdf$/i, '')}
                          </h3>
                          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                            {item.isPdf ? "Official Document" : "Explore Curriculum"}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50 dark:border-gray-800/80">
                          {item.isPdf ? (
                            <div className="flex items-center gap-1 text-xs font-bold text-red-500">
                              <Download className="w-3.5 h-3.5" /> Download
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                              Open Folder
                            </div>
                          )}
                          <Layers className="w-4 h-4 text-gray-200 dark:text-gray-800" />
                        </div>
                      </motion.div>

                      {(idx + 1) % 8 === 0 && (
                        <div className="col-span-full my-4">
                          <InContentAd adSlot={AD_SLOTS.RESULTS.INLINE_1} />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Informational Academic Guidance Footer */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                Looking for Branch-Wise R22 / R18 Download Hubs?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                Visit dedicated syllabus pages for CSE, ECE, EEE, Mechanical, Civil, and IT to download year-wise curricula, lab manuals, and credit schemes in 1 click.
              </p>
            </div>
            <div className="md:ml-auto flex items-center gap-2">
              <Link
                href="/syllabus/cse"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap"
              >
                CSE Syllabus
              </Link>
              <a
                href="https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200/60 dark:border-gray-700 whitespace-nowrap flex items-center gap-1"
              >
                Official JNTUH Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions about JNTUH Syllabus
            </h3>
          </div>

          <div className="space-y-3">
            <details className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 transition-colors">
              <summary className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>Where can I download the official JNTUH R22 syllabus PDF?</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                You can download the official JNTUH R22 B.Tech, M.Tech, and B.Pharmacy syllabus PDFs directly from our repository or from the JNTUH Online Student Services (OSS) portal. All semesters (1st to 4th year) are available with direct links.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 transition-colors">
              <summary className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>What is the internal and external marks weightage in JNTUH R22?</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Under the JNTUH R22 regulation, the assessment pattern is 40 marks for Continuous Internal Evaluation (CIE) and 60 marks for Semester End Examination (SEE), compared to 25/75 in R18.
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 transition-colors">
              <summary className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>How many credits are required to complete B.Tech in JNTUH R22 & R18?</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                For both R22 and R18 regulations, a student must secure 160 credits for the award of a B.Tech regular degree (120 credits for lateral entry students).
              </p>
            </details>

            <details className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 transition-colors">
              <summary className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>Are autonomous colleges under JNTUH following the same syllabus?</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
              </summary>
              <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                No. Autonomous colleges affiliated with JNTUH design their own curriculum approved by their Academic Council. Non-autonomous affiliated colleges strictly follow the university syllabus provided here.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}
