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
};

export default nextConfig;
