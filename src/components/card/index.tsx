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
    <div className="group relative h-full flex flex-col bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 border border-white/50 dark:border-white/5 hover:-translate-y-1">
      {/* Subtle Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

      {/* Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative p-6 flex flex-col flex-grow z-10">
        {/* Icon Area */}
        <div className="mb-6 flex justify-between items-start">
          <div className="relative w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-blue-500/20">
            {icon ? (
              <div className="scale-100 group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
            ) : (
              <span className="text-xl font-bold">{title.charAt(0)}</span>
            )}
          </div>

          {/* External Link Indicator */}
          {isExternal && (
            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed line-clamp-3">
          {content}
        </p>

        {/* Action Area */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
          <span>Open Tool</span>
          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
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
