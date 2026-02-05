"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

interface Author {
  name: string;
  href: string;
  imageUrl: string;
}

interface Category {
  name: string;
  href: string;
  color: string;
}

interface Post {
  title: string;
  href: string;
  category: Category;
  description: string;
  date: string;
  datetime: string;
  readingTime: string;
  image?: string;
}

// Sample posts data with added image field
const posts: Post[] = [
  {
    title: "Btech Colleges in Telangana - Find the Best Engineering Institutes",
    href: "/btech-colleges-tg",
    category: {
      name: "Education",
      href: "#",
      color: "bg-[#1C61E7]/10 text-[#1C61E7]",
    },
    description:
      "Discover the Btech colleges in Telangana for quality education. Find the best engineering institutes in Telangana for a bright future.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    readingTime: "6 min",
    image: "/api/placeholder/800/450"  // Placeholder image
  },
  // Add more posts here as needed
];

// We'll augment the data with a couple more posts for demo purposes
const extendedPosts = [
  ...posts,
  {
    title: "Top Engineering Specializations in Demand for 2025",
    href: "/engineering-specializations-2025",
    category: {
      name: "Career",
      href: "#",
      color: "bg-[#21C15E]/10 text-[#21C15E]",
    },
    description:
      "Explore the most sought-after engineering disciplines that offer excellent career prospects and opportunities in the evolving job market.",
    date: "Apr 5, 2024",
    datetime: "2024-04-05",
    readingTime: "8 min",
    image: "/api/placeholder/800/450"
  },
  {
    title: "Admission Process for Engineering Colleges in Telangana",
    href: "/telangana-engineering-admission-guide",
    category: {
      name: "Admissions",
      href: "#",
      color: "bg-[#1C61E7]/10 text-[#1C61E7]",
    },
    description:
      "A comprehensive guide to the admission process, important dates, eligibility criteria, and required documents for engineering colleges in Telangana.",
    date: "Apr 10, 2024",
    datetime: "2024-04-10",
    readingTime: "7 min",
    image: "/api/placeholder/800/450"
  }
];

const HomepageBlog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  // Categories extracted from posts for tabs
  const categories = ["All", ...new Set(extendedPosts.map(post => post.category.name))];

  // Filter posts based on active tab
  const filteredPosts = activeTab === "All"
    ? extendedPosts
    : extendedPosts.filter(post => post.category.name === activeTab);

  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12 lg:mb-14 animate-fade-in">
          <div className="inline-flex items-center px-5 py-2.5 md:py-2.5 mb-5 md:mb-6 bg-[#21C15E]/10 rounded-full text-[#21C15E] text-sm md:text-sm font-semibold shadow-md border border-[#21C15E]/20">
            <BookOpen className="w-5 h-5 md:w-4 md:h-4 mr-2" />
            Explore & Learn
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-5 px-4 leading-tight">
            College Resources & Guides
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">
            Discover comprehensive guides and information about colleges, admissions, and career opportunities.
          </p>
        </div>

        {/* Category tabs - clean mobile optimized */}
        <div className="flex flex-wrap justify-center mb-8 md:mb-10 lg:mb-12 gap-2.5 md:gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 md:px-7 md:py-3.5 rounded-xl text-sm md:text-sm font-bold transition-all duration-300 transform active:scale-95 md:hover:scale-105 min-h-[48px] ${activeTab === category
                  ? "bg-[#21C15E] text-white shadow-xl shadow-[#21C15E]/30"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:bg-[#21C15E]/10 md:hover:bg-[#21C15E]/5 dark:md:hover:bg-gray-700 shadow-md border-2 border-gray-200 dark:border-gray-700 md:hover:border-[#21C15E]/30"
                }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog posts grid - mobile optimized */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              href={post.href}
              key={post.title}
              className="group block h-full"
            >
              <article
                className={`h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 active:scale-[0.98] border-2 border-gray-200 dark:border-gray-700 ${hoveredPost === post.title
                    ? "shadow-2xl transform -translate-y-2 border-[#21C15E]/50"
                    : "md:hover:shadow-xl md:hover:-translate-y-1 md:hover:border-[#21C15E]/30"
                  }`}
                onMouseEnter={() => setHoveredPost(post.title)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                {/* Image section */}
                <div className="relative w-full h-48 md:h-52 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div
                    className="w-full h-full transition-transform duration-500 md:group-hover:scale-110"
                    style={{
                      backgroundImage: post.image ? `url(${post.image})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />

                  {/* Category badge - positioned over image with enhanced styling */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-xl shadow-lg backdrop-blur-sm ${post.category.color} border border-white/20`}
                    >
                      {post.category.name}
                    </span>
                  </div>

                  {/* Reading time badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-sm shadow-lg">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Content section - clean mobile optimized */}
                <div className="p-5 md:p-6 flex-grow flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold mb-2.5 md:mb-3 text-gray-900 dark:text-white md:group-hover:text-[#21C15E] transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-5 flex-grow line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Footer with metadata - clean mobile optimized */}
                  <div className="mt-auto pt-4 border-t-2 border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <time dateTime={post.datetime} className="flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.date}
                      </time>
                    </div>

                    <div className="inline-flex items-center px-4 py-2 bg-[#21C15E] text-white font-bold text-sm rounded-lg md:group-hover:shadow-lg md:group-hover:scale-105 active:scale-95 transition-all duration-300 min-h-[36px]">
                      <span className="mr-1.5">Read More</span>
                      <ArrowRight className="w-4 h-4 transform md:group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View all button */}
        {/* <div className="mt-12 text-center">
          <Link
            href="/colleges"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Browse All Colleges
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default HomepageBlog;