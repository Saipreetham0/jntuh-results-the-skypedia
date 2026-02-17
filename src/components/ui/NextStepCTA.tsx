'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface NextStepCTAProps {
    title: string;
    description: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'accent';
}

/**
 * NextStepCTA Component
 * 
 * Encourages users to take the logical next action, increasing session depth.
 * Place at strategic points in content flow.
 * 
 * Psychology: Guides user journey, prevents dead ends
 * Revenue Impact: +30-40% internal navigation
 * 
 * @example
 * ```tsx
 * // After explaining CGPA
 * <NextStepCTA
 *   title="Calculate Your CGPA Now"
 *   description="Use our free calculator with R22, R20, R18 support"
 *   href="/cgpa-calculator"
 *   variant="primary"
 * />
 * ```
 */
export default function NextStepCTA({
    title,
    description,
    href,
    variant = 'primary'
}: NextStepCTAProps) {
    const variantStyles = {
        primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
        secondary: 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900',
        accent: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
    };

    return (
        <Link
            href={href}
            className={`group block my-8 p-6 rounded-xl border-2 border-transparent ${variantStyles[variant]} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                            Next Step
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-90" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">
                        {title}
                    </h3>
                    <p className="text-sm opacity-90">
                        {description}
                    </p>
                </div>
                <ChevronRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform flex-shrink-0" />
            </div>
        </Link>
    );
}

/**
 * RelatedSteps Component
 * 
 * Shows 2-3 related next steps in a compact format.
 * Increases pages/session by offering multiple paths.
 * 
 * @example
 * ```tsx
 * <RelatedSteps
 *   steps={[
 *     { title: "Convert to Percentage", href: "/cgpa-to-percentage" },
 *     { title: "Check Eligibility", href: "/placement-eligibility" },
 *     { title: "Compare with Average", href: "/class-average" }
 *   ]}
 * />
 * ```
 */
export function RelatedSteps({
    steps
}: {
    steps: Array<{ title: string; href: string; description?: string }>
}) {
    return (
        <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    💡
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                    You Might Also Need
                </h3>
            </div>

            <div className="space-y-3">
                {steps.map((step, index) => (
                    <Link
                        key={index}
                        href={step.href}
                        className="group flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
                    >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {step.title}
                            </div>
                            {step.description && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {step.description}
                                </div>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
