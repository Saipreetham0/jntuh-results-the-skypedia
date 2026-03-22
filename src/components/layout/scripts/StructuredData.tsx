/**
 * Structured Data (JSON-LD) Component
 *
 * Injects schema.org structured data for SEO.
 * Separated for better maintainability.
 *
 * @module components/layout/scripts/StructuredData
 */

import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from '@/lib/seo/schema';
import Script from 'next/script';

export function StructuredData() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
