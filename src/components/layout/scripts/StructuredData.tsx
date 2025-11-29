/**
 * Structured Data (JSON-LD) Component
 *
 * Injects schema.org structured data for SEO.
 * Separated for better maintainability.
 *
 * @module components/layout/scripts/StructuredData
 */

import Script from 'next/script';
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from '@/lib/seo/schema';

/**
 * Structured Data Component
 *
 * Renders JSON-LD schemas for website and organization.
 *
 * @returns JSON-LD script elements
 */
export function StructuredData() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Website Schema */}
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Organization Schema */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
