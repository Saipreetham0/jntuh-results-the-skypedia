import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // disable:false
  buildExcludes: [/middleware-manifest.json$/], // Exclude middleware manifest
});

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  // Note: Use 'next lint' command with --no-eslint flag instead
  // eslint config in next.config.js is no longer supported in Next.js 16

  images: {
    // domains: [
    //   "www.gstatic.com",
    //   "images.unsplash.com",
    //   "tailwindui.com",
    //   "www.facebook.com",
    //   "studentservices.jntuh.ac.in",
    //   "pagead2.googlesyndication.com",
    // ],

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
  // Turbopack is now stable and default in Next.js 16
  turbopack: {},

  serverExternalPackages: ['googleapis', 'google-auth-library'],

  webpack: (config, { isServer }) => {
    // This webpack config will be used only when building with --webpack flag
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },

  headers: async () => {
    return [
      {
        source: "/service-worker.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
};

// module.exports = nextConfig;
export default withPWA(nextConfig);
