import { Hero, FAQSection, NotificationTicker, FeaturesSection } from "@/components/home";
import ResultsBox from "@/components/results";
import HomepageBlog from "@/components/blog";
import { ResponsiveAd, InFeedAd } from "@/components/adsense";
import { SubscriptionForm } from "@/components/features/result-alerts";
import AD_SLOTS from "@/config/adSlots";
import FAQSchema from "@/components/seo/FAQSchema";
import type { JSX } from "react";

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
    question: "How can I convert my CGPA to percentage?",
    answer: "For JNTUH, the formula to convert CGPA to percentage is: Percentage = (CGPA - 0.5) * 10. For instance, an 8.0 CGPA equals 75.0%. Try our free CGPA to Percentage Converter at jntuhresults.theskypedia.com/cgpa-percentage-converter for instant, accurate conversion.",
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

      {/* Pre-FAQ ad */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="min-h-[280px] flex items-center justify-center overflow-hidden">
          <InFeedAd adSlot={AD_SLOTS.SPECIALIZED.HOMEPAGE_MIDDLE} />
        </div>
      </div>

      {/* FAQ */}
      <FAQSection />

      {/* Bottom ad */}
      <div className="container mx-auto px-4 py-10 md:py-14 max-w-5xl">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3">
          Supported by
        </p>
        <div className="ad-container-rect min-h-[90px] md:min-h-[100px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <ResponsiveAd adSlot={AD_SLOTS.HOMEPAGE.BOTTOM_BANNER} format="auto" />
        </div>
      </div>
    </div>
  );
}
