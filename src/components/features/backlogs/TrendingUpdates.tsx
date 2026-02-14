import React from 'react';
import { Megaphone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function TrendingUpdates() {
    const updates = [
        { text: "R22 B.Tech 2-1 Regular Results Released", href: "/results/r22/2-1" },
        { text: "R18 3-2 Supply Notification Out", href: "/notifications" },
        { text: "JNTUH Grace Marks Eligibility Calculator Updated", href: "/credit-eligibility-check" },
        { text: "M.Tech 1st Sem Results Declared", href: "/mtech-results" },
    ];

    return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-800 overflow-hidden relative h-10 flex items-center">
            <div className="bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider absolute left-0 z-10 h-full flex items-center shadow-md">
                <Megaphone className="w-3 h-3 mr-2 animate-pulse" />
                Trending
            </div>
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 pl-32">
                {[...updates, ...updates].map((update, i) => (
                    <Link
                        key={i}
                        href={update.href}
                        className="text-sm font-medium text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300 flex items-center group transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2" />
                        {update.text}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                    </Link>
                ))}
            </div>
            <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Pause on hover */
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
        </div>
    );
}
