import { describe, expect, it } from 'vitest';

import type { BlogSource } from './BlogSource';

import { blogSourceSchema } from './BlogSource';

const validBlogSource = {
  blogUrl: 'https://blog.example.com',
  createdAt: '2025-01-01T00:00:00Z',
  id: 'source-1',
  isActive: true,
  lastFetchedAt: '2025-06-01T00:00:00Z',
  lastFetchError: '',
  lastFetchStatus: 'SUCCESS',
  name: 'Example Blog',
  type: 'RSS',
  updatedAt: '2025-06-01T00:00:00Z',
  url: 'https://blog.example.com/rss',
};

describe('blogSourceSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = blogSourceSchema.parse(validBlogSource);
    expect(result.name).toBe('Example Blog');
    expect(result.isActive).toBe(true);
    expect(result.lastFetchStatus).toBe('SUCCESS');
  });

  it('totalPostsFetched가 없으면 기본값 0을 사용한다', () => {
    const result = blogSourceSchema.parse(validBlogSource);
    expect(result.totalPostsFetched).toBe(0);
  });

  it('totalPostsFetched가 있으면 해당 값을 사용한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      totalPostsFetched: 42,
    });
    expect(result.totalPostsFetched).toBe(42);
  });

  it('corpUrl이 null이어도 파싱한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      corpUrl: null,
    });
    expect(result.corpUrl).toBeNull();
  });

  it('icon이 null이어도 파싱한다', () => {
    const result = blogSourceSchema.parse({ ...validBlogSource, icon: null });
    expect(result.icon).toBeNull();
  });

  it('scrapingConfig가 null이어도 파싱한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      scrapingConfig: null,
    });
    expect(result.scrapingConfig).toBeNull();
  });

  it('lastFetchError가 null이어도 파싱한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      lastFetchError: null,
    });
    expect(result.lastFetchError).toBeNull();
  });

  it('lastFetchStatus가 FAILED여도 파싱한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      lastFetchStatus: 'FAILED',
    });
    expect(result.lastFetchStatus).toBe('FAILED');
  });

  it('모든 type 값을 파싱한다', () => {
    for (const type of ['ATOM', 'RSS', 'SCRAPING', 'YOUTUBE'] as const) {
      const result = blogSourceSchema.parse({ ...validBlogSource, type });
      expect(result.type).toBe(type);
    }
  });

  it('새로운 type 값도 파싱한다', () => {
    const result = blogSourceSchema.parse({
      ...validBlogSource,
      type: 'NEW_TYPE',
    });
    expect(result.type).toBe('NEW_TYPE');
  });

  it('필수 필드가 누락되면 에러를 던진다', () => {
    const { name: _, ...withoutName } = validBlogSource;
    expect(() => blogSourceSchema.parse(withoutName)).toThrow();
  });

  it('totalPostsFetched가 음수이면 에러를 던진다', () => {
    expect(() =>
      blogSourceSchema.parse({ ...validBlogSource, totalPostsFetched: -1 }),
    ).toThrow();
  });

  it('타입이 BlogSource와 호환된다', () => {
    const result: BlogSource = blogSourceSchema.parse(validBlogSource);
    expect(result).toBeDefined();
  });
});
