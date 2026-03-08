---
name: test
description: 기존 코드에 대한 Vitest 단위 테스트를 작성합니다
---

# 테스트 작성

`$ARGUMENTS`를 테스트 대상 파일 경로로 사용하여 Vitest 단위 테스트를 작성한다.

## 절차

1. `$ARGUMENTS`로 지정된 대상 파일을 읽는다
2. 기존 테스트 파일이 있는지 확인한다 (같은 디렉토리의 `*.test.ts`)
3. 테스트 파일을 생성하거나 기존 파일에 테스트를 추가한다

## 테스트 파일 위치

대상 파일과 같은 디렉토리에 `{파일이름}.test.ts`로 생성한다.

```
packages/domains/src/PostList.ts      → packages/domains/src/PostList.test.ts
packages/utils/src/parseToc.ts        → packages/utils/src/parseToc.test.ts
packages/request/src/request.ts       → packages/request/src/request.test.ts
```

## 테스트 파일 패턴

```ts
import { describe, expect, it } from 'vitest';

import { 테스트대상 } from './파일이름';

describe('테스트대상', () => {
  it('정상 동작을 검증한다', () => {
    const result = 테스트대상(입력);
    expect(result).toBe(기대값);
  });

  it('엣지 케이스를 처리한다', () => {
    expect(() => 테스트대상(잘못된입력)).toThrow();
  });
});
```

### Zod 스키마 테스트 패턴

```ts
import { describe, expect, it } from 'vitest';

import { 스키마이름 } from './파일이름';

const validData = {
  // 유효한 테스트 데이터
};

describe('스키마이름', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = 스키마이름.parse(validData);
    expect(result.필드).toBe(기대값);
  });

  it('선택적 필드가 null이어도 파싱한다', () => {
    const result = 스키마이름.parse({
      ...validData,
      optionalField: null,
    });
    expect(result.optionalField).toBeNull();
  });

  it('필수 필드가 누락되면 에러를 던진다', () => {
    const { requiredField: _, ...withoutField } = validData;
    expect(() => 스키마이름.parse(withoutField)).toThrow();
  });

  it('잘못된 타입이면 에러를 던진다', () => {
    expect(() =>
      스키마이름.parse({ ...validData, id: 'not-a-uuid' }),
    ).toThrow();
  });
});
```

## 필수 규칙

1. **Vitest**: `import { describe, expect, it } from 'vitest'` 사용
2. **파일명**: `{대상파일}.test.ts`
3. **한글 테스트명**: `it('유효한 데이터를 파싱한다', ...)` 형식으로 한글 사용
4. **describe/it 구조**: `describe`로 테스트 대상 그룹핑, `it`으로 개별 케이스
5. **테스트 실행 확인**: 작성 후 `pnpm test` 실행하여 통과 확인
6. **Prettier**: 80자 줄 길이, single quote, trailing comma
