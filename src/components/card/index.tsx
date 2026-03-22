import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CardProps {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, url, icon }) => {
  const isExternal = url.startsWith('http');

  const cardContent = (
    <div className="group relative h-full flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-black/30 border border-gray-100 dark:border-gray-800 hover:border-[#1C61E7]/20 dark:hover:border-blue-800/40 hover:-translate-y-0.5">

      {/* Top accent bar — slides in on hover */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#1C61E7] to-[#2d75f5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 flex flex-col flex-grow">

        {/* Icon + external badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300 shrink-0">
            {icon ?? (
              <span className="font-display text-base font-extrabold text-[#1C61E7]">
                {title.charAt(0)}
              </span>
            )}
          </div>
          {isExternal && (
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#1C61E7] transition-colors mt-1" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-[15px] font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#1C61E7] dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow leading-relaxed line-clamp-2">
          {content}
        </p>

        {/* Footer CTA */}
        <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center gap-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 group-hover:text-[#1C61E7] dark:group-hover:text-blue-400 transition-colors duration-200">
          <span>{isExternal ? 'Visit' : 'Open'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
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
