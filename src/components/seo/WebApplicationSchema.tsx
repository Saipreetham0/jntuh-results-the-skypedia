"use client";

import React from 'react';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

interface WebApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
    operatingSystem?: string;
}

/**
 * WebApplication Schema Component
 * Ideal for tools like calculators, converters, and checkers.
 */
const WebApplicationSchema: React.FC<WebApplicationSchemaProps> = ({
    name,
    description,
    url,
    applicationCategory = "EducationalApplication",
    operatingSystem = "Any"
}) => {
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
        <Script
            id={`webapp-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default WebApplicationSchema;
