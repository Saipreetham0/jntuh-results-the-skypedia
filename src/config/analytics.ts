export const analyticsConfig = {
    googleAnalytics: {
        enabled: true,
        measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-N1FJ0X03GL',
        streamId: '5987695278',
    },
    microsoftClarity: {
        enabled: false,
        projectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    },
    facebookPixel: {
        enabled: false,
        pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    },
    hotjar: {
        enabled: false,
        siteId: process.env.NEXT_PUBLIC_HOTJAR_SITE_ID,
        version: 6,
    },
    linkedInInsight: {
        enabled: false,
        partnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
    },
    twitterPixel: {
        enabled: false,
        pixelId: process.env.NEXT_PUBLIC_TWITTER_PIXEL_ID,
    },
};
