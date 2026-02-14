import Hero from "@/components/hero";
import ResultsBox from "@/components/results";
import HomepageBlog from "@/components/blog";
import FAQSection from "@/components/home/FAQSection";
import NotificationTicker from "@/components/home/NotificationTicker";
import FeaturesSection from "@/components/home/FeaturesSection";
import { ResponsiveAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Notification Ticker */}
      <NotificationTicker />

      {/* 3. Features Section - Value Proposition */}
      <FeaturesSection />

      {/* 4. Top Ad Banner */}
      <section className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden min-h-[90px] flex items-center justify-center">
          <p className="sr-only">Advertisement</p>
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.TOP_BANNER} format="horizontal" />
        </div>
      </section>

      {/* 5. Main Results Area */}
      <ResultsBox />

      {/* 6. Middle Ad Section */}
      <section className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-medium">Sponsored</p>
          <div className="min-h-[90px] flex items-center justify-center">
            <ResponsiveAd adSlot={AD_SLOTS.SPECIALIZED.HOMEPAGE_MIDDLE} format="horizontal" />
          </div>
        </div>
      </section>

      {/* 7. Blog / Guides */}
      <HomepageBlog />

      {/* 8. Newsletter Subscription */}
      <section className="py-10 md:py-16 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <SubscriptionForm compact={true} />
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Bottom Ad Banner */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="text-center mb-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Supported By</p>
        </div>
        <div className="bg-transparent min-h-[250px] flex items-center justify-center">
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" />
        </div>
      </section>
    </main>
  );
}
