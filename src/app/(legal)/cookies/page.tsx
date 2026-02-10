import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Cookie Policy | JNTUH Results - The Skypedia',
    description: 'Cookie Policy for JNTUH Results. Learn how we use cookies and tracking technologies.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'JNTUH Results', 'privacy'],
};

export default function CookiePolicyPage() {
    return (
        <div>
            {/* Header Section */}
            <div className="px-8 py-12 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-[#21C15E]/5 to-transparent">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Cookie Policy
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Last Updated</span>
                    <span>November 28, 2025</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 prose prose-emerald dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold">
                <section>
                    <h2>1. What Are Cookies?</h2>
                    <p>
                        Cookies are small text files placed on your device to make websites work more efficiently. <strong>JNTUH Results - The Skypedia</strong> uses cookies to enhance your experience.
                    </p>
                </section>

                <section>
                    <h2>2. Types of Cookies We Use</h2>
                    <h3>2.1 Essential Cookies</h3>
                    <p>Required for functionality, such as session and authentication cookies.</p>

                    <h3>2.2 Functional Cookies</h3>
                    <p>Remember your preferences like dark mode or roll number history.</p>

                    <h3>2.3 Analytics Cookies</h3>
                    <p>We use <strong>Google Analytics</strong> to track page views and user behavior.</p>

                    <h3>2.4 Advertising Cookies</h3>
                    <p><strong>Google AdSense</strong> serves personalized advertisements.</p>
                </section>

                <section>
                    <h2>4. Advertising and Third-Party Cookies</h2>
                    <h3>4.1 Google AdSense Cookies</h3>
                    <p>
                        Google, as a third-party vendor, uses cookies to serve ads on <strong>JNTUH Results - The Skypedia</strong>. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site or other sites on the Internet.
                    </p>

                    <h3>4.2 Managing Your Preferences</h3>
                    <p>
                        You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#21C15E] hover:underline font-medium">Google Ad Settings</a>.
                    </p>
                    <p>
                        You can also manage or disable cookies through your browser settings. For more information on how to manage cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#21C15E] hover:underline font-medium">All About Cookies</a>.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50 my-6">
                        <p className="text-sm font-medium m-0">
                            <strong>Note:</strong> Disabling cookies may prevent you from using certain features of our website, such as remembering your results history or theme preferences.
                        </p>
                    </div>
                </section>

                <section>
                    <h2>5. Contact Us</h2>
                    <p>If you have questions about our use of cookies, contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="m-0 font-medium text-gray-900 dark:text-white">Email: info@theskypedia.com</p>
                    </div>
                </section>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                    <Link href="/privacy" className="hover:text-[#21C15E] transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-[#21C15E] transition-colors">Terms</Link>
                    <Link href="/disclaimer" className="hover:text-[#21C15E] transition-colors">Disclaimer</Link>
                </div>
            </div>
        </div>
    );
}
