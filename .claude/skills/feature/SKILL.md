---
name: feature
description: 도메인 타입 + API + 훅 + 컴포넌트를 한 번에 생성하는 풀스택 기능 스캐폴딩
---

# 풀스택 기능 스캐폴딩

`$ARGUMENTS`를 기능 이름 및 설명으로 사용하여 필요한 모든 레이어의 코드를 한 번에 생성한다.

## 생성 순서

다음 순서로 각 레이어의 코드를 생성한다:

### 1. 도메인 타입 (`packages/domains/src/`)

```ts
import { z } from 'zod';

export const {리소스}Schema = z.object({
  // 필드 정의
});

export type {리소스} = z.infer<typeof {리소스}Schema>;
```

- `packages/domains/src/index.ts`에 export 추가

### 2. API 라우트 (`apps/client/src/app/api/`)

```ts
import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    // API 로직
  });
}
```

### 3. API 함수 (`packages/apis/src/`)

```ts
import type { 리소스타입 } from '@devlog/domains';

import { fetchApi } from '@devlog/request';

export const get리소스 = (params?: Record<string, string>) => {
  return fetchApi.get<리소스타입>('/api-endpoint', { params });
};
```

- `packages/apis/src/index.ts`에 export 추가

### 4. 커스텀 훅 (`apps/client/src/hooks/`)

```ts
'use client';

import type { 리소스타입 } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { useQuery } from '@tanstack/react-query';

export const use리소스 = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchApi.get<리소스타입>('/endpoint'),
    queryKey: ['리소스'],
  });

  return { data, isLoading };
};
```

- `apps/client/src/hooks/index.ts`에 export 추가

### 5. 컴포넌트 (`packages/components/src/` 또는 `apps/client/src/components/`)

공유 UI 컴포넌트는 `packages/components/src/`에, 앱 전용 컴포넌트는 `apps/client/src/components/`에 생성한다.

```tsx
'use client';

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import styles from './{ComponentName}.module.css';

interface {ComponentName}Props extends ComponentProps<'div'> {
  // props
}

export const {ComponentName} = ({
  className,
  ...props
}: {ComponentName}Props) => {
  return (
    <div
      {...props}
      className={clsx(styles.container, className)}
    />
  );
};
```

CSS Modules:
```css
@reference '@devlog/ui-config';

.container {
    @apply relative;
}
```

### 6. 페이지 (필요한 경우)

```tsx
import type { Metadata } from 'next';

import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata: Metadata = {
  description: '페이지 설명',
  title: '페이지 제목 - DEV CURATE',
};

export default async function 페이지Page() {
  try {
    // 서버 사이드 데이터 패칭
    return (
      <Suspense>
        {/* 컨텐츠 */}
      </Suspense>
    );
  } catch (e) {
    // 에러 처리
  }
}
```

## 필수 규칙 (모든 레이어 공통)

1. **type-only imports**: `import type { ... } from '...'`
2. **React named imports**: default import 금지
3. **`'use client'`**: 클라이언트 컴포넌트/훅에 반드시 추가
4. **index.ts 업데이트**: 각 패키지의 배럴 파일에 알파벳 순서로 export 추가
5. **Zod 검증**: API 라우트의 외부 입력은 Zod로 검증
6. **fetchApi / externalApi**: 클라이언트는 `fetchApi`, 서버(API 라우트)는 `externalApi`
7. **CSS Modules**: `@reference '@devlog/ui-config'`, Tailwind 유틸리티 사용
8. **Prettier**: 80자 줄 길이, single quote, trailing comma

## 절차

1. 사용자에게 기능 요구사항을 확인한다
2. 필요한 레이어를 판단한다 (모든 레이어가 항상 필요한 것은 아님)
3. 위 순서대로 코드를 생성한다
4. 각 레이어의 index.ts 배럴 파일을 업데이트한다
5. 생성된 파일 목록을 보고한다
