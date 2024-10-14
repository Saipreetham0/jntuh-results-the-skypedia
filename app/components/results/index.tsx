// "use client";
// import React from "react";
// import Link from "next/link";
// import Card from "../resultscard";
// import HomepageBlog from "../blog";

// // Define the type for the card data
// interface CardData {
//   title: string;
//   content: string;
//   url: string;
// }

const cardsData: CardData[] = [
  {
    title: "Consolidated Results",
    content: "Access All Your Semester Results in One Place",
    url: "consolidated-results",
  },
  {
    title: "View Semester-wise Results",
    content: "Access Results for Specific Semesters",
    url: "http://saipreetham.com",
  },
  {
    title: "Calculate Your CGPA",
    content: "Calculate Your Cumulative GPA and Detailed Result Performance",
    url: "cgpa-calculator",
  },
  {
    title: "Credit Eligibility Check",
    content: "Verify Your Eligibility for Course Credits Here",
    url: "http://saipreetham.com",
  },
  {
    title: "Compare Performance",
    content: "Compare Your Overall Performance with Classmates",
    url: "http://saipreetham.com",
  },
  {
    title: "Check Backlogs",
    content: "View Your Complete List of Pending Courses",
    url: "http://saipreetham.com",
  },
  {
    title: "Syllabus",
    content: "Access the syllabus for each course or semester to plan your studies.",
    url: "/syllabus",
  },
  {
    title: "Previous Question Papers",
    content: "Download or view previous years' question papers to help with exam preparation.",
    url: "/previous-question-papers",
  },
];

// export default function ResultsBox() {
//   return (
//     <div className="flex-col flex items-center justify-center">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
//         {cardsData.map((card, index) => (
//           <div key={index}>
//             <Card {...card} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



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
      {/* <div className="mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
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