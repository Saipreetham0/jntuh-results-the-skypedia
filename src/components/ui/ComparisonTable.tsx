'use client';

import { ResponsiveAd } from '@/components/adsense';
import { AD_SLOTS } from '@/config/adSlots';

interface ComparisonTableProps {
    title: string;
    description?: string;
    headers: string[];
    rows: Array<{
        label: string;
        values: string[];
        highlight?: boolean;
    }>;
    adSlot?: string;
    className?: string;
}

/**
 * ComparisonTable Component
 * 
 * Rich content element for regulations, colleges, courses comparison.
 * 
 * Strategy from monetization blueprint:
 * - Place ad IMMEDIATELY after table (high engagement point)
 * - Tables increase time on page (+40-60 seconds avg)
 * - Users scroll slowly through tables = more ad views
 * 
 * Revenue Impact: Tables = 2-3x longer session = +1-2 extra ad views
 * 
 * Use Cases:
 * - R22 vs R20 vs R18 comparison
 * - College rankings
 * - Course fee comparison
 * - Regulation differences
 */
export default function ComparisonTable({
    title,
    description,
    headers,
    rows,
    adSlot = AD_SLOTS.BLOG.IN_CONTENT,
    className = '',
}: ComparisonTableProps) {
    return (
        <div className={`my-8 ${className}`}>
            {/* Table Header */}
            <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <table className="w-full bg-white dark:bg-gray-800">
                    {/* Table Header */}
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`
                  border-b border-gray-200 dark:border-gray-700 last:border-b-0
                  ${row.highlight ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                `}
                            >
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                    {row.label}
                                </td>
                                {row.values.map((value, valueIndex) => (
                                    <td
                                        key={valueIndex}
                                        className="px-6 py-4 text-gray-700 dark:text-gray-300"
                                    >
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Strategic Ad Placement - IMMEDIATELY after table */}
            <div className="mt-6">
                <ResponsiveAd adSlot={adSlot} format="rectangle" />
            </div>
        </div>
    );
}

/**
 * CompactComparisonTable - Simpler variant for smaller comparisons
 */
export function CompactComparisonTable({
    items,
    title,
}: {
    items: Array<{ label: string; value: string; badge?: string }>;
    title?: string;
}) {
    return (
        <div className="my-6 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            {title && (
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    {title}
                </h4>
            )}

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg"
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                            {item.badge && (
                                <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 rounded">
                                    {item.badge}
                                </span>
                            )}
                            <span className="font-bold text-gray-900 dark:text-white">
                                {item.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
