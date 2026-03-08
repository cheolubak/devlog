---
name: review
description: 프로젝트 컨벤션 기반 코드 리뷰를 수행합니다
disable-model-invocation: true
---

# 코드 리뷰

`$ARGUMENTS`가 있으면 해당 파일을, 비어있으면 `git diff`로 변경된 파일을 대상으로 코드 리뷰를 수행한다.

## 리뷰 절차

1. **대상 파일 확인**
   - `$ARGUMENTS`가 있으면: 해당 파일을 읽는다
   - `$ARGUMENTS`가 비어있으면: `git diff --name-only`로 변경된 파일 목록을 확인하고, `git diff`로 변경 내용을 확인한다

2. **각 파일에 대해 아래 체크리스트를 검토한다**

## 체크리스트

### TypeScript
- [ ] strict mode 위반 없는지 (any 사용, 타입 단언 남용 등)
- [ ] type-only imports 사용: `import type { Foo } from 'bar'`
- [ ] 불필요한 타입 단언(`as`) 없는지

### React
- [ ] React default import 금지: `import React from 'react'` 사용 안 함
- [ ] React named imports만 사용: `import { useState } from 'react'`
- [ ] 클라이언트 컴포넌트에 `'use client'` 지시문 있는지
- [ ] Props interface가 적절히 정의되었는지

### 스타일
- [ ] CSS Modules 파일에 `@reference '@devlog/ui-config'` 있는지
- [ ] className 조합 시 `clsx` 사용하는지
- [ ] 80자 줄 길이 초과 없는지

### 코드 품질
- [ ] Zod로 외부 입력 검증하는지 (API 라우트의 params, body 등)
- [ ] 에러 처리가 적절한지
- [ ] 불필요한 console.log가 없는지 (log 모듈 사용 권장)
- [ ] 알파벳 순서 정렬 (imports, props, object keys)

### 보안
- [ ] SQL 인젝션 가능성 없는지
- [ ] XSS 가능성 없는지
- [ ] 민감한 정보(API 키, 토큰 등) 하드코딩 없는지
- [ ] 환경 변수 사용 시 `process.env.NEXT_PUBLIC_*` 패턴 준수

### 패키지 구조
- [ ] 새 파일이 올바른 패키지에 위치하는지
- [ ] index.ts 배럴 파일이 업데이트되었는지
- [ ] 순환 참조 없는지

## 출력 형식

```markdown
## 코드 리뷰 결과

### ✅ 양호한 점
- ...

### ⚠️ 개선 필요
- **[파일:라인]** 설명
  - 수정 제안: ...

### ❌ 반드시 수정
- **[파일:라인]** 설명
  - 수정 제안: ...
```
