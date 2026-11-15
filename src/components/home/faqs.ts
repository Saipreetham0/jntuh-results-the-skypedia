// Single source for homepage FAQ — rendered by FAQSection and emitted as FAQPage schema.
export interface HomeFAQ {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

export const homepageFaqs: HomeFAQ[] = [
  {
    question: "When are JNTUH results usually released?",
    answer:
      "JNTUH typically releases results 45–60 days after the completion of exams. This timeline varies by semester and academic calendar.",
    link: { href: "/consolidated-results", label: "Check Consolidated Results" },
  },
  {
    question: "How do I calculate my CGPA from SGPA?",
    answer:
      "CGPA = Σ(Cᵢ × Sᵢ) / ΣCᵢ, where Cᵢ is the credits and Sᵢ is the SGPA of each semester.",
    link: { href: "/cgpa-calculator", label: "Use the CGPA Calculator" },
  },
  {
    question: "What is the pass percentage for JNTUH B.Tech?",
    answer:
      "For R18 and R22 regulations, students must secure at least 35% in internal exams and 35% in external exams, with a combined aggregate of 40% to pass a subject.",
  },
  {
    question: "How can I convert my CGPA to percentage?",
    answer:
      "For JNTUH, Percentage = (CGPA − 0.5) × 10. For example, an 8.0 CGPA equals 75%.",
    link: { href: "/cgpa-percentage-converter", label: "Open the CGPA to Percentage Converter" },
  },
  {
    question: "How can I check my complete backlog history?",
    answer:
      "Enter your Hall Ticket Number in the Check Backlogs tool to get a full report of active and cleared backlogs across all semesters.",
    link: { href: "/check-backlogs", label: "Check Backlogs" },
  },
  {
    question: "Is this website officially affiliated with JNTUH?",
    answer:
      "No. This is an independent student resource platform. For official notifications, certificates, and verification, visit the official JNTUH website.",
  },
];
