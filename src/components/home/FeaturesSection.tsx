import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Smartphone, Globe, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Results",
    description: "Real-time data pulled directly from JNTUH servers with sub-2s response times.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    accent: "border-amber-200 dark:border-amber-800/40",
    href: "/consolidated-results",
    number: "01",
  },
  {
    icon: ShieldCheck,
    title: "Accurate CGPA Calculator",
    description: "Regulation-aware CGPA engine verified against R22, R20, and R18 grading tables.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    accent: "border-blue-200 dark:border-blue-800/40",
    href: "/cgpa-calculator",
    number: "02",
  },
  {
    icon: Smartphone,
    title: "Backlogs Anywhere",
    description: "Full mobile-optimised backlog checker — works on any device, any network.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    accent: "border-emerald-200 dark:border-emerald-800/40",
    href: "/check-backlogs",
    number: "03",
  },
  {
    icon: Globe,
    title: "All Calculators, One Place",
    description: "CGPA, SGPA, percentage & marks converters — every academic tool you need.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    accent: "border-purple-200 dark:border-purple-800/40",
    href: "/sgpa-to-cgpa-calculator",
    number: "04",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1C61E7] dark:text-blue-400 mb-3">
              Why students choose us
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Built for JNTUH.<br className="hidden sm:block" /> Built for you.
            </h2>
          </div>
          <p className="max-w-sm text-base text-gray-500 dark:text-gray-400 leading-relaxed md:text-right">
            Every tool is purpose-built for JNTUH regulations — no generic calculators, no guesswork.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feature) => (
            <Link
              key={feature.number}
              href={feature.href}
              className={`group relative flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-900 border ${feature.accent} md:hover:-translate-y-1 md:hover:shadow-lg transition-all duration-300`}
            >
              {/* Number watermark */}
              <span className="absolute top-5 right-5 text-4xl font-black text-gray-100 dark:text-gray-800 select-none font-display leading-none">
                {feature.number}
              </span>

              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} ${feature.color} mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="font-display text-[17px] font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-[#1C61E7] dark:group-hover:text-blue-400 transition-colors leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                {feature.description}
              </p>

              <div className="mt-5 flex items-center text-sm font-semibold text-[#1C61E7] dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
