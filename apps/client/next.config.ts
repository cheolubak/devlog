import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
    imageSizes: [128, 256, 512, 1024, 2048],
    minimumCacheTTL: 2592000,
    qualities: [75, 95],
    remotePatterns: [
      { hostname: 'pswufnwmoybbiggmwubt.supabase.co', protocol: 'https' },
    ],
  },
  reactCompiler: true,
  transpilePackages: [
    '@devlog/apis',
    '@devlog/components',
    '@devlog/firebase-config',
    '@devlog/ui-config',
    '@devlog/domains',
    '@devlog/hooks',
    '@devlog/logger',
    '@devlog/request',
    '@devlog/stores',
    '@devlog/utils',
  ],
};

export default nextConfig;
