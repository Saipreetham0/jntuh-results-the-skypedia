/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from 'react';
import { ConsolidatedResult } from '@/types/results';

// Module-level cache to prevent duplicate fetches across component remounts
const fetchCache = new Map<string, { data: ConsolidatedResult; timestamp: number }>();
const pendingFetches = new Map<string, Promise<ConsolidatedResult>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useConsolidatedResults() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ConsolidatedResult | null>(null);
    const [error, setError] = useState('');

    const lastFetchedRollNumber = useRef<string>('');

    const fetchResults = useCallback(async (roll: string) => {
        if (!roll) {
            setError('Please enter a roll number');
            return;
        }

        // Check module-level cache first
        const cached = fetchCache.get(roll);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            setResults(cached.data);
            lastFetchedRollNumber.current = roll;
            return;
        }

        // Check if there's already a pending fetch
        if (pendingFetches.has(roll)) {
            setLoading(true);
            try {
                const data = await pendingFetches.get(roll);
                if (data) {
                    setResults(data);
                    lastFetchedRollNumber.current = roll;
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching results');
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setError('');
        lastFetchedRollNumber.current = roll;

        // Create a promise for this fetch and store it
        const fetchPromise = (async () => {
            try {
                // Use internal API route to avoid CORS issues
                const response = await fetch(`/api/consolidated-results?htno=${roll}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Failed to fetch results');
                }

                const data = await response.json();

                // Cache the result
                fetchCache.set(roll, { data, timestamp: Date.now() });

                return data;
            } finally {
                // Remove from pending fetches
                pendingFetches.delete(roll);
            }
        })();

        pendingFetches.set(roll, fetchPromise);

        try {
            const data = await fetchPromise;
            setResults(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching results');
            lastFetchedRollNumber.current = '';
        } finally {
            setLoading(false);
        }
    }, []);

    const clearResults = useCallback(() => {
        setResults(null);
        setError('');
        lastFetchedRollNumber.current = '';
    }, []);

    return {
        loading,
        results,
        error,
        fetchResults,
        clearResults
    };
}
