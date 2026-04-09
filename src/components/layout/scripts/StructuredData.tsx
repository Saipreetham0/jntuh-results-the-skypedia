/**
 * Structured Data (JSON-LD) Component
 *
 * Injects schema.org structured data for SEO.
 * Uses plain <script> tags — the correct pattern for server components in Next.js App Router.
 *
 * @module components/layout/scripts/StructuredData
 */

import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from '@/lib/seo/schema';

export function StructuredData() {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
