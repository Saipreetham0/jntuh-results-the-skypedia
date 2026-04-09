import { siteConfig } from '@/config/site';

interface WebApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
    operatingSystem?: string;
}

/**
 * WebApplication Schema Component (Server)
 * Ideal for tools like calculators, converters, and checkers.
 * Uses plain <script> tag — correct pattern for server components.
 */
const WebApplicationSchema = ({
    name,
    description,
    url,
    applicationCategory = "EducationalApplication",
    operatingSystem = "Any"
}: WebApplicationSchemaProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": `${siteConfig.url}${url}`,
        "applicationCategory": applicationCategory,
        "operatingSystem": operatingSystem,
        "author": {
            "@type": "Organization",
            "name": "TheSkypedia",
            "url": siteConfig.url
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <script
            id={`webapp-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default WebApplicationSchema;
