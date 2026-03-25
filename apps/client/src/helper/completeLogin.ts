'use server';

import { externalApi } from '@devlog/request';
import { setAuthCookies } from 'helper/setAuthCookies';
import { NextResponse } from 'next/server';

export const completeLogin = async ({
  accessToken: socialAccessToken,
  sessionId,
  socialType,
}: {
  accessToken: string;
  sessionId: string;
  socialType: 'github' | 'google' | 'kakao' | 'naver';
}) => {
  const { accessToken, refreshToken } = await externalApi.post<{
    accessToken: string;
    refreshToken: string;
  }>(`/auth/${socialType}`, {
    accessToken: socialAccessToken,
    sessionId,
  });

  await setAuthCookies({ accessToken, refreshToken });

  return NextResponse.redirect(process.env.NEXT_PUBLIC_HOME ?? '/');
};
