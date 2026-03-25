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
      !process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL ||
      !process.env.KAKAO_CLIENT_SECRET
    ) {
      return NextResponse.json({}, { status: 500 });
    }

    const formData = new FormData();

    formData.append('client_id', process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID);
    formData.append('client_secret', process.env.KAKAO_CLIENT_SECRET);
    formData.append('code', code);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL);

    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      body: formData,
      method: 'POST',
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: 500 });
    }

    const data: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      refresh_token_expires_in: number;
      scope: string;
      token_type: 'bearer';
    } = await res.json();

    if (!data.access_token) {
      return NextResponse.json(
        { error: 'Invalid token response' },
        { status: 502 },
      );
    }

    return await completeLogin({
      accessToken: data.access_token,
      sessionId,
      socialType: 'kakao',
    });
  });
}
