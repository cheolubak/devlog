/**
 * CI 환경용 모의 외부 API 서버
 *
 * E2E 테스트 실행 시 외부 API(localhost:8080)가 없는 환경에서
 * SSR 데이터 페칭이 정상 동작하도록 fixture 데이터를 반환합니다.
 *
 * 사용: node cypress/mock-server.cjs
 */

const http = require('http');

const blogSources = [
  {
    id: 'blog-001',
    name: 'Tech Blog',
    blogUrl: 'https://tech-blog.example.com',
    url: 'https://tech-blog.example.com',
    corpUrl: 'https://tech-corp.example.com',
    icon: '/icons/tech-blog.png',
    type: 'RSS',
    isActive: true,
    lastFetchedAt: '2025-01-15T00:00:00.000Z',
    lastFetchStatus: 'SUCCESS',
    lastFetchError: null,
    totalPostsFetched: 100,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'blog-002',
    name: 'Dev Notes',
    blogUrl: 'https://devnotes.example.com',
    url: 'https://devnotes.example.com',
    corpUrl: null,
    icon: null,
    type: 'ATOM',
    isActive: true,
    lastFetchedAt: '2025-01-14T00:00:00.000Z',
    lastFetchStatus: 'SUCCESS',
    lastFetchError: null,
    totalPostsFetched: 50,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2025-01-14T00:00:00.000Z',
  },
  {
    id: 'blog-003',
    name: 'CSS Weekly',
    blogUrl: 'https://cssweekly.example.com',
    url: 'https://cssweekly.example.com',
    corpUrl: null,
    icon: '/icons/css-weekly.png',
    type: 'RSS',
    isActive: true,
    lastFetchedAt: '2025-01-13T00:00:00.000Z',
    lastFetchStatus: 'SUCCESS',
    lastFetchError: null,
    totalPostsFetched: 30,
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2025-01-13T00:00:00.000Z',
  },
  {
    id: 'yt-001',
    name: '코딩 유튜브',
    blogUrl: 'https://youtube.com/@coding',
    url: 'https://youtube.com/@coding',
    corpUrl: null,
    icon: '/icons/coding-yt.png',
    type: 'YOUTUBE',
    isActive: true,
    lastFetchedAt: '2025-01-15T00:00:00.000Z',
    lastFetchStatus: 'SUCCESS',
    lastFetchError: null,
    totalPostsFetched: 200,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
  },
  {
    id: 'yt-002',
    name: '개발 TV',
    blogUrl: 'https://youtube.com/@devtv',
    url: 'https://youtube.com/@devtv',
    corpUrl: null,
    icon: null,
    type: 'YOUTUBE',
    isActive: true,
    lastFetchedAt: '2025-01-14T00:00:00.000Z',
    lastFetchStatus: 'SUCCESS',
    lastFetchError: null,
    totalPostsFetched: 150,
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2025-01-14T00:00:00.000Z',
  },
];

