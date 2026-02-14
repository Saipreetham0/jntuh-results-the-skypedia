import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SemesterData } from '@/hooks/useBacklogs';

interface BacklogResultsProps {
    semesters: SemesterData[];
}

export function BacklogResults({ semesters }: BacklogResultsProps) {
    if (!semesters || semesters.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Backlogs Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Great job! You have cleared all your subjects.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-slide-up">
            {semesters.map((semester) => (
                <Card key={semester.semester} className="overflow-hidden print-break-inside-avoid border border-gray-100 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-900 transition-all duration-300">
                    <CardHeader className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 pb-4">
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                <span className="text-gray-900 dark:text-white px-0 py-0 text-base">
                                    Semester {semester.semester}
                                </span>
                                <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    SGPA <span className="font-semibold text-gray-900 dark:text-white ml-1">{semester.semesterSGPA}</span>
                                </span>
                            </CardTitle>
                            <Badge variant="outline" className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide border ${semester.backlogs > 0 ? "border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10 dark:border-red-900/20" : "border-green-200 text-green-600 bg-green-50 dark:bg-green-900/10 dark:border-green-900/20"}`}>
                                {semester.backlogs} {semester.backlogs === 1 ? "Backlog" : "Backlogs"}
                            </Badge>
                        </div>
                        <CardDescription className="flex gap-4 text-xs text-gray-500 mt-2 font-mono">
                            <span>Credits: {semester.semesterCredits}</span>
                            <span>•</span>
                            <span>Points: {semester.semesterGrades}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-100 dark:border-gray-800 hover:bg-transparent">
                                        <TableHead className="w-32 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Subject Code</TableHead>
                                        <TableHead className="font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Subject Name</TableHead>
                                        <TableHead className="text-center font-semibold w-24 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Internal</TableHead>
                                        <TableHead className="text-center font-semibold w-24 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">External</TableHead>
                                        <TableHead className="text-center font-semibold w-24 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Total</TableHead>
                                        <TableHead className="text-center font-semibold w-20 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Grade</TableHead>
                                        <TableHead className="text-center font-semibold w-20 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Credits</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {semester.subjects.map((subject) => (
                                        <TableRow key={subject.subjectCode} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                                            <TableCell className="font-mono text-xs text-gray-500 font-medium">
                                                {subject.subjectCode}
                                            </TableCell>
                                            <TableCell className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                                {subject.subjectName}
                                            </TableCell>
                                            <TableCell className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                                {subject.internalMarks}
                                            </TableCell>
                                            <TableCell className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                                {subject.externalMarks}
                                            </TableCell>
                                            <TableCell className={`text-center font-bold text-sm ${subject.grades === 'F' || subject.grades === 'Ab' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                                {subject.totalMarks}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className={`w-8 justify-center border-0 ${subject.grades === 'F' || subject.grades === 'Ab' ? "bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
                                                    {subject.grades}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                                {subject.credits}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4 p-4">
                            {semester.subjects.map((subject) => (
                                <div key={subject.subjectCode} className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{subject.subjectName}</h4>
                                            <p className="text-xs text-gray-500 font-mono mt-1">{subject.subjectCode}</p>
                                        </div>
                                        <Badge variant="outline" className={`shrink-0 border-0 ${subject.grades === 'F' || subject.grades === 'Ab' ? "bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
                                            {subject.grades}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <p className="text-gray-400 mb-1 text-[10px] uppercase">Internal</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{subject.internalMarks}</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                            <p className="text-gray-400 mb-1 text-[10px] uppercase">External</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{subject.externalMarks}</p>
                                        </div>
                                        <div className={`text-center p-2 rounded border ${subject.grades === 'F' || subject.grades === 'Ab' ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20' : 'bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-700'}`}>
                                            <p className={`mb-1 text-[10px] uppercase ${subject.grades === 'F' || subject.grades === 'Ab' ? 'text-red-600/70 dark:text-red-400/70' : 'text-gray-400'}`}>Total</p>
                                            <p className={`font-bold ${subject.grades === 'F' || subject.grades === 'Ab' ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{subject.totalMarks}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
