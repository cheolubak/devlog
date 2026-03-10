import { z } from 'zod';

export const responseListSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      hasMore: z.boolean(),
      limit: z.number(),
      offset: z.number(),
      total: z.number(),
    }),
  });

export type ResponseList<T> = {
  data: T[];
  pagination: {
    hasMore: boolean;
    limit: number;
    offset: number;
    total: number;
  };
};
