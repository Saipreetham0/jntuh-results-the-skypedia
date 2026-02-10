import React from 'react';
import { Metadata } from 'next';
import SemesterResultsClient from '@/components/results/SemesterResultsClient';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';

type Props = {
    params: Promise<{
        rollNumber: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { rollNumber } = await params;
    return {
        title: `JNTUH Results for ${rollNumber.toUpperCase()} - Latest Marks & Grades`,
        description: `Check latest JNTUH semester results for Roll Number ${rollNumber.toUpperCase()}. View internal marks, external marks, and total credits instantly.`,
        robots: {
            index: false, // Don't index individual student result pages
            follow: true,
        }
    };
}

export default async function LatestResultPage({ params }: Props) {
    const { rollNumber } = await params;

    const faqs = [
        {
            question: "How to read the result status?",
            answer: "Grades like 'O', 'A+', 'A' indicate passing. 'F' indicates failure. 'Ab' means Absent."
        },
        {
            question: "What if my result is not found?",
            answer: "Ensure your Hall Ticket Number is correct. If the result was released today, it might take a few hours to reflect here."
        }
    ];

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Results', path: '/jntuh-results' },
                    { name: rollNumber.toUpperCase(), path: `/latest-results/${rollNumber}` }
                ]}
            />
            <SemesterResultsClient
                defaultRollNumber={rollNumber}
                title={`Results for ${rollNumber.toUpperCase()}`}
                description="Your latest academic performance report"
            />
            <div className="bg-gray-50 dark:bg-gray-900 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FAQSectionDynamic
                        faqs={faqs}
                        title="Result FAQs"
                    />
                </div>
            </div>
        </>
    );
}
