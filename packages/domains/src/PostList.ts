import { z } from 'zod';

export const postListSchema = z.object({
  description: z.string(),
  descriptionEn: z.string().nullish(),
  id: z.uuid(),
  imageUrl: z.string().nullish(),
  isBookmark: z.boolean().default(false),
  originalPublishedAt: z.coerce.date(),
  postTags: z.array(
    z.object({
      createdAt: z.coerce.date(),
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
  titleEn: z.string().nullish(),
  viewCount: z.number().int().nonnegative().default(0),
});

export type PostList = z.infer<typeof postListSchema>;
