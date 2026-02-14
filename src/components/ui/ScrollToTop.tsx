"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-center gap-2 group"
                >
                    {/* Main Button */}
                    <button
                        onClick={scrollToTop}
                        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 group-hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden"
                        aria-label="Scroll to top"
                    >
                        {/* Gradient Background on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Icon */}
                        <ChevronUp className="relative w-6 h-6 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300 stroke-[2.5]" />

                        {/* Progress Circular Indicator (Optional/Fancy) */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-20 group-hover:opacity-0 transition-opacity">
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="22"
                                pathLength="1"
                                className="stroke-current text-blue-600 dark:text-blue-400 fill-none stroke-[2]"
                                style={{ pathLength: scrollYProgress }}
                            />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
