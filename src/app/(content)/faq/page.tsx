
import React from 'react';
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Types
interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

// Define the FAQ data
const faqs: FAQItem[] = [
  {
    id: "consolidated-results",
    question: "What is Consolidated Results?",
    answer: (
      <div className="space-y-2">
        <p>
          Consolidated results refer to the overall performance of a student in
          all the semesters of a particular course or program. This means that
          the consolidated results take into account all the individual semester
          results of a student and provide an overall picture of their academic
          performance.
        </p>
        <Link href="/consolidated-results" className="text-primary hover:underline">
          Check your consolidated results →
        </Link>
      </div>
    ),
  },
  {
    id: "sem-results",
    question: "What is Sem Results?",
    answer: (
      <div className="space-y-2">
        <p>
          Semester results contain subject-wise marks, grades, and credits. It also
          displays the student's personal details and SGPA for the particular semester.
        </p>
        <Link href="/semester-wise-results" className="text-primary hover:underline">
          View semester results →
        </Link>
      </div>
    ),
  },
  {
    id: "multiple-results",
    question: "What is Get Multiple Results?",
    answer: (
      <div className="space-y-2">
        <p>
          Get Multiple Results provides subject-wise marks, grades, and credits. It also
          displays students' personal details and SGPA for each student of a particular
          selected semester.
        </p>
        <Link href="/compare-performance" className="text-primary hover:underline">
          View multiple results →
        </Link>
      </div>
    ),
  },
  {
    id: "benefits",
    question: "What are the benefits of using JNTUH Results Website?",
    answer: "The JNTUH Results Website is built based upon students' needs; it offers a lot of features. Get all your results in one place. Just use your hall ticket to access all your results."
  },
  {
    id: "overall-backlogs",
    question: "Can I see my Overall backlogs?",
    answer: (
      <div className="space-y-2">
        <p>
          Yes, you can find your overall backlogs of B.Tech here on this website.
          Go to the Main Home section.
        </p>
        <Link href="/cgpa-calculator" className="text-primary hover:underline">
          Check your backlogs →
        </Link>
      </div>
    ),
  },
  {
    id: "overall-cgpa",
    question: "Can I see my Overall CGPA?",
    answer: (
      <div className="space-y-2">
        <p>
          Yes, you can see your overall CGPA of B.Tech here on this website.
        </p>
        <Link href="/cgpa-calculator" className="text-primary hover:underline">
          Calculate your CGPA →
        </Link>
      </div>
    ),
  },
  {
    id: "semester-grades",
    question: "How to Fetch the List of Grades for a Semester's Students?",
    answer: (
      <div className="space-y-2">
        <p>
          You can see the list of grades for a semester's students on this website.
          Go to the Section Home and 'Click Get Your CGPA'.
        </p>
        <Link href="/compare-performance" className="text-primary hover:underline">
          View grades →
        </Link>
      </div>
    ),
  },
  {
    id: "check-result",
    question: "How can I check my JNTUH result?",
    answer: (
      <div className="space-y-2">
        <p>
          Enter your hall ticket number to view your results. The system will display
          your academic performance across all semesters.
        </p>
      </div>
    ),
  },
  {
    id: "all-semester-results",
    question: "How can I check my B Tech all semester results?",
    answer: (
      <div className="space-y-2">
        <p>
          You can view all your semester results in one place using your hall ticket number.
        </p>
        <Link href="/consolidated-results" className="text-primary hover:underline">
          View all semester results →
        </Link>
      </div>
    ),
  },
  {
    id: "result-types",
    question: "What are the different types of results that I can view?",
    answer: (
      <div className="space-y-2">
        <p>
          You can view your academic results, class results, and notifications.
        </p>
        <Link href="/" className="text-primary hover:underline">
          View all result types →
        </Link>
      </div>
    ),
  },
  {
    id: "view-notifications",
    question: "How do I view notifications?",
    answer: "To view notifications, click on the Notifications tab. You will see a list of all the latest notifications from JNTUH."
  },
  {
    id: "report-bug",
    question: "How do I report a crash or bug?",
    answer: "If you find any crashes or bugs, you can report them by clicking on the Help Desk tab. You will see a form where you can enter your details and describe the problem."
  },
  {
    id: "support-website",
    question: "How do I support the JNTUH Results website?",
    answer: "If you found the JNTUH Results website helpful, you can support it by buying the developer a pizza. You can do this by clicking on the Support tab."
  },
  {
    id: "developers",
    question: "Who are the developers of the JNTUH Results website?",
    answer: "The developers of the JNTUH Results website By Theskypedia Team."
  },
  {
    id: "future-plans",
    question: "What are the future plans for the JNTUH Results website?",
    answer: "The developers plan to add more features in the future, such as the ability to view results of previous years and the ability to compare results with other students."
  },
  {
    id: "consolidated-vs-single",
    question: "What is the difference between consolidated results and single results?",
    answer: "Consolidated results show the results of all your semesters. Single results show the results of a single semester."
  },
  {
    id: "pass-fail-vs-detailed",
    question: "What is the difference between pass or fail list and detailed results?",
    answer: "The pass or fail list shows whether you passed or failed a particular semester. Detailed results show your marks in each subject."
  },
  {
    id: "credits-vs-backlogs",
    question: "What is the difference between credits eligible criteria and backlogs?",
    answer: "Credits eligible criteria shows the number of credits you need to pass a particular semester. Backlogs are the number of semesters you have failed."
  },
  {
    id: "credits-vs-overall-backlogs",
    question: "What is the difference between credits eligible criteria and overall backlogs list?",
    answer: "Credits eligible criteria show the number of credits you need to pass in order to be eligible to graduate, while the overall backlogs list shows the number of backlogs you have in total."
  }
];

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Frequently Asked Questions
          </CardTitle>
          {/* <Separator className="w-24 mx-auto mt-4" /> */}
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="https://theskypedia.com/telegram">
                Ask Questions
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default FAQPage;