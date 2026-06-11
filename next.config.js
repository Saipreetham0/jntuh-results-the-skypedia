

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
      {
        protocol: "https",
        hostname: "studentservices.jntuh.ac.in",
      },
      {
        protocol: "https",
        hostname: "pagead2.googlesyndication.com",
      },
    ],
  },

  serverExternalPackages: ['googleapis', 'google-auth-library'],

  experimental: {
    optimizeCss: false,
    turbopackFileSystemCacheForBuild: false,
  },

  redirects: async () => [
    { source: '/cookie-policy', destination: '/cookies', permanent: true },
    { source: '/privacy-policy', destination: '/privacy', permanent: true },
    { source: '/engineering-specializations-2025', destination: '/btech-colleges-tg', permanent: true },
    { source: '/forgot-password', destination: '/login', permanent: true },
    // Capture "jntuh vercel" branded searches — keep as 301 so SEO credit flows
    { source: '/vercel', destination: '/jntuh-vercel', permanent: true },
    { source: '/jntuh-results-vercel', destination: '/jntuh-vercel', permanent: true },
    // Legacy URL patterns that may appear in GSC as 404s
    { source: '/result', destination: '/jntuh-results', permanent: true },
    { source: '/results', destination: '/results-hub', permanent: true },
    { source: '/cgpa', destination: '/cgpa-calculator', permanent: true },
    { source: '/check-result', destination: '/jntuh-results', permanent: true },
    { source: '/semester-results', destination: '/jntuh-results', permanent: true },
  ],

  headers: async () => {
    return [
      {
        source: "/service-worker.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

    ];
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },


};

export default nextConfig;
