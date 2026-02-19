import { z } from 'zod';

import { postListSchema } from '@/packages/domains/src/PostList';

export const postListAllSchema = postListSchema.extend({
  isDisplay: z.boolean(),
  searchKeywords: z
    .object({
      keywords: z.string(),
    })
    .nullish(),
});

export type PostListAll = z.infer<typeof postListAllSchema>;
