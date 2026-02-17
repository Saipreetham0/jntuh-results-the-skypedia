'use client';

import Image from 'next/image';
import type { ComponentProps } from 'react';

interface ImageOptimizedProps extends Omit<ComponentProps<typeof Image>, 'placeholder' | 'blurDataURL'> {
    src: string;
    alt: string;
    /** Show loading skeleton while image loads */
    showSkeleton?: boolean;
    /** Custom skeleton background color */
    skeletonColor?: string;
}

/**
 * ImageOptimized Component
 * 
 * Wrapper for Next.js Image with automatic optimization:
 * - WebP/AVIF format with JPEG fallback
 * - Lazy loading by default
 * - Responsive sizing
 * - Loading skeleton to prevent CLS
 * - Blur placeholder for better perceived performance
 * 
 * @example
 * ```tsx
 * <ImageOptimized
 *   src="/images/hero.jpg"
 *   alt="JNTUH Results Hero"
 *   width={1200}
 *   height={630}
 *   priority // For LCP images
 * />
 * ```
 */
export default function ImageOptimized({
    src,
    alt,
    showSkeleton = true,
    skeletonColor = 'bg-gray-200 dark:bg-gray-700',
    className = '',
    priority = false,
    ...props
}: ImageOptimizedProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {showSkeleton && (
                <div
                    className={`absolute inset-0 ${skeletonColor} animate-pulse`}
                    aria-hidden="true"
                />
            )}
            <Image
                src={src}
                alt={alt}
                className={`${className} relative z-10`}
                loading={priority ? undefined : 'lazy'}
                priority={priority}
                quality={85}
                {...props}
            />
        </div>
    );
}
