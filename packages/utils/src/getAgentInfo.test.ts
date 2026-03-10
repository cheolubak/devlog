import { describe, expect, it, vi } from 'vitest';

import { getAgentInfo } from './getAgentInfo';

vi.mock('next/server', () => ({
  userAgent: vi.fn(),
}));

import { userAgent } from 'next/server';

const mockUserAgent = vi.mocked(userAgent);

const makeReq = (forwardedFor: null | string) =>
  ({
    headers: {
      get: (key: string) => (key === 'x-forwarded-for' ? forwardedFor : null),
    },
  }) as Parameters<typeof getAgentInfo>[0];

describe('getAgentInfo', () => {
  it('Chrome 브라우저, PC, IP가 있는 경우 올바른 정보를 반환한다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Chrome' },
      device: { type: undefined },
      os: { name: 'macOS' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq('1.2.3.4'))).toEqual({
      browser: 'chrome',
      device: 'PC',
      ip: '1.2.3.4',
      os: 'macos',
    });
  });

  it('모바일 디바이스인 경우 device가 MOBILE이다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Safari' },
      device: { type: 'mobile' },
      os: { name: 'iOS' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq('5.6.7.8'))).toEqual({
      browser: 'safari',
      device: 'MOBILE',
      ip: '5.6.7.8',
      os: 'ios',
    });
  });

  it('x-forwarded-for에 여러 IP가 있으면 첫 번째 IP만 반환한다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Firefox' },
      device: { type: undefined },
      os: { name: 'Windows' },
    } as ReturnType<typeof userAgent>);

    const result = getAgentInfo(makeReq('10.0.0.1, 10.0.0.2, 10.0.0.3'));
    expect(result.ip).toBe('10.0.0.1');
  });

  it('x-forwarded-for 헤더가 없으면 ip가 빈 문자열이다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Edge' },
      device: { type: undefined },
      os: { name: 'Windows' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq(null)).ip).toBe('');
  });

  it('browser.name에 공백이 포함된 경우 공백을 제거한다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Mobile Safari' },
      device: { type: 'mobile' },
      os: { name: 'iOS' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq(null)).browser).toBe('mobilesafari');
  });

  it('os.name에 공백이 포함된 경우 공백을 제거한다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Chrome' },
      device: { type: undefined },
      os: { name: 'Mac OS' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq(null)).os).toBe('macos');
  });

  it('browser.name이 undefined이면 browser가 undefined이다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: undefined },
      device: { type: undefined },
      os: { name: 'Linux' },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq(null)).browser).toBeUndefined();
  });

  it('os.name이 undefined이면 os가 undefined이다', () => {
    mockUserAgent.mockReturnValue({
      browser: { name: 'Chrome' },
      device: { type: undefined },
      os: { name: undefined },
    } as ReturnType<typeof userAgent>);

    expect(getAgentInfo(makeReq(null)).os).toBeUndefined();
  });
});
