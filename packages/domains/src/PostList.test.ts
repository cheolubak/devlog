import { describe, expect, it } from 'vitest';

import { postListSchema } from './PostList';

const validPost = {
  description: 'A test post',
  id: '550e8400-e29b-41d4-a716-446655440000',
  imageUrl: 'https://example.com/image.png',
  originalPublishedAt: new Date('2025-01-01'),
  postTags: [
    {
      createdAt: new Date('2025-01-01'),
      postId: '550e8400-e29b-41d4-a716-446655440000',
      tag: { id: 1, name: 'TypeScript' },
      tagId: 1,
    },
  ],
  source: {
    blogUrl: 'https://blog.example.com',
    icon: 'https://example.com/icon.png',
    id: '660e8400-e29b-41d4-a716-446655440000',
    name: 'Example Blog',
    type: 'RSS' as const,
    url: 'https://example.com',
  },
  sourceUrl: 'https://example.com/post/1',
  title: 'Test Post',
};

describe('postListSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = postListSchema.parse(validPost);
    expect(result.title).toBe('Test Post');
    expect(result.postTags).toHaveLength(1);
  });

  it('imageUrl이 null이어도 파싱한다', () => {
    const result = postListSchema.parse({ ...validPost, imageUrl: null });
    expect(result.imageUrl).toBeNull();
  });

  it('imageUrl이 undefined여도 파싱한다', () => {
    const { imageUrl: _, ...withoutImage } = validPost;
    const result = postListSchema.parse(withoutImage);
    expect(result.imageUrl).toBeUndefined();
  });

  it('필수 필드가 누락되면 에러를 던진다', () => {
    const { title: _, ...withoutTitle } = validPost;
    expect(() => postListSchema.parse(withoutTitle)).toThrow();
  });

  it('잘못된 UUID는 에러를 던진다', () => {
    expect(() =>
      postListSchema.parse({ ...validPost, id: 'not-a-uuid' }),
    ).toThrow();
  });

  it('빈 postTags 배열을 허용한다', () => {
    const result = postListSchema.parse({ ...validPost, postTags: [] });
    expect(result.postTags).toEqual([]);
  });

  it('tagId가 양의 정수가 아니면 에러를 던진다', () => {
    expect(() =>
      postListSchema.parse({
        ...validPost,
        postTags: [
          {
            ...validPost.postTags[0],
            tag: { id: -1, name: 'Bad' },
            tagId: -1,
          },
        ],
      }),
    ).toThrow();
  });
});
