import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { GlobalModal, Loading } from '@devlog/components';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  BottomNavigation,
  Header,
  PostListFilter,
  PullToRefreshWrapper,
} from 'components';
import localFont from 'next/font/local';
import { FirebaseAnalyticsProvider } from 'providers/FirebaseAnalyticsProvider';

import './globals.css';
import '@devlog/ui-config';
import { I18nProvider } from 'providers/I18nProvider';
import { QueryProvider } from 'providers/QueryProvider';
import { ScrollProvider } from 'providers/ScrollProvider';
import { Suspense } from 'react';

const pretendard = localFont({
  display: 'swap',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'sans-serif',
  ],
  preload: true,
  src: './fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  description:
    '기술 블로그와 유튜브를 모아서 한눈에 볼 수 있어요. 웹 개발, AI 등 여러정보를 확인하실 수 있어요.',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { sizes: '32x32', type: 'image/png', url: '/favicon-32x32.png' },
      { sizes: '16x16', type: 'image/png', url: '/favicon-16x16.png' },
    ],
  },
  keywords: [
    'devlog',
    '기술블로그',
    '기술유튜브',
    '개발블로그',
    '개발유튜브',
    '개발',
  ],
  manifest: '/site.webmanifest',
  title: 'DEV CURATE - 기술 블로그 유튜브 모아',
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: true,
  viewportFit: 'cover',
  width: 'device-width',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      className={pretendard.className}
      lang='ko'
    >
      <body>
        <SpeedInsights />
        <FirebaseAnalyticsProvider />
        <ScrollProvider />
        <I18nProvider>
          <QueryProvider>
            <Header />
            <main>
              <PullToRefreshWrapper>{children}</PullToRefreshWrapper>
            </main>
            <BottomNavigation />
            <Suspense>
              <PostListFilter />
            </Suspense>
            <Loading />
            <GlobalModal />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
