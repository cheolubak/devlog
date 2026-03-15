import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi, FetchError } from '@devlog/request';
import { getAgentInfo } from '@devlog/utils';
import * as Sentry from '@sentry/nextjs';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SESSION_ID_KEY,
} from 'constants/auth';
import { setAuthCookies } from 'helper/setAuthCookies';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const bffTemplate = async (
  req: NextRequest,
  work: (info: {
    accessToken?: null | string;
    sessionId: string;
  }) => Promise<NextResponse>,
) => {
  const { pathname, search } = req.nextUrl;

  const { browser, device, ip, os } = getAgentInfo(req);

  let sessionId: string | undefined;
  let accessToken: string | undefined;

  try {
    const cookieStores = await cookies();

    sessionId = cookieStores.get(SESSION_ID_KEY)?.value || uuidv4();
    const storedAccessToken = cookieStores.get(ACCESS_TOKEN_KEY)?.value;
    const storedRefreshToken = cookieStores.get(REFRESH_TOKEN_KEY)?.value;

    accessToken = storedAccessToken;

    try {
      if (!storedAccessToken && storedRefreshToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await externalApi.post<{
            accessToken: string;
            refreshToken: string;
          }>('/auth/refresh', {
            refreshToken: storedRefreshToken,
            sessionId,
          });

        await setAuthCookies({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        accessToken = newAccessToken;
      }
    } catch {
      cookieStores.delete(ACCESS_TOKEN_KEY);
      cookieStores.delete(REFRESH_TOKEN_KEY);
    }

    log.info('BFF Request', {
      accessToken: accessToken ? `${accessToken.slice(0, 6)}***` : 'none',
      browser: browser ?? 'unknown',
      device,
      ip,
      os: os ?? 'unknown',
      pathname: req.nextUrl.pathname,
      search: req.nextUrl.search,
      sessionId,
    });

    cookieStores.set(SESSION_ID_KEY, sessionId, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return await work({ accessToken, sessionId });
  } catch (e) {
    Sentry.captureException(e);

    const attribute: Record<string, string> = {
      accessToken: accessToken ? `${accessToken.slice(0, 6)}***` : 'none',
      browser: browser ?? 'unknown',
      device,
      ip,
      os: os ?? 'unknown',
      pathname,
      search,
      sessionId: sessionId ?? 'unknown',
    };

    if (e instanceof FetchError) {
      if (e.body) {
        attribute.body = JSON.stringify(e.body);
      }

      if (e.status) {
        attribute.status = e.status.toString();
      }

      if (e.data) {
        attribute.data = JSON.stringify(e.data);
      }
    } else if (e instanceof Error) {
      attribute.message = e.message;
    }

    log.error('BFF Request Error', attribute);

    return NextResponse.json({ message: '오류' }, { status: 500 });
  }
};
