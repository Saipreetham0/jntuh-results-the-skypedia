import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ToolCardProps {
  title: string;
  content: string;
  url: string;
  icon?: React.ReactNode;
}

export const ToolCard: React.FC<ToolCardProps> = ({ title, content, url, icon }) => {
  const isExternal = url.startsWith('http');

  const cardContent = (
    <div className="group relative h-full flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/60 dark:hover:shadow-black/30 border border-gray-100 dark:border-gray-800 hover:border-blue-600/20 dark:hover:border-blue-800/40 hover:-translate-y-0.5">
      {/* Top accent bar — slides in on hover */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 flex flex-col flex-grow">
        {/* Icon + external badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300 shrink-0">
            {icon ?? (
              <span className="font-display text-base font-extrabold text-blue-600 dark:text-blue-400">
                {title.charAt(0)}
              </span>
            )}
          </div>
          {isExternal && (
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-1" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-[15px] font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow leading-relaxed line-clamp-2">
          {content}
        </p>

        {/* Footer CTA */}
        <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center gap-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          <span>{isExternal ? 'Visit' : 'Open'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="motion-safe:animate-reveal h-full block">
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={url} className="motion-safe:animate-reveal h-full block">
      {cardContent}
    </Link>
  );
};

export default ToolCard;
