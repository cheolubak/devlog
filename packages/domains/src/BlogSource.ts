import { z } from 'zod';

export const blogSourceSchema = z.object({
  blogUrl: z.string(),
  corpUrl: z.string().nullish(),
  createdAt: z.string(),
  icon: z.string().nullish(),
  id: z.string(),
  isActive: z.boolean(),
  lastFetchedAt: z.string(),
  lastFetchError: z.string(),
  lastFetchStatus: z.enum(['FAILED', 'SUCCESS']),
  name: z.string(),
  scrapingConfig: z.unknown().nullish(),
  totalPostsFetched: z.number().int().nonnegative().default(0),
  type: z.enum(['ATOM', 'RSS', 'SCRAPING', 'YOUTUBE']),
  updatedAt: z.string(),
  url: z.string(),
});

export type BlogSource = z.infer<typeof blogSourceSchema>;
