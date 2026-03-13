'use server';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'constants/auth';
import { jwtDecode } from 'helper/jwtDecode';
import { cookies } from 'next/headers';

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
    expires: jwtDecode(accessToken).exp * 1000,
  });
  cookieStores.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...cookieOptions,
    expires: jwtDecode(refreshToken).exp * 1000,
  });
};
