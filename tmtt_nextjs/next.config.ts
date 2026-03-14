import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || (isProd ? "https://omendapipaysglobel.online" : "http://localhost:3000");
const piSandbox = process.env.NEXT_PUBLIC_PI_SANDBOX || (isProd ? "false" : "true");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // Use the production HTTPS URL as asset prefix in production
  ...(isProd && { assetPrefix: appUrl }),
  env: {
    NEXT_PUBLIC_APP_URL: appUrl,
    NEXT_PUBLIC_PI_SANDBOX: piSandbox,
  },
  // Serve pi.toml at the path Pi Server expects: /.well-known/pi.toml
  async rewrites() {
    return [
      {
        source: "/.well-known/pi.toml",
        destination: "/api/well-known/pi-toml",
      },
    ];
  },

  // Enforce HTTPS in headers (nginx already adds HSTS, but belt-and-suspenders)
  async headers() {
    if (!isProd) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://*.minepi.com https://minepi.com" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
