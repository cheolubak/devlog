import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import '@devlog/ui-config';
import {
  BottomNavigation,
  GlobalModalProvider,
  Header,
  Loading,
} from '@devlog/components';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import Head from 'next/head';

import { FirebaseAnalyticsProvider } from '@/providers/FirebaseAnalyticsProvider';
import { QueryProvider } from '@/providers/QueryProvider';

const pretandard = localFont({
  src: './fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  description: '기술 블로그를 모아서 한눈에 볼 수 있어요.',
  title: 'DEVLOG - 기술블로그를 한눈에',
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
        <QueryProvider>
          <GlobalModalProvider>
            <Header />
            {children}
            <BottomNavigation />
            <Loading />
          </GlobalModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
