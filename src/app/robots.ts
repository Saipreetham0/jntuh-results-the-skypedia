import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/dashboard/',
                '/admin/',
                '/private/',
                '/_next/',
                '/static/',
                '/compare-performance/',
                '/credit-eligibility-check/',
                '/favicon.ico*',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
