import type { NextRequest } from 'next/server';

import { userAgent } from 'next/server';

export type DEVICE_TYPE = 'MOBILE' | 'PC';

export const getAgentInfo = (req: NextRequest) => {
  const { browser, device, os } = userAgent(req);
  const deviceParam = device.type === 'mobile' ? 'mobile' : 'pc';

  const browserName =
    browser.name?.toLowerCase().replace(/\s/g, '') ?? undefined;

  const osName = os.name?.toLowerCase().replace(/\s/g, '') ?? undefined;

  let deviceType: DEVICE_TYPE = deviceParam === 'mobile' ? 'MOBILE' : 'PC';

  const forwaredFor = req.headers.get('x-forwarded-for');
  const ip = forwaredFor?.split(',').at(0) ?? null;

  return {
    browser: browserName,
    device: deviceType,
    ip: ip ?? '',
    os: osName,
  };
};
