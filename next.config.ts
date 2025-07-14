import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone
  output: "standalone",
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
};

export default nextConfig;
