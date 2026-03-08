# Dev Blog

### 서비스 URL

https://devcurate.xyz

Next.js 16 기반의 개발 블로그 프로젝트입니다. pnpm workspaces와 Turborepo를 사용한 모노레포 구조로 구성되어 있습니다.

## 기술 스택

| 분류          | 기술                                |
|-------------|-----------------------------------|
| 프레임워크       | Next.js 16, React 19              |
| 언어          | TypeScript (strict mode)          |
| 패키지 매니저     | pnpm 10 (workspaces)              |
| 빌드 시스템      | Turborepo                         |
| 스타일링        | CSS Modules, Sass, Tailwind CSS 4 |
| 서버 상태 관리    | TanStack React Query              |
| 클라이언트 상태 관리 | Zustand, Jotai                    |
| 데이터베이스      | PostgreSQL (Supabase)             |
| 인증          | Firebase                          |
| 스키마 검증      | Zod 4                             |
| 모니터링        | OpenTelemetry (Grafana)           |
| E2E 테스트     | Cypress                           |
| 단위 테스트      | Vitest                            |
| 배포          | Vercel                            |

## 프로젝트 구조

```
apps/
└── client/                # Next.js 앱 (@devlog/client)
    ├── src/
    │   ├── app/           # App Router (pages, API routes)
    │   ├── apis/          # 앱 전용 API 함수
    │   ├── components/    # 앱 전용 컴포넌트
    │   ├── constants/     # 상수 정의
    │   ├── helper/        # 헬퍼 함수 (JWT, 쿠키 등)
    │   ├── hooks/         # 앱 전용 훅
    │   └── providers/     # React Query 등 프로바이더
    ├── cypress/           # E2E 테스트
    └── public/            # 정적 파일

packages/                  # 공유 패키지
├── apis/                  # @devlog/apis - API 호출 함수
├── components/            # @devlog/components - 공통 UI 컴포넌트
├── configs/
│   ├── firebase/          # @devlog/firebase-config - Firebase 설정
│   └── ui/                # @devlog/ui-config - CSS 리셋 등 설정
├── domains/               # @devlog/domains - 타입/스키마 정의
├── hooks/                 # @devlog/hooks - 공통 React 훅
├── logger/                # @devlog/logger - OpenTelemetry 로깅
├── request/               # @devlog/request - HTTP 클라이언트
├── stores/                # @devlog/stores - 전역 상태 관리 (Jotai)
└── utils/                 # @devlog/utils - 유틸리티 함수
```

### 앱 라우트 (`apps/client/src/app`)

| 경로            | 설명                                             |
|---------------|------------------------------------------------|
| `/`           | 홈페이지                                           |
| `/admin/*`    | 관리자 대시보드                                       |
| `/auth/*`     | OAuth 콜백 (Google, GitHub, Kakao, Naver)        |
| `/channels/*` | 채널 관련 페이지                                      |
| `/mypage/*`   | 마이페이지, 북마크                                     |
| `/policy/*`   | 정책 페이지                                         |
| `/api/*`      | API 라우트 (posts, auth, bookmarks, revalidate 등) |

### 주요 UI 컴포넌트 (`packages/components`)

Button, FloatingMenu, GlobalModal, Icon, IconButton, InfiniteScroll, Input, InputGroup, Loading, Modal, Overlay, Ripple,
Skeleton, Switch, Tabs, Typography

## 시작하기

### 사전 요구사항

- Node.js 24+
- pnpm 10+

### 설치

```bash
pnpm install
```

### 환경 변수

`apps/client/.env` 파일을 생성하고 아래 변수를 설정합니다:

```env
NEXT_PUBLIC_DYNAMIC_API_URL=           # Next.js API 엔드포인트
NEXT_PUBLIC_EXTERNAL_API_URL=          # 외부 API 엔드포인트
NEXT_PUBLIC_SUPABASE_URL=              # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=  # Supabase 공개 키
DATABASE_URL=                          # PostgreSQL 연결 문자열
NEXT_PUBLIC_FIREBASE_APIKEY=           # Firebase API 키
NEXT_PUBLIC_FIREBASE_PROJECTID=        # Firebase 프로젝트 ID
NEXT_PUBLIC_IMAGE_URL_PREFIX=          # 이미지 URL 프리픽스
```

### 개발 서버 실행

```bash
pnpm dev        # 개발 서버 (localhost:3000)
```

### 빌드 및 실행

```bash
pnpm build      # 프로덕션 빌드
pnpm start      # 빌드된 앱 실행
```

## 스크립트

| 명령어                  | 설명               |
|----------------------|------------------|
| `pnpm dev`           | 개발 서버 실행         |
| `pnpm build`         | 프로덕션 빌드          |
| `pnpm start`         | 프로덕션 서버 실행       |
| `pnpm lint`          | ESLint 실행        |
| `pnpm test`          | Vitest 단위 테스트 실행 |
| `pnpm test:watch`    | Vitest watch 모드  |
| `pnpm test:coverage` | 테스트 커버리지 리포트     |

## 아키텍처 특징

- **ISR (Incremental Static Regeneration)**: 1시간 캐시 + on-demand 재검증 (`/api/revalidate`)
- **가상 스크롤**: TanStack Virtual을 활용한 대량 데이터 렌더링 최적화
- **React Compiler**: React 19 컴파일러 활성화로 자동 메모이제이션
- **OpenTelemetry**: Grafana 연동 트레이싱 및 로그 수집
- **모노레포**: Turborepo + pnpm workspaces를 통한 코드 재사용 및 관심사 분리
- **Vercel 배포**: Speed Insights 통합
