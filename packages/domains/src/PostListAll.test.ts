import { describe, expect, it } from 'vitest';

import type { PostListAll } from './PostListAll';

import { postListAllSchema } from './PostListAll';

const validPostListAll = {
  description: 'A test post',
  id: '550e8400-e29b-41d4-a716-446655440000',
  isBookmark: false,
  isDisplay: true,
  originalPublishedAt: new Date('2025-01-01'),
  postTags: [],
  source: {
    blogUrl: 'https://blog.example.com',
    icon: null,
    id: '660e8400-e29b-41d4-a716-446655440000',
    name: 'Example Blog',
    type: 'RSS' as const,
    url: 'https://example.com',
  },
  sourceUrl: 'https://example.com/post/1',
  title: 'Test Post',
};

describe('postListAllSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = postListAllSchema.parse(validPostListAll);
    expect(result.title).toBe('Test Post');
    expect(result.isDisplay).toBe(true);
  });

  it('isDisplay가 false여도 파싱한다', () => {
    const result = postListAllSchema.parse({
      ...validPostListAll,
      isDisplay: false,
    });
    expect(result.isDisplay).toBe(false);
  });

  it('searchKeywords가 null이어도 파싱한다', () => {
    const result = postListAllSchema.parse({
      ...validPostListAll,
      searchKeywords: null,
    });
    expect(result.searchKeywords).toBeNull();
  });

  it('searchKeywords가 있으면 파싱한다', () => {
    const result = postListAllSchema.parse({
      ...validPostListAll,
      searchKeywords: { keywords: 'typescript,react' },
    });
    expect(result.searchKeywords?.keywords).toBe('typescript,react');
  });

  it('isDisplay가 누락되면 에러를 던진다', () => {
    const { isDisplay: _, ...withoutIsDisplay } = validPostListAll;
    expect(() => postListAllSchema.parse(withoutIsDisplay)).toThrow();
  });

  it('PostList 필수 필드가 누락되면 에러를 던진다', () => {
    const { title: _, ...withoutTitle } = validPostListAll;
    expect(() => postListAllSchema.parse(withoutTitle)).toThrow();
  });

  it('문자열 날짜도 coerce로 파싱한다', () => {
    const result = postListAllSchema.parse({
      ...validPostListAll,
      originalPublishedAt: '2025-01-01T00:00:00Z',
    });
    expect(result.originalPublishedAt).toBeInstanceOf(Date);
  });

  it('타입이 PostListAll과 호환된다', () => {
    const result: PostListAll = postListAllSchema.parse(validPostListAll);
    expect(result).toBeDefined();
  });
});
