"use client";

import Hero from "../components/Hero";
import ResultsBox from "../components/results";
import HomepageBlog from "../components/blog";
import { ResponsiveAd, InContentAd } from "@/components/Adsense";
import AD_SLOTS from "@/config/adSlots";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Top Ad Banner */}
      <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER} format="horizontal" className="my-6" />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      {/* Results/Resources Section */}
      <ResultsBox />

      {/* Mid Ad Rectangle */}
      <InContentAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} className="my-8" />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      {/* Blog Section */}
      <HomepageBlog />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

      {/* Bottom Ad Banner */}
      <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" className="my-6" />
    </main>
  );
}
