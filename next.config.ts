import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : "",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://connect.facebook.net",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
  ]
    .filter(Boolean)
    .join(" "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://www.google.com",
    "https://www.google.co.in",
    "https://www.googleadservices.com",
    "https://googleads.g.doubleclick.net",
    "https://www.facebook.com",
    "https://connect.facebook.net",
    "https://*.facebook.com",
    "https://www.clarity.ms",
    "https://*.clarity.ms",
  ].join(" "),
  [
    "frame-src 'self'",
    "https://www.google.com",
    "https://maps.google.com",
    "https://www.googletagmanager.com",
    "https://cal.com",
    "https://*.cal.com",
    "https://calendly.com",
    "https://*.calendly.com",
  ].join(" "),
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/shipping-policy", destination: "/service-delivery-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
      { source: "/cancellation-policy", destination: "/refund-policy", permanent: true },
      { source: "/login", destination: "/track", permanent: false },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
