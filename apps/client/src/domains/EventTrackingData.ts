import { z } from 'zod';

export const eventTrackingDataSchema = z.object({
  eventName: z.string(),
  params: z.record(z.string(), z.string()).optional(),
});

export type EventTrackingData = z.infer<typeof eventTrackingDataSchema>;
