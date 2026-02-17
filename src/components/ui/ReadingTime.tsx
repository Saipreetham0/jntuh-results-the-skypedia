import { Clock } from 'lucide-react';

interface ReadingTimeProps {
    text: string;
    wordsPerMinute?: number;
    className?: string;
}

/**
 * ReadingTime Component
 * 
 * Calculates and displays estimated reading time based on word count.
 * Default reading speed is 200 words per minute (average adult reading speed).
 * 
 * Improves UX by setting expectations and increases completion rates.
 */
export default function ReadingTime({
    text,
    wordsPerMinute = 200,
    className = ''
}: ReadingTimeProps) {
    // Calculate word count
    const wordCount = text.trim().split(/\s+/).length;

    // Calculate reading time in minutes
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return (
        <div className={`flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
        </div>
    );
}

/**
 * Hook version for getting reading time value
 */
export function useReadingTime(text: string, wordsPerMinute = 200): number {
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
