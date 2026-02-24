import { z } from 'zod';

export const postListSchema = z.object({
  description: z.string(),
  id: z.uuid(),
  imageUrl: z.string().nullish(),
  originalPublishedAt: z.date(),
  postTags: z.array(
    z.object({
      createdAt: z.date(),
      postId: z.uuid(),
      tag: z.object({
        id: z.number().int().positive(),
        name: z.string(),
      }),
      tagId: z.number().int().positive(),
    }),
  ),
  source: z.object({
    blogUrl: z.string(),
    icon: z.string().nullish(),
    id: z.uuid(),
    name: z.string(),
    type: z.enum(['RSS', 'ATOM', 'SCRAPING', 'YOUTUBE']),
    url: z.string(),
  }),
  sourceUrl: z.string(),
  title: z.string(),
});

export type PostList = z.infer<typeof postListSchema>;
