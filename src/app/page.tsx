import Hero from "@/components/hero";
import ResultsBox from "@/components/results";
import HomepageBlog from "@/components/blog";
import FAQSection from "@/components/home/FAQSection";
import NotificationTicker from "@/components/home/NotificationTicker";
import FeaturesSection from "@/components/home/FeaturesSection";
import { ResponsiveAd, InFeedAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import FAQSchema from "@/components/seo/FAQSchema";
import type { JSX } from "react";

// Homepage FAQ data for schema injection
const homepageFaqs = [
  {
    question: "When are JNTUH results usually released?",
    answer: "JNTUH typically releases results 45-60 days after the completion of exams. However, this timeline can vary based on the specific semester and academic calendar.",
  },
  {
    question: "How do I calculate my CGPA from SGPA?",
    answer: "To calculate CGPA, you need the SGPA of all semesters. The formula is: CGPA = Σ(Ci × Si) / Σ(Ci), where Ci is credits for the ith semester and Si is SGPA for the ith semester. Use our free CGPA Calculator at jntuhresults.theskypedia.com/cgpa-calculator for instant calculation.",
  },
  {
    question: "What is the pass percentage for JNTUH B.Tech?",
    answer: "For R18/R22 regulations, a student needs to secure a minimum of 35% marks in the internal exams and 35% in the external exams, with an aggregate of 40% to pass a subject.",
  },
  {
    question: "How can I check my complete backlog history?",
    answer: "You can view your complete history of backlogs, including cleared and active ones, using the Check Backlogs tool at jntuhresults.theskypedia.com/check-backlogs. Simply enter your Hall Ticket Number to get a detailed report.",
  },
  {
    question: "Is this website officially affiliated with JNTUH?",
    answer: "No, this is a student resource platform designed to simplify access to results and academic tools. For official notifications and certificate verification, please visit the official JNTUH website.",
  },
];

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900/30">
      {/* FAQ Schema for Rich Results */}
      <FAQSchema faqs={homepageFaqs} />

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
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" />
        </div>
      </section>
    </main>
  );
}
