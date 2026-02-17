'use client';

import { useState } from 'react';
import { Download, Mail, X, CheckCircle } from 'lucide-react';

interface EmailCaptureProps {
    title: string;
    description: string;
    ctaText?: string;
    pdfTitle?: string;
    onSubmit?: (email: string) => Promise<void>;
    variant?: 'inline' | 'modal';
}

/**
 * EmailCapture Component
 * 
 * Captures emails in exchange for PDF guides/resources.
 * 
 * Strategy from monetization blueprint:
 * - Offer: Downloadable PDF guides
 * - Gate: Email required
 * - Value: Must be genuinely useful
 * 
 * Benefits:
 * - Build email list for return visits
 * - Increase brand authority
 * - Create remarketing audience
 * 
 * Conversion Rate: 15-30% (with valuable content)
 */
export default function EmailCapture({
    title,
    description,
    ctaText = 'Download Free PDF',
    pdfTitle,
    onSubmit,
    variant = 'inline',
}: EmailCaptureProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            if (onSubmit) {
                await onSubmit(email);
            } else {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log('Email captured:', email);
            }

            setIsSuccess(true);

            // Auto-close success message after 3 seconds
            setTimeout(() => {
                setIsSuccess(false);
                setEmail('');
            }, 3000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (variant === 'inline') {
        return (
            <div className="my-8 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-blue-200 dark:border-blue-700">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Check Your Email!
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            We've sent {pdfTitle || 'the PDF'} to your inbox.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                <Download className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {description}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors"
                                />
                                {error && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Mail className="w-5 h-5" />
                                        <span>{ctaText}</span>
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                                🔒 We respect your privacy. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                )}
            </div>
        );
    }

    // Modal variant can be implemented similarly
    return null;
}

/**
 * NewsletterSignup - Lightweight newsletter subscription
 */
export function NewsletterSignup({ title = 'Stay Updated' }: { title?: string }) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission
        console.log('Newsletter signup:', email);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                {title}
            </h4>

            {isSubmitted ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Thanks for subscribing!</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors"
                    >
                        Subscribe
                    </button>
                </form>
            )}
        </div>
    );
}
