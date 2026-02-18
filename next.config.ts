import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
    imageSizes: [128, 256, 512, 1024, 2048],
    minimumCacheTTL: 2592000, // 30 days

    qualities: [75, 95],
    remotePatterns: [
      { hostname: 'images.pexels.com', protocol: 'https' },
      { hostname: 'cdn-images-1.medium.com', protocol: 'https' },
      { hostname: 'hyperconnect.github.io', protocol: 'https' },
    ],
  },
  output: 'standalone',
  reactCompiler: true,
  transpilePackages: [
    '@devlog/components',
    '@devlog/database',
    '@devlog/ui-config',
    '@devlog/request',
  ],
};

export default nextConfig;
