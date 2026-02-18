# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트를 이해하는 데 필요한 컨텍스트를 제공합니다.

## 프로젝트 개요

Next.js 16 기반의 개발 블로그 프로젝트입니다. pnpm workspaces를 사용한 모노레포 구조로 구성되어 있습니다.

## 기술 스택

- **프레임워크**: Next.js 16.1.1, React 19.2.1
- **패키지 매니저**: pnpm 10.28.1
- **언어**: TypeScript (strict mode)
- **스타일링**: CSS Modules, Sass, Tailwind CSS 4
- **상태 관리**: @tanstack/react-query (서버 상태)
- **데이터베이스**: PostgreSQL (pg), Supabase SSR
- **스키마 검증**: Zod 4

## 프로젝트 구조

```
app/                    # Next.js App Router
├── api/               # API 라우트
├── layout.tsx         # 루트 레이아웃
└── page.tsx           # 홈페이지

packages/              # 모노레포 패키지
├── components/        # @devlog/components - React 컴포넌트
├── apis/              # @devlog/apis - API 호출 함수
├── domains/           # @devlog/domain - 타입/스키마 정의
├── request/           # @devlog/request - HTTP 클라이언트
├── utils/             # @devlog/utils - 유틸리티 함수
└── configs/ui/        # @devlog/ui-config - CSS 리셋

providers/             # 클라이언트 프로바이더 (React Query 등)
```

## 주요 명령어

```bash
pnpm dev      # 개발 서버 (localhost:3000)
pnpm build    # 프로덕션 빌드
pnpm start    # 빌드된 앱 실행
pnpm lint     # ESLint 실행
```

## 코드 컨벤션

### TypeScript
- Type-only imports 강제: `import type { Foo } from 'bar'`
- React default import 금지: `import React from 'react'` 사용 불가
- strict mode 활성화

### React
- React 19 사용 - named imports만 사용
- Client Components는 `'use client'` 지시문 필수

### 스타일
- Prettier: 80자 줄 길이, single quote, trailing comma
- Tab width: 2 spaces

## 환경 변수

```
NEXT_PUBLIC_DYNAMIC_API_URL    # Next.js API 엔드포인트
NEXT_PUBLIC_EXTERNAL_API_URL   # 외부 API 엔드포인트
NEXT_PUBLIC_SUPABASE_URL       # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY  # Supabase 공개 키
DATABASE_URL                   # PostgreSQL 연결 문자열
```

## 아키텍처 특징

- **ISR**: 1시간 캐시 + on-demand 재검증 (`/api/revalidate`)
- **가상 스크롤**: @tanstack/react-virtual로 대량 데이터 최적화
- **Standalone 빌드**: Docker 배포 대응

## 주요 파일 위치

| 역할 | 경로 |
|------|------|
| Next.js 설정 | `next.config.ts` |
| ESLint 설정 | `eslint.config.mjs` |
| Prettier 설정 | `.prettierrc.js` |
| 워크스페이스 설정 | `pnpm-workspace.yaml` |
| API 라우트 | `app/api/posts/[page]/route.ts` |
| 컴포넌트 | `packages/components/src/` |
| 타입 정의 | `packages/domains/src/` |
