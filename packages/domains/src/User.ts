import { z } from 'zod';

export const userSchema = z.object({
  email: z.email().nullish(),
  nickname: z.string(),
  profile: z.string().nullish(),
  socialType: z.enum(['GOOGLE', 'KAKAO', 'NAVER', 'GITHUB']),
});

export type User = z.infer<typeof userSchema>;
