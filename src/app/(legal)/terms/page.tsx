import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service | JNTUH Results - The Skypedia',
    description: 'Terms of Service for JNTUH Results. Read our terms and conditions for using our services.',
    keywords: ['terms of service', 'terms and conditions', 'JNTUH Results', 'user agreement'],
};

export default function TermsOfServicePage() {
    return (
        <div>
            {/* Header Section */}
            <div className="px-8 py-12 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-[#1C61E7]/5 to-transparent">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Terms of Service
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Last Updated</span>
                    <span>November 28, 2025</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 prose prose-blue dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-semibold">
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        Welcome to JNTUH Results - The Skypedia. By accessing or using our website at{' '}
                        <Link href="/" className="text-[#1C61E7] no-underline hover:underline font-medium">
                            jntuhresults.theskypedia.com
                        </Link>
                        , you agree to be bound by these Terms of Service and all applicable laws and regulations.
                    </p>
                    <p>
                        If you do not agree with any part of these terms, you must not use our website.
                    </p>
                </section>

                <section>
                    <h2>2. Description of Service</h2>
                    <p>
                        JNTUH Results - The Skypedia provides access to JNTUH examination results, CGPA/SGPA calculation tools, result alert notifications, and scientific academic resources.
                    </p>
                    <p>
                        <strong>Important:</strong> We are an independent service and are NOT officially affiliated with JNTUH. All results are fetched from official JNTUH sources.
                    </p>
                </section>

                <section>
                    <h2>3. Data Collection and Consent</h2>
                    <h3>3.1 Consent to Collect Data</h3>
                    <p>
                        By using certain features of our website, such as result alerts, notification subscriptions, or student profiles, you explicitly consent to the collection and processing of your personal data, including but not limited to:
                    </p>
                    <ul>
                        <li>JNTUH Roll Number (Hall Ticket Number)</li>
                        <li>Email Address</li>
                        <li>Mobile Number (for optional SMS alerts)</li>
                        <li>Full Name (as retrieved from official records or provided by you)</li>
                    </ul>

                    <h3>3.2 Purpose of Collection</h3>
                    <p>
                        We collect this data solely for the following purposes:
                    </p>
                    <ul>
                        <li>Automating the retrieval of your examination results</li>
                        <li>Sending instant result alerts and university notifications via email or SMS</li>
                        <li>Providing a personalized dashboard and academic tracking experience</li>
                        <li>Improving our services through anonymous analytics</li>
                    </ul>

                    <h3>3.3 Third-Party Processing</h3>
                    <p>
                        We use trusted third-party services to securely process and store your data:
                    </p>
                    <ul>
                        <li><strong>Supabase:</strong> For secure database storage and authentication.</li>
                        <li><strong>Resend:</strong> For clinical and notification email delivery.</li>
                        <li><strong>Vercel:</strong> For website hosting and server-side processing.</li>
                    </ul>
                    <p>Each of these vendors maintains their own strict privacy and security standards.</p>

                    <h3>3.4 Data Retention and Deletion</h3>
                    <p>
                        We retain your data for as long as your account is active or as needed to provide you with our services. You may request the deletion of your personal data at any time by contacting us at <a href="mailto:info@theskypedia.com" className="hover:underline">info@theskypedia.com</a>.
                    </p>
                </section>

                <section>
                    <h2>4. User Responsibilities</h2>
                    <h3>4.1 Accurate Information</h3>
                    <p>
                        You agree to provide accurate, current, and complete information when using our services.
                    </p>

                    <h3>4.2 Account Security</h3>
                    <p>
                        If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                    </p>

                    <h3>4.3 Prohibited Activities</h3>
                    <p>You agree NOT to:</p>
                    <ul>
                        <li>Use the service for any illegal or unauthorized purpose</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Use automated bots or scrapers without permission</li>
                        <li>Overload our servers with excessive requests</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Intellectual Property Rights</h2>
                    <p>
                        All content on this website, including design, software code, text, images, and logos, are the intellectual property of The Skypedia. JNTUH examination results are the property of JNTUH.
                    </p>
                </section>

                <section>
                    <h2>6. Disclaimer of Warranties</h2>
                    <p>
                        Our service is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. We make no warranties about the absolute accuracy of results or uninterrupted service.
                    </p>
                    <p>
                        Always verify your results with official JNTUH sources. See our{' '}
                        <Link href="/disclaimer" className="text-[#21C15E] no-underline hover:underline font-medium">
                            Disclaimer
                        </Link>{' '}
                        for more details.
                    </p>
                </section>

                <section>
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, The Skypedia shall NOT be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our service.
                    </p>
                </section>

                <section>
                    <h2>8. Contact Information</h2>
                    <p>If you have questions about these Terms of Service, please contact us at:</p>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <p className="m-0 font-medium text-gray-900 dark:text-white">Email: info@theskypedia.com</p>
                        <p className="m-0 text-sm text-gray-500">Website: <Link href="/contact" className="hover:underline">Contact Form</Link></p>
                    </div>
                </section>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 text-sm font-semibold uppercase tracking-widest text-gray-400">
                    <Link href="/privacy" className="hover:text-[#1C61E7] transition-colors">Privacy</Link>
                    <Link href="/disclaimer" className="hover:text-[#1C61E7] transition-colors">Disclaimer</Link>
                    <Link href="/cookies" className="hover:text-[#1C61E7] transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
    );
}
