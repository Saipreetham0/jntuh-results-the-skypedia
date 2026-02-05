"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";

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

export default function SyllabusPage() {
  const [items, setItems] = useState<SyllabusItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    fetchLevel();
  }, [fetchLevel]);

  const handleItemClick = (item: SyllabusItem) => {
    if (item.isPdf) {
      window.open(item.link, "_blank");
    } else if (item.params) {
      const newBreadcrumb: Breadcrumb = {
        title: item.title,
        level: item.params.level,
        l123: item.params.l123
      };

      // The current breadcrumbs represent the PATH to the current page.
      // So the path to the NEXT page includes the current levels.
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

      // Path is the sequence of levels BEFORE the target
      const newPath = breadcrumbs.slice(0, index).map(b => b.level).filter(Boolean) as string[];
      fetchLevel(target.level, target.l123, newPath);
    }
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C61E7]/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#21C15E]/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[#1C61E7]/10 text-[#1C61E7] rounded-full text-sm font-bold tracking-tight border border-[#1C61E7]/20"
          >
            <BookOpen className="w-4 h-4" />
            Academic Resources
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter"
          >
            JNTUH <span className="text-[#1C61E7]">Syllabus</span> Repository
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Access official syllabus for all courses and regulations. Filtered, updated, and ready for your academic journey.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Navigation & Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10 sticky top-20 z-40 bg-[#F8FAFC]/80 dark:bg-black/80 backdrop-blur-md py-4 rounded-3xl px-4 border border-gray-100 dark:border-gray-800 shadow-sm">

          {/* Advanced Breadcrumbs */}
          <nav className="flex items-center overflow-x-auto no-scrollbar py-2 max-w-full">
            <button
              onClick={() => handleBreadcrumbClick(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#1C61E7] dark:hover:text-[#1C61E7] transition-all shadow-sm border border-gray-100 dark:border-gray-700"
            >
              Courses
            </button>

            <AnimatePresence mode="popLayout">
              {breadcrumbs.map((crumb, idx) => (
                <motion.div
                  key={crumb.level || idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center flex-shrink-0"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                  <button
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm border ${idx === breadcrumbs.length - 1
                      ? "bg-[#1C61E7] text-white border-[#1C61E7]"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-100 dark:border-gray-700"
                      }`}
                  >
                    {crumb.title}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </nav>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#1C61E7] transition-colors" />
            <input
              type="text"
              placeholder="Filter current view..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1C61E7] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-48 rounded-[30px] bg-white dark:bg-gray-800 animate-pulse border border-gray-100 dark:border-gray-700 shadow-sm" />
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-[40px] border-2 border-dashed border-gray-200 dark:border-gray-800 px-6"
            >
              <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6">
                <Info className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Access Restricted or Missing</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md font-medium">
                {error}
              </p>
              <button
                onClick={() => handleBreadcrumbClick(-1)}
                className="mt-8 flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Courses
              </button>
            </motion.div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Sparkles className="w-16 h-16 text-gray-200 mb-6" />
              <p className="text-gray-500 dark:text-gray-400 font-bold text-xl">No matches found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#1C61E7] font-bold hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.title + item.link}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -8 }}
                    onClick={() => handleItemClick(item)}
                    className={`group relative p-6 rounded-[32px] cursor-pointer transition-all duration-300 border ${item.isPdf
                      ? "bg-gradient-to-br from-white to-red-50/30 dark:from-gray-900 dark:to-red-900/10 border-red-100/50 dark:border-red-900/30 hover:shadow-2xl hover:shadow-red-500/10"
                      : "bg-white dark:bg-gray-900 border-white dark:border-gray-800 hover:shadow-2xl hover:shadow-[#1C61E7]/10"
                      }`}
                  >
                    <div className="flex flex-col h-full justify-between gap-6">
                      <div className="flex items-start justify-between">
                        <div className={`p-4 rounded-2xl ${item.isPdf
                          ? "bg-red-50 dark:bg-red-500/20 text-red-500"
                          : "bg-blue-50 dark:bg-[#1C61E7]/20 text-[#1C61E7]"
                          }`}>
                          {item.isPdf ? <FileText className="w-6 h-6" /> : <FolderOpen className="w-6 h-6" />}
                        </div>
                        {item.isPdf && (
                          <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                            PDF
                          </div>
                        )}
                      </div>

                      <div className="flex-grow min-h-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-[#1C61E7] transition-colors break-words line-clamp-3">
                          {item.title}
                        </h3>
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                          {item.isPdf ? "Ready to View" : "Click to Explore"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                        {item.isPdf ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 transition-all group-hover:translate-x-1">
                            Download Now <Download className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C61E7] transition-all group-hover:translate-x-1">
                            See Details <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <Layers className="w-4 h-4 text-gray-200 dark:text-gray-800" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Informational Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 rounded-[40px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen className="w-32 h-32" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#1C61E7]/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-8 h-8 text-[#1C61E7]" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Can't find your syllabus?</h4>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm leading-relaxed max-w-2xl">
                JNTUH periodically updates regulation links. If a link shows "Not Found", it usually means the university is updating the document on their central server. Try checking back in a few hours or visit the official SSR portal.
              </p>
            </div>
            <a
              href="https://studentservices.jntuh.ac.in/oss/syllabus.html?type=syllabus"
              target="_blank"
              className="md:ml-auto flex items-center gap-2 px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm shadow-sm"
              rel="noopener noreferrer"
            >
              Official Portal <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
