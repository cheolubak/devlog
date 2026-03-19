'use server';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'constants/auth';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export const setAuthCookies = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookieStores = await cookies();

  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };

  cookieStores.set(ACCESS_TOKEN_KEY, accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  cookieStores.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
};
