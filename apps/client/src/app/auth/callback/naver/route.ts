import type { NextRequest } from 'next/server';

import { bffTemplate } from 'helper/bffTemplate';
import { completeLogin } from 'helper/completeLogin';
import { verifyOAuthState } from 'helper/verifyOAuthState';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ sessionId }) => {
    const { searchParams } = req.nextUrl;

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const isValidState = await verifyOAuthState(state);
    if (!code || !isValidState) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (
      !process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID ||
      !process.env.NAVER_LOGIN_CLIENT_SECRET ||
      !process.env.NEXT_PUBLIC_NAVER_LOGIN_CALLBACK_URL
    ) {
      return NextResponse.json({}, { status: 500 });
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID,
      client_secret: process.env.NAVER_LOGIN_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      response_type: 'code',
      state: state ?? '',
    });

    const res = await fetch(
      `https://nid.naver.com/oauth2.0/token?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_LOGIN_CLIENT_ID,
          'X-Naver-Client-Secret':
            process.env.NAVER_LOGIN_CLIENT_SECRET,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json({}, { status: 500 });
    }

    const data: { access_token: string; refresh_token: string } =
      await res.json();

    return await completeLogin({
      accessToken: data.access_token,
      sessionId,
      socialType: 'naver',
    });
  });
}
