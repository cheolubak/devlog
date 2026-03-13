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

  cookieStores.set(ACCESS_TOKEN_KEY, accessToken, {
    expires: jwtDecode(accessToken).exp * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  cookieStores.set(REFRESH_TOKEN_KEY, refreshToken, {
    expires: jwtDecode(refreshToken).exp * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};
