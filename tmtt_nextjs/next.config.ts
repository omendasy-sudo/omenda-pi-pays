import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  // Production: set your domain for CORS and metadata
  ...(process.env.NEXT_PUBLIC_APP_URL && {
    assetPrefix: process.env.NEXT_PUBLIC_APP_URL,
  }),
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NEXT_PUBLIC_PI_SANDBOX: process.env.NEXT_PUBLIC_PI_SANDBOX || "true",
  },
};

export default nextConfig;
