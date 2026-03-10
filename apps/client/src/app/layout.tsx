import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { GlobalModal, Loading } from '@devlog/components';

import './globals.css';
import '@devlog/ui-config';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  BottomNavigation,
  Header,
  PostListFilter,
  PullToRefreshWrapper,
} from 'components';
import localFont from 'next/font/local';
import Head from 'next/head';
import { FirebaseAnalyticsProvider } from 'providers/FirebaseAnalyticsProvider';
import { I18nProvider } from 'providers/I18nProvider';
import { QueryProvider } from 'providers/QueryProvider';
import { ScrollProvider } from 'providers/ScrollProvider';
import { Suspense } from 'react';

const pretandard = localFont({
  src: './fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  description:
    '기술 블로그와 유튜브를 모아서 한눈에 볼 수 있어요. 웹 개발, AI 등 여러정보를 확인하실 수 있어요.',
  keywords: [
    'devlog',
    '기술블로그',
    '기술유튜브',
    '개발블로그',
    '개발유튜브',
    '개발',
  ],
  title: 'DEV CURATE - 기술 블로그 유튜브 모아',
};

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
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
      className={pretandard.className}
      lang='ko'
    >
      <Head>
        <script
          async
          crossOrigin='anonymous'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4531179937945968'
        />
        <link
          href='/apple-touch-icon.png'
          rel='apple-touch-icon'
          sizes='180x180'
        />
        <link
          href='/favicon-32x32.png'
          rel='icon'
          sizes='32x32'
          type='image/png'
        />
        <link
          href='/favicon-16x16.png'
          rel='icon'
          sizes='16x16'
          type='image/png'
        />
        <link
          href='/site.webmanifest'
          rel='manifest'
        />
      </Head>
      <body>
        <SpeedInsights />
        <FirebaseAnalyticsProvider />
        <ScrollProvider />
        <I18nProvider>
          <QueryProvider>
            <Header />
            <PullToRefreshWrapper>{children}</PullToRefreshWrapper>
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
