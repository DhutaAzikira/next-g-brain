import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_DESC: process.env.NEXT_PUBLIC_SITE_DESC,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_API_URL: process.env.NEXT_PUBLIC_WS_API_URL,
    NEXT_PUBLIC_WS_HOST: process.env.NEXT_PUBLIC_WS_HOST,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "xmzbujijabgznvosqrec.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },

  serverRuntimeConfig: {
    maxHeaderSize: 32768, // 32KB instead of default 8KB
  },
  webpack(config) {
    const svgr = {
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    };
    config.module.rules.push(svgr);
    return config;
  },
  productionBrowserSourceMaps: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
