'use client';

import { useLinkStatus } from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation Progress Bar
 * 
 * Uses the Next.js 16 useLinkStatus hook to show a loading indicator
 * at the top of the page when a navigation transition is pending.
 */
export default function NavigationProgressBar() {
    const { pending } = useLinkStatus();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (pending) {
            // Small delay before showing to avoid flashing for fast navigations
            timeout = setTimeout(() => {
                setVisible(true);
            }, 150);
        } else {
            setVisible(false);
        }
        return () => clearTimeout(timeout);
    }, [pending]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        scaleX: { duration: 3, ease: "linear" }, // Slow trickle
                        opacity: { duration: 0.2 }
                    }}
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1C61E7] to-[#21C15E] z-[9999] origin-left shadow-lg shadow-blue-500/20"
                />
            )}
        </AnimatePresence>
    );
}
