/**
 * A/B Testing Utilities
 *  
 * Simple client-side A/B testing for revenue optimization.
 * 
 * Tests to run (from blueprint):
 * - Ad positions (60% vs 50% scroll depth)
 * - InFeed vs Display ad formats
 * - Ad density (35% vs 40%)
 * - Related articles layout (3 vs 4 cards)
 * 
 * Usage:
 * ```tsx
 * import { useABTest } from '@/lib/testing/ab-test';
 * 
 * const variant = useABTest('ad_position_test', ['control', 'variant']);
 * ```
 */

'use client';

import { useEffect, useState } from 'react';

export type Variant = string;

interface ABTestConfig {
    testId: string;
    variants: Variant[];
    weights?: number[]; // Optional custom weights (default: equal distribution)
}

/**
 * Get or assign user to A/B test variant
 */
export function getABTestVariant(
    testId: string,
    variants: Variant[],
    weights?: number[]
): Variant {
    if (typeof window === 'undefined') return variants[0];

    // Check if user already has assigned variant
    const storageKey = `ab_test_${testId}`;
    const stored = localStorage.getItem(storageKey);

    if (stored && variants.includes(stored)) {
        return stored;
    }

    // Assign new variant
    let selectedVariant: Variant;

    if (weights && weights.length === variants.length) {
        // Weighted random selection
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;

        selectedVariant = variants[0];
        for (let i = 0; i < variants.length; i++) {
            if (random < weights[i]) {
                selectedVariant = variants[i];
                break;
            }
            random -= weights[i];
        }
    } else {
        // Equal distribution
        selectedVariant = variants[Math.floor(Math.random() * variants.length)];
    }

    localStorage.setItem(storageKey, selectedVariant);

    // Track assignment in analytics
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'ab_test_assignment', {
            test_id: testId,
            variant: selectedVariant,
        });
    }

    return selectedVariant;
}

/**
 * React hook for A/B testing
 */
export function useABTest(testId: string, variants: Variant[], weights?: number[]): Variant {
    const [variant, setVariant] = useState<Variant>(variants[0]);

    useEffect(() => {
        const assigned = getABTestVariant(testId, variants, weights);
        setVariant(assigned);
    }, [testId, variants, weights]);

    return variant;
}

/**
 * Track A/B test conversion
 */
export function trackABTestConversion(
    testId: string,
    variant: Variant,
    conversionType: string,
    value?: number
) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'ab_test_conversion', {
            test_id: testId,
            variant: variant,
            conversion_type: conversionType,
            value: value,
        });
    }
}

/**
 * Common A/B Tests
 */

// Ad Position Test: 50% vs 60% scroll depth for money zone
export function useAdPositionTest(): '50-percent' | '60-percent' {
    return useABTest('money_zone_position', ['60-percent', '50-percent']) as '50-percent' | '60-percent';
}

// Ad Density Test: 35% vs 40%
export function useAdDensityTest(): '35-percent' | '40-percent' {
    return useABTest('ad_density', ['35-percent', '40-percent']) as '35-percent' | '40-percent';
}

// Related Articles Test: 3 vs 4 cards
export function useRelatedArticlesTest(): 3 | 4 {
    const variant = useABTest('related_articles_count', ['3', '4']);
    return parseInt(variant) as 3 | 4;
}

// InFeed vs Display Ad Test
export function useAdFormatTest(): 'infeed' | 'display' {
    return useABTest('ad_format', ['infeed', 'display']) as 'infeed' | 'display';
}

/**
 * Get all active A/B tests for current user
 */
export function getActiveTests(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const tests: Record<string, string> = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('ab_test_')) {
            const testId = key.replace('ab_test_', '');
            tests[testId] = localStorage.getItem(key) || '';
        }
    }

    return tests;
}
