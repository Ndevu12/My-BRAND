/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  
  /**
   * URL Rewrites for Indexable Section Pages
   * Maps clean URLs to query parameters for SEO
   * Example: /about -> /?section=about
   */
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/?section=about',
      },
      {
        source: '/skills',
        destination: '/?section=skills',
      },
      {
        source: '/projects',
        destination: '/?section=projects',
      },
      {
        source: '/experience',
        destination: '/?section=experience',
      },
      {
        source: '/contact',
        destination: '/?section=contact',
      },
    ];
  },
};

module.exports = nextConfig;
