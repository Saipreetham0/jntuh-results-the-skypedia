import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | JNTUH Results - The Skypedia',
  description: 'Privacy Policy for JNTUH Results. Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'JNTUH Results', 'user privacy'],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: November 28, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12 prose prose-gray dark:prose-invert max-w-none">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Welcome to JNTUH Results - The Skypedia ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  jntuhresults.theskypedia.com
                </Link>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We may collect the following personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Roll Number:</strong> Your JNTUH student roll number for result retrieval</li>
                <li><strong>Email Address:</strong> For result alerts and notifications</li>
                <li><strong>Phone Number:</strong> Optional, for SMS notifications (if subscribed)</li>
                <li><strong>Name:</strong> If you contact us or create an account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.3 Academic Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Semester results and grades</li>
                <li>CGPA and SGPA calculations</li>
                <li>Backlog information</li>
                <li>Credit eligibility data</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Result Services:</strong> To fetch and display your JNTUH results</li>
                <li><strong>Notifications:</strong> To send result alerts when new results are declared</li>
                <li><strong>Calculations:</strong> To calculate CGPA, SGPA, and percentages</li>
                <li><strong>Analytics:</strong> To understand user behavior and improve our services</li>
                <li><strong>Communication:</strong> To respond to your inquiries and support requests</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                <li><strong>Security:</strong> To protect against fraud and unauthorized access</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Data Storage and Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Limited employee access to personal data</li>
                <li>Data backup and disaster recovery procedures</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Data Retention:</strong> We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We <strong>DO NOT sell, trade, or rent</strong> your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>JNTUH Official Sources:</strong> We fetch results from official JNTUH servers</li>
                <li><strong>Service Providers:</strong> Email services (Resend), hosting (Vercel), analytics (Google Analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Provide personalized content and ads</li>
                <li>Improve user experience</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                You can control cookies through your browser settings. However, disabling cookies may affect website functionality. See our{' '}
                <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Cookie Policy
                </Link>{' '}
                for more details.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Our website uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Google AdSense:</strong> For displaying advertisements</li>
                <li><strong>Google Analytics:</strong> For website analytics</li>
                <li><strong>Resend:</strong> For sending email notifications</li>
                <li><strong>Vercel:</strong> For website hosting</li>
                <li><strong>Supabase:</strong> For database services</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Your Rights and Choices
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from email notifications anytime</li>
                <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                <li><strong>Object:</strong> Object to processing of your personal data</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                To exercise these rights, contact us at:{' '}
                <a href="mailto:privacy@theskypedia.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  privacy@theskypedia.com
                </a>
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Our website is intended for college students and adults. We do not knowingly collect personal information from children under 13 years of age. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@theskypedia.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    privacy@theskypedia.com
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Website:</strong>{' '}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Contact Form
                  </Link>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Address:</strong> The Skypedia, India
                </p>
              </div>
            </section>

            {/* Related Policies */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Related Policies:</strong>{' '}
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Terms of Service
                </Link>
                {', '}
                <Link href="/disclaimer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Disclaimer
                </Link>
                {', '}
                <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Cookie Policy
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
