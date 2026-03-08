---
name: page
description: Next.js App Router에 새 페이지를 생성합니다
---

# 새 페이지 생성

`$ARGUMENTS`를 페이지 경로로 사용하여 `apps/client/src/app/`에 새 Next.js App Router 페이지를 생성한다.

예: `$ARGUMENTS`가 `channels/[id]/settings`이면 `apps/client/src/app/channels/[id]/settings/page.tsx`를 생성한다.

## 생성할 파일

### page.tsx (서버 컴포넌트)

```tsx
import type { Metadata } from 'next';

import { Typography } from '@devlog/components';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata: Metadata = {
  description: '페이지 설명',
  title: '페이지 제목 - DEV CURATE',
};

export default async function 페이지이름Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    // 데이터 패칭 로직

    return (
      <Suspense>
        {/* 페이지 컨텐츠 */}
      </Suspense>
    );
  } catch (e) {
    console.error('=======페이지이름 Page Error=======');
    if (e instanceof Error) {
      console.error('Message:', e.message);
      console.error('Stack:', e.stack);
    } else {
      console.error('Unknown Error:', e);
    }

    return (
      <div className='p-10 text-center'>
        <Typography variants='title-large'>
          오류가 발생했습니다.
        </Typography>
        <Typography>
          {e instanceof Error ? e.message : '알 수 없는 오류'}
        </Typography>
      </div>
    );
  }
}
```

### layout.tsx (필요한 경우에만)

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: '레이아웃 설명',
  title: '레이아웃 제목',
};

export default function 레이아웃이름Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
```

## 필수 규칙

1. **서버 컴포넌트**: page.tsx는 기본적으로 서버 컴포넌트 (async function)
2. **클라이언트 컴포넌트 분리**: 인터랙티브 UI는 별도 클라이언트 컴포넌트로 분리하여 `apps/client/src/components/`에 생성
3. **type-only imports**: 타입은 `import type { ... } from '...'` 사용
4. **React named imports**: `import { Suspense } from 'react'` (default import 금지)
5. **Next.js 16 params**: `params`와 `searchParams`는 `Promise` 타입이므로 `await` 필요
6. **ISR 설정**: `export const revalidate = 3600` 포함 (1시간)
7. **에러 처리**: try-catch로 감싸고 에러 UI 제공
8. **Metadata**: `export const metadata: Metadata` 설정
9. **데이터 패칭**: 서버 컴포넌트에서 직접 `fetchApi` 또는 전용 API 함수 사용
10. **Prettier**: 80자 줄 길이, single quote, trailing comma
