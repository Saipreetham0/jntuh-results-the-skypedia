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
import Card from '../Card';
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
    icon: <FileText className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "View Semester-wise Results",
    content: "Access Results for Specific Semesters",
    url: "semester-wise-results",
    icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
  },
  {
    title: "Calculate Your CGPA",
    content: "Calculate Your Cumulative GPA and Detailed Result Performance",
    url: "cgpa-calculator",
    icon: <Calculator className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "CGPA to Percentage Converter",
    content: "Convert CGPA to percentage and calculate GPA easily.",
    url: "cgpa-percentage-converter",
    icon: <RefreshCw className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Percentage to CGPA Calculator",
    content: "Convert percentage to CGPA quickly and accurately.",
    url: "percentage-to-cgpa-calculator",
    icon: <Percent className="w-8 h-8 text-cyan-500" />,
  },
  {
    title: "Credit Eligibility Check",
    content: "Verify Your Eligibility for Course Credits Here",
    url: "credit-eligibility-check",
    icon: <CheckCircle className="w-8 h-8 text-teal-500" />,
  },
  {
    title: "Compare Performance",
    content: "Compare Your Overall Performance with Classmates",
    url: "compare-performance",
    icon: <BarChart2 className="w-8 h-8 text-amber-500" />,
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
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Previous Question Papers",
    content: "Download or view previous years' question papers to help with exam preparation.",
    url: "/previous-question-papers",
    icon: <FileQuestion className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
    icon: <Calculator className="w-8 h-8 text-green-500" />,
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
    icon: <RefreshCw className="w-8 h-8 text-indigo-500" />,
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
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Header section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Student Resources
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Access tools and resources to help you track and improve your academic performance.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category filter tabs */}
          <div className="flex flex-wrap justify-center mt-6 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        {/* Empty state */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <Search className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any resources matching your search.
              Try a different search term or browse by category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsBox;
