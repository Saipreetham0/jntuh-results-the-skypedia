const cardsData: CardData[] = [
  {
    title: "Consolidated Results",
    content: "Access All Your Semester Results in One Place",
    url: "consolidated-results",
  },
  {
    title: "View Semester-wise Results",
    content: "Access Results for Specific Semesters",
    url: "semester-wise-results",
  },
  {
    title: "Calculate Your CGPA",
    content: "Calculate Your Cumulative GPA and Detailed Result Performance",
    url: "cgpa-calculator",
  },
  {
    title: "CGPA to Percentage Converter",
    content: "Convert CGPA to percentage and calculate GPA easily.",
    url: "cgpa-percentage-converter",
  },
  {
    title: "Percentage to CGPA Calculator",
    content: "Convert percentage to CGPA quickly and accurately.",
    url: "percentage-to-cgpa-calculator",
  },
  {
    title: "Credit Eligibility Check",
    content: "Verify Your Eligibility for Course Credits Here",
    url: "credit-eligibility-check",
  },
  {
    title: "Compare Performance",
    content: "Compare Your Overall Performance with Classmates",
    url: "compare-performance",
  },
  {
    title: "Check Backlogs",
    content: "View Your Complete List of Pending Courses",
    url: "check-backlogs",
  },
  {
    title: "Syllabus",
    content:
      "Access the syllabus for each course or semester to plan your studies.",
    url: "/syllabus",
  },
  {
    title: "Previous Question Papers",
    content:
      "Download or view previous years' question papers to help with exam preparation.",
    url: "/previous-question-papers",
  },

  {
    title: "Marks Percentage Calculator",
    content: "Calculate your percentage based on marks obtained.",
    url: "/marks-percentage-calculator",
  },
  {
    title: "SGPA to CGPA Calculator",
    content: "Convert your SGPA to CGPA easily and accurately.",
    url: "/sgpa-to-cgpa-calculator",
  },
];

import React from "react";
import Card from "../Card";
import { Search } from "lucide-react";

interface CardData {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

// const cardsData: CardData[] = [
//   {
//     title: "Consolidated Results",
//     content: "Access All Your Semester Results in One Place",
//     url: "consolidated-results",
//     icon: <Search className="w-6 h-6" />,
//   },
//   // ... (other card data remains the same)
// ];

const ResultsBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCards = cardsData.filter(
    (card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Student Resources
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      {filteredCards.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No results found. Try a different search term.
        </p>
      )}
    </div>
  );
};

export default ResultsBox;
