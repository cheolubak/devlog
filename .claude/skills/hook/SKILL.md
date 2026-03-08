---
name: hook
description: 커스텀 React 훅을 생성합니다
---

# 커스텀 훅 생성

`$ARGUMENTS`를 훅 이름 및 용도로 사용하여 새 커스텀 훅을 생성한다.

## 생성 위치 결정

- **공유 훅** (여러 곳에서 재사용): `packages/hooks/src/{hookName}.ts`
- **앱 전용 훅** (client 앱에서만 사용): `apps/client/src/hooks/{hookName}.ts`

## React Query 훅 패턴

### useQuery 패턴

```ts
'use client';

import type { 응답타입 } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { useQuery } from '@tanstack/react-query';

export const use리소스 = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return fetchApi.get<응답타입>('/endpoint');
    },
    queryKey: ['리소스-키'],
  });

  return { data, isLoading };
};
```

### useInfiniteQuery 패턴

```ts
'use client';

import type { 리소스타입, ResponseList } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import { useInfiniteQuery } from '@tanstack/react-query';

export const use리소스List = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      getNextPageParam: (lastPage: ResponseList<리소스타입>) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        return fetchApi.get<ResponseList<리소스타입>>(
          '/endpoint',
          { params: { page: pageParam } },
        );
      },
      queryKey: ['리소스-list'],
    });

  return { data, fetchNextPage, hasNextPage, isLoading };
};
```

### useMutation 패턴

```ts
'use client';

import type { 리소스타입 } from '@devlog/domains';

import { fetchApi } from '@devlog/request';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const use리소스Action = (리소스: 리소스타입) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () =>
      fetchApi.post(`/endpoint/${리소스.id}`),
    mutationKey: ['리소스', 'action', 리소스.id],
    onError: () => {
      // 낙관적 업데이트 롤백
    },
    onMutate: () => {
      // 낙관적 업데이트
    },
  });

  return mutate;
};
```

## 일반 훅 패턴

```ts
import { useCallback, useState } from 'react';

export const use훅이름 = (초기값?: 타입) => {
  const [state, setState] = useState(초기값);

  const handler = useCallback(() => {
    // 로직
  }, []);

  return { handler, state };
};
```

## 필수 규칙

1. **`'use client'`**: 클라이언트 훅에는 반드시 추가 (React Query, useState 등 사용 시)
2. **type-only imports**: 타입은 `import type { ... } from '...'` 사용
3. **React named imports**: `import { useState } from 'react'` (default import 금지)
4. **객체 반환**: 훅의 반환값은 객체 형태 `{ data, isLoading }` 선호
5. **fetchApi 사용**: 클라이언트 사이드 API 호출은 `@devlog/request`의 `fetchApi` 사용
6. **queryKey 배열**: React Query의 queryKey는 문자열 배열로 구성
7. **index.ts 업데이트**: 해당 패키지/디렉토리의 `index.ts`에 export 추가
   ```ts
   export * from './{hookName}';
   ```
8. **Prettier**: 80자 줄 길이, single quote, trailing comma
