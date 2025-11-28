"use client";

import Hero from "../components/hero";
import ResultsBox from "../components/results";
import HomepageBlog from "../components/blog";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* Top Ad Banner */}
      <div className="container mx-auto px-4">
        <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER} format="horizontal" className="my-8" />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Results/Resources Section */}
      <ResultsBox />

      {/* Result Alerts Subscription */}
      <div className="container mx-auto px-4 py-12">
        <SubscriptionForm compact />
      </div>

      {/* Mid Ad Rectangle */}
      <div className="container mx-auto px-4">
        <InContentAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} className="my-8" />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Blog Section */}
      <HomepageBlog />

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4">
        <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" className="my-8" />
      </div>
    </main>
  );
}
