import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Trophy, XCircle } from "lucide-react";
import { BacklogsResponse } from '@/hooks/useBacklogs';

interface BacklogStatsProps {
    data: BacklogsResponse;
}

export function BacklogStats({ data }: BacklogStatsProps) {
    const hasBacklogs = data.results.totalBacklogs > 0;

    return (
        <div className="mb-8 animate-fade-in-up">
            <Card className="border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden bg-white dark:bg-gray-900 relative">
                <CardContent className="pt-6 pb-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white">
                                <GraduationCap className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{data.details.name}</h2>
                                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded border border-gray-100 dark:border-gray-700">
                                        {data.details.rollNumber}
                                    </span>
                                    <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
                                    <span>{data.details.collegeCode}</span>
                                </div>
                            </div>
                        </div>

                        <div className={`flex items-center justify-between md:justify-end gap-5 w-full md:w-auto p-4 rounded-xl border transition-all duration-300 ${hasBacklogs
                            ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20'
                            : 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20'
                            }`}>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Backlogs</span>
                                <span className={`text-3xl font-bold tracking-tight ${hasBacklogs ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                                    }`}>
                                    {data.results.totalBacklogs}
                                </span>
                            </div>

                            <div className={`p-3 rounded-full ${hasBacklogs
                                ? 'bg-white border border-red-100 text-red-600 dark:bg-transparent dark:border-red-900/30'
                                : 'bg-white border border-green-100 text-green-600 dark:bg-transparent dark:border-green-900/30'
                                }`}>
                                {hasBacklogs ? <XCircle className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
