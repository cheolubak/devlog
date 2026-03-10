import { z } from 'zod';

export const postTypeSchema = z.enum(['blog', 'youtube']);

export const POST_TYPE = postTypeSchema.enum;

export type PostType = z.infer<typeof postTypeSchema>;
