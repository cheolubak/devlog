import { z } from 'zod';

export const feedFetchResultSchema = z.object({
  failureCount: z.number().int().nonnegative().default(0),
  message: z.string(),
  newPostsCount: z.number().int().nonnegative().default(0),
  success: z.boolean(),
});

export type FeedFetchResult = z.infer<typeof feedFetchResultSchema>;
