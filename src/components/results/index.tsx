// const cardsData: CardData[] = [
//   {
//     title: "Consolidated Results",
//     content: "Access All Your Semester Results in One Place",
//     url: "consolidated-results",
//   },
//   {
//     title: "View Semester-wise Results",
//     content: "Access Results for Specific Semesters",
//     url: "semester-wise-results",
//   },
//   {
//     title: "Calculate Your CGPA",
//     content: "Calculate Your Cumulative GPA and Detailed Result Performance",
//     url: "cgpa-calculator",
//   },
//   {
//     title: "CGPA to Percentage Converter",
//     content: "Convert CGPA to percentage and calculate GPA easily.",
//     url: "cgpa-percentage-converter",
//   },
//   {
//     title: "Percentage to CGPA Calculator",
//     content: "Convert percentage to CGPA quickly and accurately.",
//     url: "percentage-to-cgpa-calculator",
//   },
//   {
//     title: "Credit Eligibility Check",
//     content: "Verify Your Eligibility for Course Credits Here",
//     url: "credit-eligibility-check",
//   },
//   {
//     title: "Compare Performance",
//     content: "Compare Your Overall Performance with Classmates",
//     url: "compare-performance",
//   },
//   {
//     title: "Check Backlogs",
//     content: "View Your Complete List of Pending Courses",
//     url: "check-backlogs",
//   },
//   {
//     title: "Syllabus",
//     content:
//       "Access the syllabus for each course or semester to plan your studies.",
//     url: "/syllabus",
//   },
//   {
//     title: "Previous Question Papers",
//     content:
//       "Download or view previous years' question papers to help with exam preparation.",
//     url: "/previous-question-papers",
//   },

//   {
//     title: "Marks Percentage Calculator",
//     content: "Calculate your percentage based on marks obtained.",
//     url: "/marks-percentage-calculator",
//   },
//   {
//     title: "SGPA to CGPA Calculator",
//     content: "Convert your SGPA to CGPA easily and accurately.",
//     url: "/sgpa-to-cgpa-calculator",
//   },
// ];

// import React from "react";
// import Card from "../Card";
// import { Search } from "lucide-react";

// interface CardData {
//   title: string;
//   content: string;
//   url: string;
//   icon?: React.ReactNode;
// }



// const ResultsBox: React.FC = () => {
//   const [searchTerm, setSearchTerm] = React.useState("");

//   const filteredCards = cardsData.filter(
//     (card) =>
//       card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       card.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
//         Student Resources
//       </h2>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search resources..."
//           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCards.map((card, index) => (
//           <Card key={index} {...card} />
//         ))}
//       </div>
//       {filteredCards.length === 0 && (
//         <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
//           No results found. Try a different search term.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ResultsBox;



import React, { useState, useEffect } from 'react';
import Card from '../card';
import { Search, BookOpen, Calculator, FileText, BarChart2, CheckCircle, Users, AlertCircle, FileQuestion, Percent, RefreshCw } from 'lucide-react';

interface CardData {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const cardsData: CardData[] = [
  {
    title: "Consolidated Results",
    content: "Access All Your Semester Results in One Place",
    url: "consolidated-results",
    icon: <FileText className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "View Semester-wise Results",
    content: "Access Results for Specific Semesters",
    url: "semester-wise-results",
    icon: <BookOpen className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Calculate Your CGPA",
    content: "Calculate Your Cumulative GPA and Detailed Result Performance",
    url: "cgpa-calculator",
    icon: <Calculator className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "CGPA to Percentage Converter",
    content: "Convert CGPA to percentage and calculate GPA easily.",
    url: "cgpa-percentage-converter",
    icon: <RefreshCw className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Percentage to CGPA Calculator",
    content: "Convert percentage to CGPA quickly and accurately.",
    url: "percentage-to-cgpa-calculator",
    icon: <Percent className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Credit Eligibility Check",
    content: "Verify Your Eligibility for Course Credits Here",
    url: "credit-eligibility-check",
    icon: <CheckCircle className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Compare Performance",
    content: "Compare Your Overall Performance with Classmates",
    url: "compare-performance",
    icon: <BarChart2 className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Check Backlogs",
    content: "View Your Complete List of Pending Courses",
    url: "check-backlogs",
    icon: <AlertCircle className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Syllabus",
    content: "Access the syllabus for each course or semester to plan your studies.",
    url: "/syllabus",
    icon: <BookOpen className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "Previous Question Papers",
    content: "Download or view previous years' question papers to help with exam preparation.",
    url: "/previous-question-papers",
    icon: <FileQuestion className="w-8 h-8 text-[#1C61E7]" />,
  },
  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
    icon: <Calculator className="w-8 h-8 text-[#21C15E]" />,
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
    icon: <RefreshCw className="w-8 h-8 text-[#1C61E7]" />,
  },
];

const ResultsBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cardsData);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Categories based on card types
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'results', name: 'Results' },
    { id: 'calculators', name: 'Calculators' },
    { id: 'academic', name: 'Academic' }
  ];

  // Filter function that handles both search and category filtering
  useEffect(() => {
    let results = cardsData;

    // First filter by category if not "all"
    if (activeCategory !== "all") {
      if (activeCategory === "results") {
        results = results.filter(card =>
          card.title.toLowerCase().includes("result") ||
          card.title.toLowerCase().includes("backlog")
        );
      } else if (activeCategory === "calculators") {
        results = results.filter(card =>
          card.title.toLowerCase().includes("calculator") ||
          card.title.toLowerCase().includes("convert") ||
          card.title.toLowerCase().includes("cgpa") ||
          card.title.toLowerCase().includes("percentage")
        );
      } else if (activeCategory === "academic") {
        results = results.filter(card =>
          card.title.toLowerCase().includes("syllabus") ||
          card.title.toLowerCase().includes("question") ||
          card.title.toLowerCase().includes("credit")
        );
      }
    }

    // Then filter by search term
    if (searchTerm) {
      results = results.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCards(results);
  }, [searchTerm, activeCategory]);

  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1C61E7]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#21C15E]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header section with enhanced styling */}
        <div className="text-center mb-14 animate-fade-in">
          <div className="inline-flex items-center px-5 py-2.5 mb-6 bg-gradient-to-r from-[#1C61E7]/10 via-[#1C61E7]/5 to-[#21C15E]/10 rounded-full text-[#1C61E7] dark:text-[#1C61E7] text-sm font-semibold shadow-lg shadow-[#1C61E7]/10 border border-[#1C61E7]/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Everything you need in one place
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-5 leading-tight">
            Student Resources
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Access powerful tools and resources to track, analyze, and improve your academic performance.
          </p>
        </div>

        {/* Enhanced search and filters */}
        <div className="mb-14 max-w-4xl mx-auto animate-slide-up">
          {/* Search bar with glassmorphism - mobile optimized */}
          <div className="relative group mb-6 md:mb-8">
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#1C61E7]/20 to-[#21C15E]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#1C61E7] transition-colors duration-300 w-6 h-6 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search calculators, results..."
                className="w-full pl-14 md:pl-14 pr-14 md:pr-6 py-4 md:py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7] dark:bg-gray-800/50 dark:text-white backdrop-blur-sm shadow-xl transition-all duration-300 text-base md:text-base placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 md:right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 -m-2"
                  aria-label="Clear search"
                >
                  <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Enhanced category filter tabs - mobile optimized */}
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 py-3 md:px-7 md:py-3.5 rounded-xl text-sm md:text-sm font-bold transition-all duration-300 transform active:scale-95 md:hover:scale-105 overflow-hidden min-h-[44px] ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#1C61E7] to-[#1C61E7]/90 text-white shadow-xl shadow-[#1C61E7]/30 scale-100"
                    : "bg-white dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 md:hover:bg-[#1C61E7]/5 dark:md:hover:bg-[#1C61E7]/10 md:hover:text-[#1C61E7] active:bg-[#1C61E7]/10 border-2 border-gray-200 dark:border-gray-700 shadow-md"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result count with enhanced styling */}
        {filteredCards.length > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-[#21C15E] mr-2 animate-pulse"></div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Showing <span className="font-bold text-[#1C61E7]">{filteredCards.length}</span> {filteredCards.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>
          </div>
        )}

        {/* Cards grid with enhanced staggered animation - mobile optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:gap-9">
          {filteredCards.map((card, index) => (
            <div
              key={index}
              className="animate-fade-in transform"
              style={{
                animationDelay: `${index * 75}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <Card {...card} />
            </div>
          ))}
        </div>

        {/* Enhanced empty state - mobile optimized */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12 md:py-16 animate-fade-in px-4">
            <div className="relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-5 md:mb-6 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 rounded-3xl animate-pulse"></div>
              <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 relative z-10" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2.5 md:mb-3">
              No results found
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              We couldn't find any resources matching{' '}
              <span className="font-semibold text-[#1C61E7]">"{searchTerm || activeCategory}"</span>.
              <br className="hidden md:block" />
              <span className="md:inline"> </span>Try a different search term or browse by category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="group relative px-6 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-[#1C61E7] to-[#1C61E7]/90 text-white rounded-xl active:shadow-xl md:hover:shadow-2xl transition-all duration-300 font-bold shadow-xl shadow-[#1C61E7]/30 active:scale-95 md:hover:scale-105 overflow-hidden min-h-[44px]"
            >
              <span className="hidden md:block absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
