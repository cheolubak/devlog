import type { ReactNode } from 'react';

import { z } from 'zod';

export const modalSchema = z.object({
  content: z.custom<ReactNode>(),
  modalKey: z.string(),
});

export type Modal = z.infer<typeof modalSchema>;
