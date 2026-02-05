import React from 'react';
import { Metadata } from 'next';
import SemesterResultsClient from '@/components/results/SemesterResultsClient';

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

    return (
        <SemesterResultsClient
            title={`JNTUH ${regTitle} ${sem} Results`}
            description={`Check your Marks, Grades & Credits for ${regTitle} ${sem} Exams`}
            regulation={regulation}
            semester={sem}
        />
    );
}