const postsResponse = {
  data: [
    {
      id: 'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
      title: 'React 19의 새로운 기능 살펴보기',
      description:
        'React 19에서 추가된 주요 기능들과 변경사항을 정리합니다.',
      sourceUrl: 'https://tech-blog.example.com/react-19',
      imageUrl: null,
      originalPublishedAt: '2025-01-15T00:00:00.000Z',
      source: {
        id: '11b2c3d4-e5f6-4890-abcd-ef1234567001',
        name: 'Tech Blog',
        blogUrl: 'https://tech-blog.example.com',
        url: 'https://tech-blog.example.com',
        icon: null,
      },
      postTags: [
        {
          postId: 'a1b2c3d4-e5f6-4890-abcd-ef1234567890',
          tagId: 1,
          createdAt: '2025-01-15T00:00:00.000Z',
          tag: { id: 1, name: 'React' },
        },
      ],
      viewCount: 42,
    },
    {
      id: 'b2c3d4e5-f6a7-4901-bcde-a12345678901',
      title: 'TypeScript 타입 시스템 완벽 가이드',
      description:
        'TypeScript의 고급 타입 기능을 활용하는 방법을 소개합니다.',
      sourceUrl: 'https://ts-blog.example.com/typescript-guide',
      imageUrl: null,
      originalPublishedAt: '2025-01-14T00:00:00.000Z',
      source: {
        id: '22c3d4e5-f6a7-4901-bcde-a12345678002',
        name: 'TS Blog',
        blogUrl: 'https://ts-blog.example.com',
        url: 'https://ts-blog.example.com',
        icon: null,
      },
      postTags: [],
      viewCount: 28,
    },
    {
      id: 'c3d4e5f6-a7b8-4012-8def-123456789012',
      title: 'Next.js App Router 마이그레이션 경험기',
      description:
        'Pages Router에서 App Router로 마이그레이션한 과정과 주의사항을 공유합니다.',
      sourceUrl: 'https://devnotes.example.com/nextjs-app-router',
      imageUrl: null,
      originalPublishedAt: '2025-01-13T00:00:00.000Z',
      source: {
        id: '33d4e5f6-a7b8-4012-8def-123456789003',
        name: 'Dev Notes',
        blogUrl: 'https://devnotes.example.com/',
        url: 'https://devnotes.example.com',
        icon: null,
      },
      postTags: [],
      viewCount: 15,
    },
    {
      id: 'd4e5f6a7-b8c9-4123-9efa-234567890123',
      title: 'CSS Container Queries 실전 활용',
      description:
        'Container Queries를 사용하여 컴포넌트 기반 반응형 디자인을 구현하는 방법입니다.',
      sourceUrl: 'https://cssweekly.example.com/container-queries',
      imageUrl: null,
      originalPublishedAt: '2025-01-12T00:00:00.000Z',
      source: {
        id: '44e5f6a7-b8c9-4123-9efa-234567890004',
        name: 'CSS Weekly',
        blogUrl: 'https://cssweekly.example.com',
        url: 'https://cssweekly.example.com',
        icon: null,
      },
      postTags: [],
      viewCount: 20,
    },
    {
      id: 'e5f6a7b8-c9d0-4234-afab-345678901234',
      title: 'Zod를 활용한 런타임 타입 검증',
      description:
        'Zod 라이브러리를 사용하여 API 응답을 안전하게 검증하는 패턴을 알아봅니다.',
      sourceUrl: 'https://tech-blog.example.com/zod-validation',
      imageUrl: null,
      originalPublishedAt: '2025-01-11T00:00:00.000Z',
      source: {
        id: '11b2c3d4-e5f6-4890-abcd-ef1234567001',
        name: 'Tech Blog',
        blogUrl: 'https://tech-blog.example.com',
        url: 'https://tech-blog.example.com',
        icon: null,
      },
      postTags: [],
      viewCount: 35,
    },
  ],
  pagination: {
    hasMore: true,
    limit: 20,
    offset: 0,
    total: 7,
  },
};

const PORT = parseInt(process.env.MOCK_PORT || '8080', 10);

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === '/blog-sources' && req.method === 'GET') {
    res.end(JSON.stringify(blogSources));
    return;
  }

  const blogSourceMatch = pathname.match(/^\/blog-sources\/(.+)$/);
  if (blogSourceMatch && req.method === 'GET') {
    const id = blogSourceMatch[1];
    const source = blogSources.find((s) => s.id === id);
    if (source) {
      res.end(JSON.stringify(source));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Not found' }));
    }
    return;
  }

  if (
    (pathname === '/posts' || pathname === '/search') &&
    req.method === 'GET'
  ) {
    res.end(JSON.stringify(postsResponse));
    return;
  }

  if (pathname === '/auth/refresh' && req.method === 'POST') {
    res.writeHead(401);
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }

  if (pathname === '/posts/bookmarks' && req.method === 'GET') {
    res.end(
      JSON.stringify({
        data: [],
        pagination: { hasMore: false, limit: 20, offset: 0, total: 0 },
      }),
    );
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Mock API server running on port ${PORT}`);
});
