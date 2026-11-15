import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/dashboard/',
                '/private/',
                '/notifications/verify',
                '/result-alerts/verify',
                '/offline',
            ],
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
