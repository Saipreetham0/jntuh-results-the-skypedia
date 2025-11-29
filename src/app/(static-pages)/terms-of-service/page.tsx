import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | JNTUH Results - The Skypedia',
  description: 'Terms of Service for JNTUH Results. Read our terms and conditions for using our services.',
  keywords: ['terms of service', 'terms and conditions', 'JNTUH Results', 'user agreement'],
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Terms of Service
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

            {/* Acceptance */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Welcome to JNTUH Results - The Skypedia. By accessing or using our website at{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  jntuhresults.theskypedia.com
                </Link>
                , you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you do not agree with any part of these terms, you must not use our website.
              </p>
            </section>

            {/* Description of Service */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                JNTUH Results - The Skypedia provides the following services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Access to JNTUH examination results</li>
                <li>CGPA and SGPA calculation tools</li>
                <li>Grade and percentage conversion calculators</li>
                <li>Result alert notifications via email</li>
                <li>Academic resources and information</li>
                <li>Backlog checking and credit eligibility verification</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Important:</strong> We are an independent service and are NOT officially affiliated with JNTUH. All results are fetched from official JNTUH sources.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. User Responsibilities
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3.1 Accurate Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You agree to provide accurate, current, and complete information when using our services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                3.2 Prohibited Activities
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You agree NOT to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated bots or scrapers without permission</li>
                <li>Overload our servers with excessive requests</li>
                <li>Upload malicious code or harmful software</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Intellectual Property Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                All content on this website, including website design, software code, text, images, logos, and calculator tools, are the intellectual property of The Skypedia and are protected by copyright laws.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Exception:</strong> JNTUH examination results and official data are the property of JNTUH and are displayed for informational purposes only.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Disclaimer of Warranties
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Our service is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. We make no warranties about:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Accuracy of results, calculations, or information</li>
                <li>Availability and uninterrupted service</li>
                <li>Timeliness of results updates</li>
                <li>Completeness of features or data</li>
                <li>Absolute security of the service</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Important:</strong> Always verify your results with official JNTUH sources. See our{' '}
                <Link href="/disclaimer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Disclaimer
                </Link>{' '}
                for more details.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                To the maximum extent permitted by law, The Skypedia shall NOT be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Any direct, indirect, incidental, or consequential damages</li>
                <li>Errors or inaccuracies in results or calculations</li>
                <li>Service interruptions or unavailability</li>
                <li>Unauthorized access to your personal information</li>
                <li>Actions taken based on information from our service</li>
                <li>Third-party content or links</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Third-Party Services and Links
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Our website may contain links to third-party services including the official JNTUH website, Google AdSense, and social media platforms.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We are not responsible for the content, privacy practices, or terms of service of these third-party websites.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Privacy Policy
                </Link>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using our service, you consent to our data practices as outlined in the Privacy Policy.
              </p>
            </section>

            {/* Service Modifications */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Service Modifications and Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Modify, suspend, or discontinue any part of the service at any time</li>
                <li>Change features, functionality, or availability</li>
                <li>Update these Terms of Service without prior notice</li>
                <li>Terminate or suspend your access for violations</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of India.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use after changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@theskypedia.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    support@theskypedia.com
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Website:</strong>{' '}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Contact Form
                  </Link>
                </p>
              </div>
            </section>

            {/* Related Policies */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Related Policies:</strong>{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Privacy Policy
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
