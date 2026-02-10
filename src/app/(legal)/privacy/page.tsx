import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | JNTUH Results - The Skypedia',
    description: 'Privacy Policy for JNTUH Results. Learn how we collect, use, and protect your personal information.',
    keywords: ['privacy policy', 'data protection', 'JNTUH Results', 'user privacy'],
};

export default function PrivacyPolicyPage() {
    return (
        <div>
            {/* Header Section */}
            <div className="px-8 py-12 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-[#1C61E7]/5 to-transparent">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Privacy Policy
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Last Updated</span>
                    <span>November 28, 2025</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 prose prose-blue dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold">
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to JNTUH Results - The Skypedia ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                        <Link href="/" className="text-[#1C61E7] no-underline hover:underline font-medium">
                            jntuhresults.theskypedia.com
                        </Link>.
                    </p>
                    <p>
                        By using our website, you agree to the collection and use of information in accordance with this policy.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <h3>2.1 Personal Information</h3>
                    <p>We may collect the following personal information:</p>
                    <ul>
                        <li><strong>Roll Number:</strong> Your JNTUH student roll number for result retrieval</li>
                        <li><strong>Email Address:</strong> For result alerts and notifications</li>
                        <li><strong>Phone Number:</strong> Optional, for SMS notifications</li>
                        <li><strong>Name:</strong> If you contact us or create an account</li>
                    </ul>

                    <h3>2.2 Automatically Collected Information</h3>
                    <ul>
                        <li>IP address and location data</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Pages visited and time spent</li>
                    </ul>

                    <h3>2.3 Academic Information</h3>
                    <ul>
                        <li>Semester results and grades</li>
                        <li>CGPA and SGPA calculations</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <ul>
                        <li><strong>Result Services:</strong> To fetch and display your JNTUH results</li>
                        <li><strong>Notifications:</strong> To send result alerts when new results are declared</li>
                        <li><strong>Analytics:</strong> To improve our services</li>
                        <li><strong>Communication:</strong> To respond to your inquiries</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Advertising and Cookies</h2>
                    <h3>4.1 Google AdSense</h3>
                    <p>
                        We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site or other sites on the Internet.
                    </p>
                    <p>
                        Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#1C61E7] hover:underline">Google Ad Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#1C61E7] hover:underline">www.aboutads.info</a>.
                    </p>

                    <h3>4.2 Log Files</h3>
                    <p>
                        JNTUH Results - The Skypedia follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                    </p>
                </section>

                <section>
                    <h2>5. California Consumer Privacy Act (CCPA)</h2>
                    <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                    <ul>
                        <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                        <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                        <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                    </ul>
                    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
                </section>

                <section>
                    <h2>6. GDPR Data Protection Rights</h2>
                    <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                    <ul>
                        <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                        <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                        <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Third-Party Services</h2>
                    <p>
                        Our website uses various third-party services for advertising (Google AdSense), analytics (Google Analytics), communication (Resend), and hosting/backend (Vercel, Supabase).
                    </p>
                    <p>
                        Note that JNTUH Results - The Skypedia has no access to or control over these cookies that are used by third-party advertisers. You should consult the respective Privacy Policies of these third-party ad servers for more detailed information.
                    </p>
                </section>

                <section>
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="m-0 font-medium text-gray-900 dark:text-white">Email: info@theskypedia.com</p>
                        <p className="m-0 text-sm text-gray-500">Address: The Skypedia, India</p>
                    </div>
                </section>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                    <Link href="/terms" className="hover:text-[#1C61E7] transition-colors">Terms</Link>
                    <Link href="/disclaimer" className="hover:text-[#1C61E7] transition-colors">Disclaimer</Link>
                    <Link href="/cookies" className="hover:text-[#1C61E7] transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
    );
}
