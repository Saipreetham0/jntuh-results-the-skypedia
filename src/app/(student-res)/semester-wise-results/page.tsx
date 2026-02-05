import React from 'react';
import { Metadata } from 'next';
import SemesterResultsClient from '@/components/results/SemesterResultsClient';

export const metadata: Metadata = {
  title: 'Semester Wise Results - JNTUH | Check Results by Roll Number',
  description: 'View detailed semester-wise results for JNTUH B.Tech and M.Tech students. Check internal marks, external marks, grades, and credits for all semesters.',
};

export default function SemesterResultsPage() {
  return (
    <SemesterResultsClient
      title="Semester Results"
      description="View your complete semester-wise academic performance"
    />
  );
}