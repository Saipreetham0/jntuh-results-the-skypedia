import React from "react";
import { ResponsiveAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/30 dark:bg-emerald-900/10 blur-[120px]" />
            </div>

            {/* Top Ad */}
            <div className="relative z-10 container mx-auto px-4 pt-4">
                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} />
            </div>

            <main className="relative z-10 flex-grow">
                {children}
            </main>

            {/* Bottom Ad */}
            <div className="relative z-10 container mx-auto px-4 pb-8">
                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.BOTTOM_RECTANGLE} />
            </div>
        </div>
    );
}
