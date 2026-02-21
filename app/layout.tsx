import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';
import '@devlog/ui-config';
import { GlobalModalProvider, Header, Loading } from '@devlog/components';
import localFont from 'next/font/local';
import Script from 'next/script';

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
      <body>
        <Script
          async
          crossOrigin='anonymous'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4531179937945968'
        />
        <FirebaseAnalyticsProvider />
        <QueryProvider>
          <GlobalModalProvider>
            <Header />
            {children}
            <Loading />
          </GlobalModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
