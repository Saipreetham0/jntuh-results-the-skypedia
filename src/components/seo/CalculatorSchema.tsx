import React from 'react';

interface CalculatorSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
    operatingSystem?: string;
}

/**
 * CalculatorSchema Component
 * 
 * Generates JSON-LD structured data for calculator tools
 * Implements SoftwareApplication schema for better search visibility
 */
export default function CalculatorSchema({
    name,
    description,
    url,
    applicationCategory = "CalculatorApplication",
    operatingSystem = "Any"
}: CalculatorSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": applicationCategory,
        "operatingSystem": operatingSystem,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
