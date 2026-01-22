import { z } from 'zod';

export const postListSchema = z.object({
  content: z.string(),
  createdAt: z.date(),
  id: z.uuid(),
  isDisplay: z.boolean(),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  title: z.string(),
});

export type PostList = z.infer<typeof postListSchema>;
