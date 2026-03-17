import { describe, expect, it } from 'vitest';

import type { User } from './User';

import { userSchema } from './User';

const validUser = {
  email: 'test@example.com',
  nickname: 'tester',
  profile: '/images/profile.png',
  socialType: 'GOOGLE' as const,
};

describe('userSchema', () => {
  it('유효한 데이터를 파싱한다', () => {
    const result = userSchema.parse(validUser);
    expect(result.nickname).toBe('tester');
    expect(result.socialType).toBe('GOOGLE');
  });

  it('email이 null이어도 파싱한다', () => {
    const result = userSchema.parse({ ...validUser, email: null });
    expect(result.email).toBeNull();
  });

  it('email이 undefined여도 파싱한다', () => {
    const { email: _, ...withoutEmail } = validUser;
    const result = userSchema.parse(withoutEmail);
    expect(result.email).toBeUndefined();
  });

  it('profile이 null이어도 파싱한다', () => {
    const result = userSchema.parse({ ...validUser, profile: null });
    expect(result.profile).toBeNull();
  });

  it('모든 socialType 값을 파싱한다', () => {
    for (const socialType of [
      'GOOGLE',
      'KAKAO',
      'NAVER',
      'GITHUB',
    ] as const) {
      const result = userSchema.parse({ ...validUser, socialType });
      expect(result.socialType).toBe(socialType);
    }
  });

  it('유효하지 않은 socialType은 에러를 던진다', () => {
    expect(() =>
      userSchema.parse({ ...validUser, socialType: 'APPLE' }),
    ).toThrow();
  });

  it('nickname이 누락되면 에러를 던진다', () => {
    const { nickname: _, ...withoutNickname } = validUser;
    expect(() => userSchema.parse(withoutNickname)).toThrow();
  });

  it('유효하지 않은 email 형식은 에러를 던진다', () => {
    expect(() =>
      userSchema.parse({ ...validUser, email: 'not-an-email' }),
    ).toThrow();
  });

  it('타입이 User와 호환된다', () => {
    const result: User = userSchema.parse(validUser);
    expect(result).toBeDefined();
  });
});
