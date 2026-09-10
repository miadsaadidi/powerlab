/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/battery/home-battery-size-calculator",
        destination: "/home-energy/home-battery-size-calculator",
        permanent: true,
      },
    ];
  },
  async headers() {
    const isNonProduction = Boolean(
      process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
    );

    const headers = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
    ];

    if (isNonProduction) {
      headers.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      });
    }

    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
};

export default nextConfig;
