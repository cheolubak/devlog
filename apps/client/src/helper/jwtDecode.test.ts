import { describe, expect, it } from 'vitest';

import { jwtDecode } from './jwtDecode';

describe('jwtDecode', () => {
  const createToken = (payload: {
    exp: number;
    iat: number;
    sub: string;
  }) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = 'signature';

    return `${header}.${body}.${signature}`;
  };

  it('JWT 토큰의 payload를 디코딩한다', () => {
    const payload = { exp: 1700000000, iat: 1699000000, sub: 'user-1' };
    const token = createToken(payload);

    const result = jwtDecode(token);

    expect(result).toEqual(payload);
  });

  it('sub 필드를 올바르게 파싱한다', () => {
    const token = createToken({
      exp: 1700000000,
      iat: 1699000000,
      sub: 'test-user-id',
    });

    const result = jwtDecode(token);

    expect(result.sub).toBe('test-user-id');
  });

  it('exp 필드를 올바르게 파싱한다', () => {
    const token = createToken({
      exp: 1800000000,
      iat: 1699000000,
      sub: 'user-1',
    });

    const result = jwtDecode(token);

    expect(result.exp).toBe(1800000000);
  });

  it('잘못된 형식의 토큰이면 에러를 던진다', () => {
    expect(() => jwtDecode('invalid-token')).toThrow(
      'Invalid JWT token format',
    );
  });

  it('빈 문자열이면 에러를 던진다', () => {
    expect(() => jwtDecode('')).toThrow('Invalid JWT token format');
  });
});
