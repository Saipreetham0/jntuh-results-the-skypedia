import React from 'react';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import JntuhResultsClient from './JntuhResultsClient';

export const metadata: Metadata = generateMetadata({
    title: 'JNTUH Results 2025 - Check Your Semester Results Instantly',
    description: 'Instant access to JNTUH B.Tech, M.Tech, and B.Pharm semester results. Check your marks, internal score, and grades using your roll number on JNTUH Results Portal.',
    path: '/jntuh-results'
});

export default function JntuhResultsLandingPage() {
    return <JntuhResultsClient />;
}
