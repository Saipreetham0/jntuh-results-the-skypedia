"use client";

import Hero from "../components/Hero";
import ResultsBox from "../components/results";
import HomepageBlog from "../components/blog";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      {/* Results/Resources Section */}
      <ResultsBox />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      {/* Blog Section */}
      <HomepageBlog />

      {/* Bottom Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
    </main>
  );
}
