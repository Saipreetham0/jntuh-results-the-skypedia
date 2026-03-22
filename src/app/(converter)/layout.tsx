import React from "react";
import { ResponsiveAd } from "@/components/adsense";
import AD_SLOTS from "@/config/adSlots";

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
            {/* Top Ad */}
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.TOP_BANNER} />
            </div>

            <div className="flex-grow">
                {children}
            </div>

            {/* Bottom Ad */}
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
                <ResponsiveAd adSlot={AD_SLOTS.CALCULATOR.RESULT_BOTTOM} />
            </div>
        </div>
    );
}
