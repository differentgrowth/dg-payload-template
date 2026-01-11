import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Security headers configuration
const securityHeaders = [
  {
    // Prevent DNS prefetching to third parties
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    // Enable HSTS (HTTP Strict Transport Security)
    // max-age: 2 years, includeSubDomains, preload for browser preload list
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Prevent clickjacking by controlling iframe embedding
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevent MIME type sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information sent with requests
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Control browser features and APIs
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=(self)",
      "interest-cohort=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
      "usb=()",
      "payment=(self)",
      "fullscreen=(self)",
      "browsing-topics=()",
    ].join(", "),
  },
  {
    // XSS protection (legacy, but still useful for older browsers)
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    // Content Security Policy
    key: "Content-Security-Policy",
    value: [
      // Default to self for all resources
      "default-src 'self'",
      // Scripts: self, inline (for Next.js), eval (for dev), and trusted CDNs
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
      // Styles: self, inline (for CSS-in-JS)
      "style-src 'self' 'unsafe-inline'",
      // Images: self, data URIs, and common image CDNs
      "img-src 'self' data: blob: https: http:",
      // Fonts: self and Google Fonts
      "font-src 'self' data: https://fonts.gstatic.com",
      // Connect: API calls, analytics, and WebSocket (for dev)
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com wss: ws:",
      // Frames: self for embedding
      "frame-src 'self' https://www.google.com https://www.youtube.com",
      // Frame ancestors: prevent embedding except on same origin
      "frame-ancestors 'self'",
      // Form actions: self only
      "form-action 'self'",
      // Base URI: self only
      "base-uri 'self'",
      // Object and embed: none (no plugins)
      "object-src 'none'",
      // Upgrade insecure requests in production
      process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
    ]
      .filter(Boolean)
      .join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.*.*:3000", "http://localhost:*"],
  experimental: {
    browserDebugInfoInTerminal: true,
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  images: {
    qualities: [80, 100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "") as "https",
        };
      }),
    ],
  },
  async redirects() {
    return [
      {
        destination: "/ie-incompatible.html",
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(.*Trident.*)", // all ie browsers
          },
        ],
        permanent: false,
        source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
