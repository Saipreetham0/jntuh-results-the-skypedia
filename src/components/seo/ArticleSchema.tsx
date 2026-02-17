import type { Article, WithContext } from 'schema-dts';
import type { JSX } from 'react';
import Script from 'next/script';

interface ArticleSchemaProps {
    headline: string;
    description: string;
    author: {
        name: string;
        url?: string;
    };
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
    keywords?: string[];
}

/**
 * ArticleSchema Component
 * 
 * Generates Article structured data (JSON-LD) for blog posts and articles.
 * Improves SEO and enables rich snippets in search results.
 * 
 * @example
 * ```tsx
 * <ArticleSchema
 *   headline="JNTUH CGPA Calculator Guide"
 *   description="Complete guide to calculating CGPA for JNTUH students"
 *   author={{ name: "TheSkypedia", url: "https://theskypedia.com" }}
 *   datePublished="2026-02-17"
 *   dateModified="2026-02-17"
 *   image="/images/cgpa-calculator.jpg"
 *   url="https://jntuhresults.theskypedia.com/blog/cgpa-calculator"
 *   keywords={["CGPA", "JNTUH", "Calculator"]}
 * />
 * ```
 */
export default function ArticleSchema({
    headline,
    description,
    author,
    datePublished,
    dateModified,
    image,
    url,
    keywords,
}: ArticleSchemaProps): JSX.Element {
    const schema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        author: {
            '@type': 'Person',
            name: author.name,
            ...(author.url && { url: author.url }),
        },
        publisher: {
            '@type': 'Organization',
            name: 'TheSkypedia',
            url: 'https://theskypedia.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://jntuhresults.theskypedia.com/logo.png',
            },
        },
        datePublished,
        ...(dateModified && { dateModified }),
        ...(image && {
            image: {
                '@type': 'ImageObject',
                url: image.startsWith('http') ? image : `https://jntuhresults.theskypedia.com${image}`,
            },
        }),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        ...(keywords && keywords.length > 0 && { keywords: keywords.join(', ') }),
    };

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}
