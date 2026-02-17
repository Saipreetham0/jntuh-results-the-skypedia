import Hero from "@/components/hero";
import ResultsBox from "@/components/results";
import HomepageBlog from "@/components/blog";
import FAQSection from "@/components/home/FAQSection";
import NotificationTicker from "@/components/home/NotificationTicker";
import FeaturesSection from "@/components/home/FeaturesSection";
import { ResponsiveAd, InFeedAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* 1. Hero Section - Optimized height for mobile */}
      <Hero />

      {/* 2. Notification Ticker */}
      <NotificationTicker />

      {/* 3. Features Section - Value Proposition */}
      <section className="py-8 md:py-12">
        <FeaturesSection />
      </section>

      {/* 4. Main Results Area */}
      <section className="py-6 md:py-10">
        <ResultsBox />
      </section>

      {/* 5. In-Feed Ad - After Results (strategic placement) */}
      <section className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        <InFeedAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} />
      </section>

      {/* 6. Blog / Guides Section */}
      <section className="py-8 md:py-12">
        <HomepageBlog />
      </section>

      {/* 7. Newsletter Subscription - Engagement Element */}
      <section className="py-10 md:py-16 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <SubscriptionForm compact={true} />
        </div>
      </section>

      {/* 8. In-Feed Ad - Before FAQ (second strategic placement) */}
      <section className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        <InFeedAd adSlot={AD_SLOTS.SPECIALIZED.HOMEPAGE_MIDDLE} />
      </section>

      {/* 9. FAQ Section - Trust Building */}
      <section className="py-8 md:py-12">
        <FAQSection />
      </section>

      {/* 10. Bottom Ad - End of Page */}
      <section className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="text-center mb-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Supported By</p>
        </div>
        <div className="ad-container-rect bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" lazyLoad={true} />
        </div>
      </section>
    </main>
  );
}
