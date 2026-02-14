import React from 'react';
import Link from 'next/link';
import { Calculator, FileText, Calendar, GraduationCap, Percent, BookOpen } from 'lucide-react';

const tools = [
    {
        title: "CGPA Calculator",
        desc: "Convert SGPA to CGPA instantly",
        href: "/sgpa-to-cgpa-calculator",
        icon: GraduationCap,
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-600 dark:text-blue-400"
    },
    {
        title: "Marks to %",
        desc: "Calculate exact percentage from marks",
        href: "/marks-percentage-calculator",
        icon: Percent,
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-600 dark:text-purple-400"
    },
    {
        title: "B.Tech Syllabus",
        desc: "R22, R18 complete syllabus books",
        href: "/syllabus",
        icon: BookOpen,
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-600 dark:text-green-400"
    },
    {
        title: "Previous Papers",
        desc: "Download last 5 years QPs",
        href: "/previous-question-papers",
        icon: FileText,
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-600 dark:text-orange-400"
    },
    {
        title: "Academic Calendar",
        desc: "Check exam dates & holidays",
        href: "/calendar",
        icon: Calendar,
        bg: "bg-pink-50 dark:bg-pink-900/20",
        text: "text-pink-600 dark:text-pink-400"
    },
    {
        title: "Credit Calculator",
        desc: "Check promotion eligibility",
        href: "/credit-eligibility-check",
        icon: Calculator,
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        text: "text-indigo-600 dark:text-indigo-400"
    }
];

export function RelatedTools() {
    return (
        <div className="py-8 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                More Useful Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                    <Link
                        key={idx}
                        href={tool.href}
                        className="group p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all bg-white dark:bg-gray-800/50"
                    >
                        <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <tool.icon className={`w-5 h-5 ${tool.text}`} />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{tool.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{tool.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
