import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | JNTUH Results - The Skypedia',
  description: 'Cookie Policy for JNTUH Results. Learn how we use cookies and tracking technologies.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'JNTUH Results', 'privacy'],
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Cookie Policy
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

            {/* What Are Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Cookies are small text files placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>JNTUH Results - The Skypedia</strong> uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, personalize content, and serve relevant advertisements.
              </p>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Types of Cookies We Use
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.1 Essential Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Required for the website to function properly and cannot be disabled:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>Session cookies - Maintain your session as you navigate</li>
                <li>Authentication cookies - Remember your login status</li>
                <li>Security cookies - Detect authentication abuses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.2 Functional Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Remember your preferences and provide enhanced features:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>Theme preference (dark/light mode)</li>
                <li>Language settings</li>
                <li>Roll number memory for convenience</li>
                <li>Calculator settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.3 Analytics Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Google Analytics</strong> - Tracks page views and user behavior</li>
                <li><strong>Vercel Speed Insights</strong> - Monitors website performance</li>
                <li><strong>Google Tag Manager</strong> - Manages tracking tags</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                2.4 Advertising Cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Used to deliver personalized advertisements:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Google AdSense</strong> - Serves personalized ads</li>
                <li><strong>DoubleClick</strong> - Tracks ad performance</li>
                <li>Third-party ad networks may set their own cookies</li>
              </ul>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Third-Party Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use various third-party services that set cookies on your device:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Purpose:</strong> Website analytics and user behavior tracking
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Cookies:</strong> _ga, _gid, _gat
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
                    >
                      Google Privacy Policy →
                    </a>
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google AdSense</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Purpose:</strong> Display personalized advertisements
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Cookies:</strong> _gcl_au, test_cookie, IDE, DSID
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
                    >
                      Google Ad Privacy →
                    </a>
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Vercel</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Purpose:</strong> Website hosting and speed insights
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Cookies:</strong> __vercel_live_token, _vercel_jwt
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <a
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
                    >
                      Vercel Privacy →
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* How to Control Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. How to Control Cookies
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Browser Settings
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You can control and manage cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Edge
                  </a>
                </li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-5 rounded-r-lg mb-6">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">⚠️ Impact of Disabling Cookies</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Blocking or deleting cookies may affect your experience on our website. Some features may not work properly, such as staying logged in or remembering your preferences.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Opt Out of Advertising Cookies
              </h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Google Ads Settings
                  </a>
                </li>
                <li>
                  <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Network Advertising Initiative Opt-Out
                  </a>
                </li>
                <li>
                  <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    Digital Advertising Alliance Opt-Out
                  </a>
                </li>
              </ul>
            </section>

            {/* Other Technologies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Local Storage and Other Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                In addition to cookies, we may use:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Local Storage</strong> - Store user preferences (theme, roll number history)</li>
                <li><strong>Session Storage</strong> - Temporary storage for current browsing session</li>
                <li><strong>IndexedDB</strong> - Store calculation history or cached data</li>
                <li><strong>Service Workers</strong> - Enable offline functionality for PWA</li>
              </ul>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Updates to This Cookie Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Cookie Policy from time to time. We will notify you of any significant changes by updating the "Last Updated" date at the top of this page.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@theskypedia.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                    privacy@theskypedia.com
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
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Terms of Service
                </Link>
                {', '}
                <Link href="/disclaimer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                  Disclaimer
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
