import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer | JNTUH Results - The Skypedia',
  description: 'Disclaimer for JNTUH Results. Important information about the accuracy and use of our services.',
  keywords: ['disclaimer', 'legal notice', 'JNTUH Results', 'accuracy notice'],
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Disclaimer
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

            {/* Important Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-6 mb-12 rounded-r-lg">
              <p className="font-bold text-gray-900 dark:text-white mb-2">⚠️ IMPORTANT NOTICE</p>
              <p className="text-gray-700 dark:text-gray-300">
                JNTUH Results - The Skypedia is an <strong>independent service</strong> and is <strong>NOT officially affiliated</strong> with JNTUH (Jawaharlal Nehru Technological University Hyderabad). Always verify critical information with official JNTUH sources.
              </p>
            </div>

            {/* General Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. General Disclaimer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The information provided on{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  jntuhresults.theskypedia.com
                </Link>{' '}
                is for general informational and educational purposes only. We make no representations or warranties about the completeness, accuracy, reliability, or availability of the website or services.
              </p>
            </section>

            {/* Not Official */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Not an Official JNTUH Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>This website is NOT:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>An official JNTUH website or service</li>
                <li>Endorsed, sponsored, or approved by JNTUH</li>
                <li>Affiliated with any government institution</li>
                <li>Authorized to issue official transcripts or certificates</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are an <strong>independent third-party service</strong> that fetches publicly available examination results from official JNTUH sources.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Official JNTUH Website:</strong>{' '}
                <a
                  href="https://jntuh.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
                >
                  jntuh.ac.in
                </a>
              </p>
            </section>

            {/* Accuracy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Accuracy of Results and Data
              </h2>

              <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
                <p className="font-bold text-gray-900 dark:text-white mb-2">⚠️ ALWAYS VERIFY OFFICIAL RESULTS</p>
                <p className="text-gray-700 dark:text-gray-300">
                  For official transcripts, academic decisions, or legal purposes, always refer to the official JNTUH website or your college administration. Do NOT rely solely on our service.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Result Accuracy
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                While we fetch results directly from official JNTUH sources, we cannot guarantee 100% accuracy due to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>Technical errors in data transmission or processing</li>
                <li>Changes or corrections made by JNTUH after initial publication</li>
                <li>Network connectivity issues or server downtimes</li>
                <li>Parsing errors or formatting discrepancies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Calculation Tools
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our CGPA, SGPA, and percentage calculators are based on standard formulas. However, university-specific grading policies may vary. Always verify calculations with your college or JNTUH.
              </p>
            </section>

            {/* No Professional Advice */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. No Professional or Academic Advice
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                The information on this website does NOT constitute:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Academic Advice:</strong> Consult your college faculty or academic advisors</li>
                <li><strong>Career Guidance:</strong> Seek professional career counseling services</li>
                <li><strong>Legal Advice:</strong> Consult a qualified legal professional</li>
                <li><strong>Financial Advice:</strong> Consult a certified financial advisor</li>
              </ul>
            </section>

            {/* Third-Party Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Third-Party Content and Links
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Our website may contain links to third-party websites. We have no control over and assume no responsibility for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>The content, privacy policies, or practices of third-party sites</li>
                <li>The accuracy or availability of external resources</li>
                <li>Any damages or losses caused by your use of linked sites</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Service Availability and Interruptions
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We do NOT guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Uninterrupted access to the website or services</li>
                <li>Error-free operation or bug-free experience</li>
                <li>Availability during JNTUH server downtimes</li>
                <li>Immediate updates when new results are published</li>
                <li>Email notification delivery (alerts may be delayed or fail)</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>To the maximum extent permitted by law,</strong> The Skypedia shall NOT be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Incorrect results or calculation errors</li>
                <li>Academic consequences or decisions made based on our information</li>
                <li>Missed deadlines due to delayed notifications</li>
                <li>Loss of personal data or saved information</li>
                <li>Financial losses or lost opportunities</li>
                <li>Service outages, bugs, or security breaches</li>
              </ul>
            </section>

            {/* No Warranty */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. No Warranty
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                This website and all services are provided <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> without any warranties of any kind, including implied warranties of merchantability, fitness for a particular purpose, or accuracy.
              </p>
            </section>

            {/* User Responsibility */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. User Responsibility
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                As a user, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Verifying all critical information with official sources</li>
                <li>Making informed decisions based on official JNTUH data</li>
                <li>Maintaining the security of your personal information</li>
                <li>Understanding that we are an informational service, not an official source</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about this Disclaimer, please contact us:
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

            {/* Final Reminder */}
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <p className="font-bold text-gray-900 dark:text-white mb-3">Final Reminder:</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ We are an <strong>independent informational service</strong></li>
                <li>✓ Always <strong>verify critical information</strong> with official JNTUH sources</li>
                <li>✓ Use our service as a <strong>convenient tool</strong>, not the sole source of truth</li>
              </ul>
            </div>

            {/* Related Policies */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700 mt-12">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Related Policies:</strong>{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Privacy Policy
                </Link>
                {', '}
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Terms of Service
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
