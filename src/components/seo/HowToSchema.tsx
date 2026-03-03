/**
 * HowTo Schema Component
 *
 * Injects HowTo structured data for calculator pages
 * to earn rich results in Google SERPs.
 *
 * @module components/seo/HowToSchema
 */

import { generateHowToSchema } from '@/lib/seo/schema';

interface HowToSchemaProps {
    name: string;
    description: string;
    totalTime?: string;
    steps: { name: string; text: string }[];
}

export default function HowToSchema({
    name,
    description,
    totalTime = 'PT2M',
    steps,
}: HowToSchemaProps) {
    const schema = generateHowToSchema(name, description, totalTime, steps);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
