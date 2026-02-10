"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { getAllGuides } from "@/lib/content/guides";
import { MultiplexAd } from "../adsense";
import AD_SLOTS from "@/config/adSlots";

const HomepageBlog: React.FC = () => {
  const guides = getAllGuides().slice(0, 3); // Show top 3 guides on homepage

  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12 lg:mb-14">
          <div className="inline-flex items-center px-5 py-2.5 mb-5 bg-blue-50 dark:bg-blue-900/30 rounded-full text-[#1C61E7] dark:text-blue-300 text-sm font-semibold border border-blue-100 dark:border-blue-800">
            <BookOpen className="w-5 h-5 md:w-4 md:h-4 mr-2" />
            Knowledge Base
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Academic Guides & <span className="text-[#1C61E7]">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about JNTUH regulations, exam tips, and career guidance.
          </p>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group">
              <article className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1C61E7] transition-colors line-clamp-2">
                    {guide.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                    {guide.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(guide.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-sm font-semibold text-[#1C61E7] flex items-center group-hover:underline">
                      Read Guide
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-[#1C61E7] text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
          >
            View All Guides
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageBlog;