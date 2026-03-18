import { z } from 'zod';

export const blogSourceSchema = z.object({
  blogUrl: z.string(),
  corpUrl: z.string().nullish(),
  createdAt: z.string(),
  icon: z.string().nullish(),
  id: z.string(),
  isActive: z.boolean(),
  lastFetchedAt: z.string(),
  lastFetchError: z.string().nullish(),
  lastFetchStatus: z.string(),
  name: z.string(),
  scrapingConfig: z.unknown().nullish(),
  totalPostsFetched: z.number().int().nonnegative().default(0),
  type: z.string().optional(),
  updatedAt: z.string().optional(),
  url: z.string(),
});

export type BlogSource = z.infer<typeof blogSourceSchema>;
