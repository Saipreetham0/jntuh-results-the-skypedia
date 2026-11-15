import { Hero, FAQSection, NotificationTicker, FeaturesSection } from "@/components/home";
import ResultsBox from "@/components/results";
import HomepageBlog from "@/components/blog";
import { ResponsiveAd, InFeedAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import FAQSchema from "@/components/seo/FAQSchema";
import type { JSX } from "react";
import { homepageFaqs } from "@/components/home/faqs";

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <FAQSchema faqs={homepageFaqs} />

      {/* Hero */}
      <Hero />

      {/* Live updates ticker */}
      <NotificationTicker />

      {/* Why us / Features */}
      <FeaturesSection />

      {/* Tools directory */}
      <ResultsBox />

      {/* Mid-page ad */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="min-h-[280px] flex items-center justify-center overflow-hidden">
          <InFeedAd adSlot={AD_SLOTS.HOMEPAGE.MID_RECTANGLE} />
        </div>
      </div>

      {/* Blog / Guides */}
      <HomepageBlog />

      {/* Newsletter */}
      <SubscriptionForm compact={true} />

      {/* FAQ */}
      <FAQSection />

      {/* Bottom ad */}
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          Supported by
        </p>
        <div className="ad-container-rect min-h-[90px] md:min-h-[100px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" />
        </div>
      </div>
    </div>
  );
}
