import Hero from "../components/hero";
import ResultsBox from "../components/results";
import HomepageBlog from "../components/blog";
import FAQSection from "@/components/home/FAQSection";
import NotificationTicker from "@/components/home/NotificationTicker";
import { ResponsiveAd, InContentAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* Live Updates Ticker */}
      <NotificationTicker />

      {/* Top Ad Banner - Closer to Hero for better visibility */}
      <div className="container mx-auto px-4 -mt-4 mb-4">
        <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER} format="horizontal" />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Results/Resources Section */}
      <ResultsBox />

      {/* Middle Leaderboard - High Visibility */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Sponsored</p>
          <ResponsiveAd adSlot={AD_SLOTS.SPECIALIZED.HOMEPAGE_MIDDLE} format="horizontal" />
        </div>
      </div>

      {/* Result Alerts Subscription */}
      <div className="container mx-auto px-4 py-8">
        <SubscriptionForm compact />
      </div>

      {/* Mid Ad Rectangle */}
      <div className="container mx-auto px-4 -mt-4">
        <div className="text-center mb-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Recommended for you</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 px-4 py-2 shadow-sm">
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} format="auto" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 mt-12"></div>

      {/* Blog Section */}
      <HomepageBlog />

      {/* FAQ Section */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
      <FAQSection />

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Bottom Ad Banner */}
      <div className="container mx-auto px-4 py-12">
        <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" />
      </div>
    </main>
  );
}
