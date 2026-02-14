import React from 'react';

export function StudentCounter() {
    return (
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 w-fit mx-auto mt-4 animate-fade-in text-xs font-medium text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>50,000+ students checked today</span>
        </div>
    );
}
