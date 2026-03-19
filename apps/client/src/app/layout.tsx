import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { GlobalModal, Loading, Toast } from '@devlog/components';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  BottomNavigation,
  Header,
  PostListFilter,
  PullToRefreshWrapper,
} from 'components';
import {
  FALLBACK_LANGUAGE,
  I18N_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from 'i18n.constants';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { FirebaseAnalyticsProvider } from 'providers/FirebaseAnalyticsProvider';
import { I18nProvider } from 'providers/I18nProvider';

import './globals.css';
import '@devlog/ui-config';
import { QueryProvider } from 'providers/QueryProvider';
import { ScrollProvider } from 'providers/ScrollProvider';
import { Suspense } from 'react';

const pretendardLatin = localFont({
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
  src: [
    {
      path: './fonts/PretendardVariable-latin.woff2',
      style: 'normal',
      weight: '45 920',
    },
  ],
});

const pretendardKorean = localFont({
  display: 'swap',
  preload: false,
  src: [
    {
      path: './fonts/PretendardVariable-korean.woff2',
      style: 'normal',
      weight: '45 920',
    },
  ],
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
  const cookieStore = await cookies();
  const langCookie = cookieStore.get(I18N_STORAGE_KEY)?.value;
  const lang =
    langCookie &&
    (SUPPORTED_LANGUAGES as readonly string[]).includes(langCookie)
      ? langCookie
      : FALLBACK_LANGUAGE;

  return (
    <html
      className={`${pretendardLatin.className} ${pretendardKorean.className}`}
      lang={lang}
    >
      <body>
        <SpeedInsights />
        <FirebaseAnalyticsProvider />
        <ScrollProvider />
        <I18nProvider initialLang={lang}>
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
            <Toast />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
