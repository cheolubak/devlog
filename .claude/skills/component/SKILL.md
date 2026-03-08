---
name: component
description: packages/components에 새 공유 UI 컴포넌트를 생성합니다
---

# 공유 컴포넌트 생성

`$ARGUMENTS`를 컴포넌트 이름으로 사용하여 `packages/components/src/`에 새 UI 컴포넌트를 생성한다.

## 생성할 파일 구조

```
packages/components/src/{ComponentName}/
├── {ComponentName}.tsx
├── {ComponentName}.module.css
└── index.ts
```

## 컴포넌트 파일 (`{ComponentName}.tsx`) 패턴

```tsx
'use client';

import type { ComponentProps } from 'react';

import { clsx } from 'clsx';

import styles from './{ComponentName}.module.css';

interface {ComponentName}Props extends ComponentProps<'적절한HTML요소'> {
  // 컴포넌트 고유 props
}

export const {ComponentName} = ({
  className,
  ...props
}: {ComponentName}Props) => {
  return (
    <div
      {...props}
      className={clsx(styles.컨테이너클래스, className)}
    />
  );
};
```

## CSS Modules 파일 (`{ComponentName}.module.css`) 패턴

```css
@reference '@devlog/ui-config';

.컨테이너클래스 {
    @apply relative;
}
```

## 배럴 파일 (`index.ts`) 패턴

```ts
export * from './{ComponentName}';
```

## 필수 규칙

1. **`'use client'` 지시문**: 파일 최상단에 반드시 추가
2. **type-only imports**: 타입은 `import type { ... } from '...'` 사용
3. **React named imports**: `import { useState } from 'react'` (default import 금지)
4. **clsx**: className 조합 시 반드시 `clsx` 사용
5. **CSS Modules**: `@reference '@devlog/ui-config'`을 CSS 파일 최상단에 추가, Tailwind CSS 유틸리티 클래스 사용
6. **Props interface**: `ComponentProps<'HTML요소'>` 확장, 컴포넌트에 맞는 HTML 요소 선택
7. **스프레드 props**: `{...props}`로 나머지 props 전달
8. **index.ts 재수출**: `packages/components/src/index.ts`에 새 컴포넌트 export 추가

## index.ts 업데이트

`packages/components/src/index.ts`에 알파벳 순서로 추가:
```ts
export * from './{ComponentName}';
```

## 참고 사항

- Prettier: 80자 줄 길이, single quote, trailing comma
- 속성(props)은 알파벳 순서로 정렬
- 내부 컴포넌트 import 시 상대 경로 사용 (`../Icon` 등)
