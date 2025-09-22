/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // faster build
  eslint: {
    ignoreDuringBuilds: true, // ignores ESLint errors/warnings during deployment
  },
  images: {
    // Allow Next.js Image optimization for local/public images and external domains if needed
    domains: [], 
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    // Enables styled JSX if needed
    styledComponents: true,
  },
};

module.exports = nextConfig;
