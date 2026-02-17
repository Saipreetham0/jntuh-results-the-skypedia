import { Shield, Lock, UserCheck, Globe } from 'lucide-react';
import type { JSX } from 'react';

interface TrustBadge {
    icon: JSX.Element;
    label: string;
    description: string;
}

/**
 * TrustBadges Component
 * 
 * Displays trust signals and security badges in the footer.
 * Builds credibility and confidence with users.
 * 
 * Badges include:
 * - HTTPS/SSL security
 * - Privacy-first approach
 * - Official JNTUH data
 * - Global accessibility
 */
export default function TrustBadges(): JSX.Element {
    const badges: TrustBadge[] = [
        {
            icon: <Lock className="w-5 h-5" />,
            label: 'Secure & Encrypted',
            description: 'Your data is protected with 256-bit SSL encryption',
        },
        {
            icon: <Shield className="w-5 h-5" />,
            label: 'Privacy First',
            description: 'We never sell or share your personal information',
        },
        {
            icon: <UserCheck className="w-5 h-5" />,
            label: 'Official Data',
            description: 'Results verified with JNTUH official sources',
        },
        {
            icon: <Globe className="w-5 h-5" />,
            label: 'Accessible',
            description: 'Available 24/7 from anywhere in the world',
        },
    ];

    return (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                    >
                        <div className="mb-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            {badge.icon}
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                            {badge.label}
                        </h3>
                        <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">
                            {badge.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Trust Statement */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Trusted by <span className="font-semibold text-blue-600 dark:text-blue-400">50,000+</span> JNTUH students since 2020
                </p>
            </div>
        </div>
    );
}
