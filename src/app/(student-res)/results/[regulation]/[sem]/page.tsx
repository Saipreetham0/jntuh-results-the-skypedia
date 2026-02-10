import React from 'react';
import { Metadata } from 'next';
import SemesterResultsClient from '@/components/results/SemesterResultsClient';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSectionDynamic from '@/components/seo/FAQSectionDynamic';

type Props = {
    params: Promise<{
        regulation: string;
        sem: string;
    }>;
};

// Map URL semantics to readable titles
const formatRegulation = (reg: string) => reg.toUpperCase();
const formatSemester = (sem: string) => `B.Tech ${sem.replace('-', '-')} Semester`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { regulation, sem } = await params;
    const regTitle = formatRegulation(regulation);
    const semTitle = formatSemester(sem);

    return {
        title: `JNTUH ${regTitle} ${sem} Results - Check Direct Link | TheSkypedia`,
        description: `Check your JNTUH ${regTitle} ${semTitle} results instantly. Direct link to view internal marks, grades, and credits for ${regTitle} regulation.`,
        keywords: [`jntuh ${regulation} ${sem} results`, `jntuh ${regulation} results`, `jntuh results ${sem}`, `jntuh ${regulation} grading system`],
        openGraph: {
            title: `JNTUH ${regTitle} ${sem} Results Declared - Check Now`,
            description: `Official link for JNTUH ${regTitle} ${semTitle} results. View your marks and grades instantly.`,
        },
    };
}

// Generate static params for common combinations to speed up initial requests (Optional but recommended)
export async function generateStaticParams() {
    const regulations = ['r22', 'r18', 'r16', 'r15', 'r13'];
    const semesters = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

    const params = [];

    for (const regulation of regulations) {
        for (const sem of semesters) {
            params.push({ regulation, sem });
        }
    }

    return params;
}

export default async function DynamicResultPage({ params }: Props) {
    const { regulation, sem } = await params;
    const regTitle = formatRegulation(regulation);
    const semTitle = formatSemester(sem);

    const faqs = [
        {
            question: `When were JNTUH ${regTitle} ${sem} Results released?`,
            answer: `The results for JNTUH ${regTitle} ${sem} exams are usually declared 45-60 days after the completion of exams. Check the latest updates above.`
        },
        {
            question: `How to check JNTUH ${regTitle} ${sem} Results?`,
            answer: `Enter your 10-digit Hall Ticket Number in the search box above to view your ${regTitle} ${sem} marks, grades, and credits instantly.`
        },
        {
            question: `What is the pass mark for JNTUH ${regTitle}?`,
            answer: `For ${regTitle}, a student must secure at least 35% marks in the external examination and 40% in total (Internal + External) to pass.`
        },
        {
            question: `How to calculate percentage from ${regTitle} SGPA/CGPA?`,
            answer: `For JNTUH ${regTitle}, the formula to convert CGPA to percentage is (CGPA - 0.5) * 10.`
        }
    ];

    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Results', path: '/jntuh-results' },
                    { name: `${regTitle} ${sem}`, path: `/results/${regulation}/${sem}` }
                ]}
            />
            <SemesterResultsClient
                title={`JNTUH ${regTitle} ${sem} Results`}
                description={`Check your Marks, Grades & Credits for ${regTitle} ${sem} Exams`}
                regulation={regulation}
                semester={sem}
            />
            <div className="bg-gray-50 dark:bg-gray-900 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <FAQSectionDynamic
                        faqs={faqs}
                        title={`Frequently Asked Questions about ${regTitle} ${sem}`}
                        description={`Common queries regarding JNTUH ${regTitle} ${sem} results, grading, and recaluation.`}
                    />
                </div>
            </div>
        </>
    );
}
