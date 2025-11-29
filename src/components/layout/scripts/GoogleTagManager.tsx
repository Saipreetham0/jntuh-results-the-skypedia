/**
 * Google Tag Manager Component
 *
 * Handles GTM script injection and noscript fallback.
 * Separated for better testability and reusability.
 *
 * @module components/layout/scripts/GoogleTagManager
 */

import Script from 'next/script';
import { siteConfig } from '@/config/site';

/**
 * Google Tag Manager Script Component
 *
 * Injects GTM tracking code into the application.
 *
 * @returns GTM script and noscript elements
 */
export function GoogleTagManager() {
  const gtmId = siteConfig.google.tagManagerId;

  return (
    <>
      {/* GTM Script */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

/**
 * Google Tag Manager NoScript Fallback
 *
 * Provides GTM functionality when JavaScript is disabled.
 *
 * @returns NoScript iframe element
 */
export function GoogleTagManagerNoScript() {
  const gtmId = siteConfig.google.tagManagerId;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
        aria-hidden="true"
      />
    </noscript>
  );
}
