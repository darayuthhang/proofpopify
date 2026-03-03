/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Permissive headers for the embed script (loaded cross-origin by other sites)
      {
        source: "/embed.js",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          // {
          //   key: "Cache-Control",
          //   value: "public, max-age=300, s-maxage=300",
          // },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // Permissive CORS headers for the public API (used by embed script)
      {
        source: "/api/public/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      // Security headers for everything EXCEPT embed.js and public API
      {
        source: "/((?!embed\\.js|api/public).*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
