import React from "react";
import { Zap, ShieldCheck, Smartphone, Globe } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Real-time updates directly from JNTUH servers.",
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
        icon: ShieldCheck,
        title: "100% Accurate",
        description: "Verified data processing with zero errors.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        icon: Smartphone,
        title: "Mobile First",
        description: "Optimized experience for all devices.",
        color: "text-green-500",
        bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
        icon: Globe,
        title: "All-in-One",
        description: "Results, syllabus, and calculators in one place.",
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 hover:transform hover:scale-105 transition-transform duration-300"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color}`}
                            >
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
