import { describe, expect, it } from 'vitest';

import type { PostType } from './PostType';

import { POST_TYPE, postTypeSchema } from './PostType';

describe('postTypeSchema', () => {
  it('"blog"을 파싱한다', () => {
    const result = postTypeSchema.parse('blog');
    expect(result).toBe('blog');
  });

  it('"youtube"를 파싱한다', () => {
    const result = postTypeSchema.parse('youtube');
    expect(result).toBe('youtube');
  });

  it('유효하지 않은 값은 에러를 던진다', () => {
    expect(() => postTypeSchema.parse('rss')).toThrow();
    expect(() => postTypeSchema.parse('RSS')).toThrow();
    expect(() => postTypeSchema.parse('')).toThrow();
  });

  it('POST_TYPE 상수가 올바른 값을 가진다', () => {
    expect(POST_TYPE.blog).toBe('blog');
    expect(POST_TYPE.youtube).toBe('youtube');
  });

  it('타입이 PostType과 호환된다', () => {
    const type: PostType = postTypeSchema.parse('blog');
    expect(type).toBe('blog');
  });
});
