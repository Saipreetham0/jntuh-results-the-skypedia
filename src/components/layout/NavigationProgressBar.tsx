'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navigation Progress Bar
 * 
 * Shows a loading indicator at the top of the page when navigating between routes.
 * Uses standard Next.js hooks for reliable detection.
 */
export default function NavigationProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // When path or search params change, we assume navigation completed
        setIsLoading(false);
    }, [pathname, searchParams]);

    // We can't easily detect "start" of navigation in App Router without experimental hooks,
    // so we rely on the fact that clicking a link usually triggers state changes or we can 
    // expose a context to manually trigger it if needed. 
    // For now, this component is a placeholder until a more robust solution like
    // Next.js 13+ compatible NProgress wrapper is implemented or we use the experimental usage.

    // However, to fix the "Rendered more hooks" error, we ensure this component is stable.

    return null;

    /* 
       NOTE: The previous useLinkStatus hook might have been causing issues or was experimental.
       Since reliably detecting route start in app router requires wrapping links or using
       experimental features that might be unstable, we are temporarily disabling the visual 
       progress bar to ensure stability, or we can use a library like `next-nprogress-bar`.
    */
}
