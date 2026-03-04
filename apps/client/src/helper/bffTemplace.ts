import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi, FetchError } from '@devlog/request';
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

  try {
    const cookieStores = await cookies();

    const sessionId = cookieStores.get(SESSION_ID_KEY)?.value || uuidv4();
    const storedAccessToken = cookieStores.get(ACCESS_TOKEN_KEY)?.value;
    const storedRefreshToken = cookieStores.get(REFRESH_TOKEN_KEY)?.value;

    let accessToken = storedAccessToken;

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

    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    cookieStores.set(SESSION_ID_KEY, sessionId, {
      expires,
    });

    return await work({ accessToken, sessionId });
  } catch (e) {
    console.log('=======e=======', e);
    const attribute: Record<string, string> = {
      error: JSON.stringify(e),
      pathname,
      search,
    };
    if (e instanceof FetchError) {
      if (e.body) attribute.body = JSON.stringify(e.body);
      if (e.data) attribute.data = JSON.stringify(e.data);
    }

    log.error('BFF Error', attribute);

    return NextResponse.json({ message: '오류' }, { status: 500 });
  }
};
