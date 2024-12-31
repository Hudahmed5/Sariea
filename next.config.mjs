/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.WORDPRESS_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      'sariea.com',
      'source.unsplash.com',
      'images.unsplash.com'
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  },
};

export default nextConfig;
