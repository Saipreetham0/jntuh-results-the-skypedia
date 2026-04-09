import { siteConfig } from '@/config/site';

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

/**
 * Breadcrumb Schema Component (Server)
 * Generates JSON-LD for breadcrumbs to improve SERP appearance.
 * Uses plain <script> tag — correct pattern for server components.
 */
const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${siteConfig.url}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
        }))
    };

    return (
        <script
            id={`breadcrumb-schema-${items.map(i => i.name).join('-').toLowerCase()}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export default BreadcrumbSchema;
