/**
 * FAQ Schema Component (Server-side)
 *
 * Injects FAQPage structured data for pages with FAQ sections.
 * Unlike FAQSectionDynamic, this is a pure server component
 * that only outputs the schema JSON-LD.
 *
 * @module components/seo/FAQSchema
 */

import { generateFAQSchema } from '@/lib/seo/schema';

interface FAQSchemaProps {
    faqs: { question: string; answer: string }[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = generateFAQSchema(faqs);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
