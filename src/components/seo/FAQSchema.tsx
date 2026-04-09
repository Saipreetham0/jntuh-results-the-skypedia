/**
 * FAQ Schema Component (Server)
 *
 * Injects FAQPage structured data using a plain <script> tag —
 * the correct pattern for server components in Next.js App Router.
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
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
