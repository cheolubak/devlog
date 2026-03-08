---
name: domain
description: Zod 스키마 기반 도메인 타입을 생성합니다
---

# 도메인 타입 생성

`$ARGUMENTS`를 도메인 이름 및 필드 설명으로 사용하여 `packages/domains/src/`에 새 Zod 스키마 + TypeScript 타입을 생성한다.

## 생성할 파일

```
packages/domains/src/{DomainName}.ts
```

## 도메인 파일 패턴

```ts
import { z } from 'zod';

export const {domainName}Schema = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.string(),
  // 필드 정의...
});

export type {DomainName} = z.infer<typeof {domainName}Schema>;
```

## Zod 스키마 작성 가이드

### 자주 사용하는 타입

```ts
// 문자열
z.string()
z.string().nullish()    // null | undefined 허용
z.uuid()                // UUID 검증

// 숫자
z.number().int().positive()     // 양의 정수
z.number().int().nonnegative()  // 0 이상 정수
z.coerce.number()               // 문자열 → 숫자 변환

// 불리언
z.boolean()
z.boolean().default(false)

// 날짜
z.date()
z.string()  // ISO 날짜 문자열

// 열거형
z.enum(['OPTION_A', 'OPTION_B', 'OPTION_C'])

// 배열
z.array(z.object({ ... }))

// 중첩 객체
z.object({
  id: z.number().int().positive(),
  name: z.string(),
})

// 선택적 / nullable
z.string().nullish()    // string | null | undefined
z.string().optional()   // string | undefined
z.string().nullable()   // string | null

// 기본값
z.number().int().nonnegative().default(0)
z.boolean().default(false)

// unknown
z.unknown().nullish()
```

### 기존 프로젝트 스키마 참고 예시

```ts
// PostList 스키마 (packages/domains/src/PostList.ts)
export const postListSchema = z.object({
  description: z.string(),
  id: z.uuid(),
  imageUrl: z.string().nullish(),
  isBookmark: z.boolean().default(false),
  originalPublishedAt: z.date(),
  postTags: z.array(
    z.object({
      createdAt: z.date(),
      postId: z.uuid(),
      tag: z.object({
        id: z.number().int().positive(),
        name: z.string(),
      }),
      tagId: z.number().int().positive(),
    }),
  ),
  source: z.object({ ... }),
  sourceUrl: z.string(),
  title: z.string(),
  viewCount: z.number().int().nonnegative().default(0),
});

export type PostList = z.infer<typeof postListSchema>;
```

## 필수 규칙

1. **네이밍**: 스키마는 `camelCase + Schema` (예: `userSchema`), 타입은 `PascalCase` (예: `User`)
2. **z.infer**: 타입은 반드시 `z.infer<typeof schema>`로 추출
3. **필드 순서**: 알파벳 순서로 정렬
4. **index.ts 업데이트**: `packages/domains/src/index.ts`에 알파벳 순서로 export 추가
   ```ts
   export * from './{DomainName}';
   ```
5. **Prettier**: 80자 줄 길이, single quote, trailing comma
