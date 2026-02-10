import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Disclaimer | JNTUH Results - The Skypedia',
    description: 'Disclaimer for JNTUH Results. Important information about the accuracy and use of our services.',
    keywords: ['disclaimer', 'legal notice', 'JNTUH Results', 'accuracy notice'],
};

export default function DisclaimerPage() {
    return (
        <div>
            {/* Header Section */}
            <div className="px-8 py-12 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-[#1C61E7]/5 to-transparent">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Disclaimer
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Last Updated</span>
                    <span>November 28, 2025</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 prose prose-blue dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold">
                <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-8 rounded-r-2xl">
                    <p className="font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">⚠️ Important Notice</p>
                    <p className="text-gray-700 dark:text-gray-300 m-0">
                        JNTUH Results - The Skypedia is an <strong>independent service</strong> and is <strong>NOT officially affiliated</strong> with JNTUH (Jawaharlal Nehru Technological University Hyderabad).
                    </p>
                </div>

                <section>
                    <h2>1. General Disclaimer</h2>
                    <p>
                        The information provided on{' '}
                        <Link href="/" className="text-[#1C61E7] no-underline hover:underline font-medium">
                            jntuhresults.theskypedia.com
                        </Link>{' '}
                        is for general informational and educational purposes only.
                    </p>
                </section>

                <section>
                    <h2>2. Not an Official JNTUH Service</h2>
                    <p>
                        We are an <strong>independent third-party service</strong> that fetches publicly available examination results from official JNTUH sources. This website is NOT an official JNTUH website.
                    </p>
                    <p className="font-medium">
                        Official JNTUH Website:{' '}
                        <a href="https://jntuh.ac.in" target="_blank" rel="noopener noreferrer" className="text-[#1C61E7] hover:underline">
                            jntuh.ac.in
                        </a>
                    </p>
                </section>

                <section>
                    <h2>3. Accuracy of Results</h2>
                    <p>
                        While we fetch results directly from official JNTUH sources, we cannot guarantee 100% accuracy due to technical errors, network issues, or parsing discrepancies.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-6 rounded-r-2xl my-6">
                        <p className="font-bold text-gray-900 dark:text-white m-0">ALWAYS VERIFY OFFICIAL RESULTS</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                            For academic decisions or legal purposes, always refer to the official JNTUH website.
                        </p>
                    </div>
                </section>

                <section>
                    <h2>4. Advertising and Third-Party Links</h2>
                    <p>
                        This website may contain advertisements and links to third-party websites. The Skypedia does not endorse the products or services advertised, nor do we have control over the content of third-party sites.
                    </p>
                    <p>
                        Any interaction with advertisements or third-party links is at your own risk.
                    </p>
                </section>

                <section>
                    <h2>5. Limitation of Liability</h2>
                    <p>
                        The Skypedia shall NOT be liable for any consequences or decisions made based on the information provided on this portal.
                    </p>
                </section>

                <section>
                    <h2>6. Contact Information</h2>
                    <p>If you have questions about this Disclaimer, please contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="m-0 font-medium text-gray-900 dark:text-white">Email: info@theskypedia.com</p>
                    </div>
                </section>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                    <Link href="/privacy" className="hover:text-[#1C61E7] transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-[#1C61E7] transition-colors">Terms</Link>
                    <Link href="/cookies" className="hover:text-[#1C61E7] transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
    );
}
