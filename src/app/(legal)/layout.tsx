import React from 'react';

interface LegalLayoutProps {
    children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Shared Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C61E7]/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#21C15E]/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-gray-800 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
