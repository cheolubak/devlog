---
name: api-route
description: Next.js API 라우트(BFF)를 생성합니다
---

# API 라우트 생성

`$ARGUMENTS`를 참고하여 `apps/client/src/app/api/`에 새 API 라우트를 생성한다.

## 생성할 파일

```
apps/client/src/app/api/{경로}/route.ts
```

## route.ts 패턴

### 기본 GET 라우트 (bffTemplate 사용)

```ts
import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { searchParams } = req.nextUrl;

    // Zod로 쿼리 파라미터 검증
    const page = z.coerce
      .number()
      .int()
      .nonnegative()
      .default(0)
      .parse(searchParams.get('page'));

    try {
      log.info('GET 리소스이름', { page });

      const headers: Record<string, string> = {
        sessionId,
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const res = await externalApi.get<응답타입>('/endpoint', {
        headers,
        params: { offset: page },
      });

      return NextResponse.json(res);
    } catch (e) {
      log.error('GET 리소스이름', {
        error: JSON.stringify(e),
        page,
      });
      return NextResponse.json(
        { message: 'Error!!' },
        { status: 500 },
      );
    }
  });
}
```

### 동적 세그먼트가 있는 POST 라우트

```ts
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;

    const headers: Record<string, string> = {
      sessionId,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    await externalApi.post(`/endpoint/${id}`, null, {
      headers,
    });

    // 필요 시 ISR 재검증
    revalidateTag('태그이름', { expire: 0 });
    revalidatePath('/관련경로');

    return NextResponse.json({});
  });
}
```

### 인증 불필요한 단순 GET 라우트

```ts
import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await externalApi.get<응답타입>('/endpoint');

  return NextResponse.json(data);
}
```

## 필수 규칙

1. **bffTemplate 사용**: 인증이 필요한 라우트는 반드시 `bffTemplate` 헬퍼 사용
2. **Zod 검증**: 쿼리 파라미터, 요청 본문은 `zod`로 검증
3. **externalApi**: 외부 API 호출은 `@devlog/request`의 `externalApi` 사용
4. **NextResponse.json()**: 응답은 `NextResponse.json()` 사용
5. **@devlog/logger**: 로깅은 `log.info()`, `log.error()` 사용
6. **type-only imports**: `import type { NextRequest } from 'next/server'`
7. **Next.js 16 params**: 동적 세그먼트의 `params`는 `Promise` 타입, `await` 필요
8. **에러 처리**: try-catch로 감싸고 `log.error()` 호출 후 500 응답
9. **ISR 재검증**: 데이터 변경 시 `revalidateTag()` / `revalidatePath()` 호출
10. **Prettier**: 80자 줄 길이, single quote, trailing comma
