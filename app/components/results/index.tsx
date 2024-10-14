"use client";
import React from "react";
import Link from "next/link";
import Card from "../resultscard";
import HomepageBlog from "../blog";

// Define the type for the card data
interface CardData {
  title: string;
  content: string;
  url: string;
}

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

export default function ResultsBox() {
  return (
    <div className="flex-col flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {cardsData.map((card, index) => (
          <div key={index}>
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
