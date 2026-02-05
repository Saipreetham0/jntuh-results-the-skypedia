import React from 'react';
import Link from 'next/link';
import { ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

interface CardProps {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, url, icon }) => {
  const isExternal = url.startsWith('http');

  const cardContent = (
    <div className="group relative h-full flex flex-col bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 active:scale-95 md:hover:shadow-2xl md:hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
      {/* Animated gradient background on hover/active */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C61E7]/0 via-[#1C61E7]/0 to-[#21C15E]/0 group-hover:from-[#1C61E7]/5 group-hover:via-[#1C61E7]/3 group-hover:to-[#21C15E]/5 group-active:from-[#1C61E7]/10 group-active:via-[#1C61E7]/5 group-active:to-[#21C15E]/10 transition-all duration-300 pointer-events-none"></div>

      {/* Shimmer effect on hover (desktop only) */}
      <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      {/* Top accent bar with gradient - thicker on mobile */}
      <div className="h-2 md:h-1.5 bg-gradient-to-r from-[#1C61E7] via-[#1C61E7] to-[#21C15E] md:group-hover:h-2 transition-all duration-300"></div>

      <div className="relative p-5 md:p-6 flex flex-col flex-grow">
        {/* Icon container with enhanced styling - larger on mobile */}
        <div className="mb-4 md:mb-5">
          {icon ? (
            <div className="relative w-16 h-16 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 dark:from-[#1C61E7]/20 dark:to-[#21C15E]/20 flex items-center justify-center text-[#1C61E7] group-active:scale-95 md:group-hover:scale-110 md:group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#1C61E7]/10">
              <div className="scale-110 md:scale-100">
                {icon}
              </div>
              {/* Sparkle effect on popular cards - always visible on mobile */}
              {(title.includes('CGPA') || title.includes('Calculator')) && (
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#21C15E] opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
          ) : (
            <div className="relative w-16 h-16 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#1C61E7]/10 to-[#21C15E]/10 flex items-center justify-center text-[#1C61E7] font-bold text-2xl group-active:scale-95 md:group-hover:scale-110 md:group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#1C61E7]/10">
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Title with enhanced sizing for mobile */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2.5 md:mb-3 group-active:text-[#1C61E7] md:group-hover:text-[#1C61E7] dark:group-hover:text-[#1C61E7] transition-colors duration-300 line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Description with better mobile readability */}
        <p className="text-sm md:text-sm leading-relaxed text-gray-600 dark:text-gray-400 mb-4 md:mb-5 flex-grow line-clamp-2 md:line-clamp-3">
          {content}
        </p>

        {/* Enhanced CTA button - larger touch target on mobile */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-[#1C61E7] dark:text-[#1C61E7] font-semibold text-base md:text-sm gap-1 md:group-hover:gap-2 transition-all duration-300 py-2 -ml-2 pl-2">
            <span className="relative">
              Access Now
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1C61E7] md:group-hover:w-full transition-all duration-300"></span>
            </span>
            <ChevronRight className="w-5 h-5 transition-transform duration-300 md:group-hover:translate-x-1" />
          </div>
          {isExternal && (
            <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
      </div>

      {/* Corner decoration - smaller on mobile */}
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#1C61E7]/5 to-transparent rounded-full blur-3xl -translate-y-12 translate-x-12 md:-translate-y-16 md:translate-x-16 md:group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="h-full block">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={url} className="h-full block">
      {cardContent}
    </Link>
  );
};

export default Card;
