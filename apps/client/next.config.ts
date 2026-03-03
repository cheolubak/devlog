import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_LOGIN_CALLBACK_URL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
    GOOGLE_LOGIN_CLIENT_ID: process.env.GOOGLE_LOGIN_CLIENT_ID,
    GOOGLE_LOGIN_CLIENT_SECRET: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    KAKAO_CALLBACK_URL: process.env.KAKAO_CALLBACK_URL,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    NAVER_LOGIN_CALLBACK_URL: process.env.NAVER_LOGIN_CALLBACK_URL,
    NAVER_LOGIN_CLIENT_ID: process.env.NAVER_LOGIN_CLIENT_ID,
    NAVER_LOGIN_CLIENT_SECRET: process.env.NAVER_LOGIN_CLIENT_SECRET,
  },
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
