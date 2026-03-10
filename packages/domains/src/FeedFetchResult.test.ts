import { describe, expect, it } from 'vitest';

import type { FeedFetchResult } from './FeedFetchResult';

import { feedFetchResultSchema } from './FeedFetchResult';

const validResult = {
  message: '피드 수집 완료',
  success: true,
};

describe('feedFetchResultSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = feedFetchResultSchema.parse({
      ...validResult,
      failureCount: 0,
      newPostsCount: 5,
    });
    expect(result.success).toBe(true);
    expect(result.message).toBe('피드 수집 완료');
    expect(result.newPostsCount).toBe(5);
    expect(result.failureCount).toBe(0);
  });

  it('failureCount와 newPostsCount가 없으면 기본값 0을 사용한다', () => {
    const result = feedFetchResultSchema.parse(validResult);
    expect(result.failureCount).toBe(0);
    expect(result.newPostsCount).toBe(0);
  });

  it('success가 false여도 파싱한다', () => {
    const result = feedFetchResultSchema.parse({
      ...validResult,
      success: false,
    });
    expect(result.success).toBe(false);
  });

  it('message가 누락되면 에러를 던진다', () => {
    const { message: _, ...withoutMessage } = validResult;
    expect(() => feedFetchResultSchema.parse(withoutMessage)).toThrow();
  });

  it('success가 누락되면 에러를 던진다', () => {
    const { success: _, ...withoutSuccess } = validResult;
    expect(() => feedFetchResultSchema.parse(withoutSuccess)).toThrow();
  });

  it('failureCount가 음수이면 에러를 던진다', () => {
    expect(() =>
      feedFetchResultSchema.parse({ ...validResult, failureCount: -1 }),
    ).toThrow();
  });

  it('newPostsCount가 음수이면 에러를 던진다', () => {
    expect(() =>
      feedFetchResultSchema.parse({ ...validResult, newPostsCount: -1 }),
    ).toThrow();
  });

  it('타입이 FeedFetchResult와 호환된다', () => {
    const result: FeedFetchResult = feedFetchResultSchema.parse(validResult);
    expect(result).toBeDefined();
  });
});
