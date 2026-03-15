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
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 },
      );
    }

    const res = await fetch('https://oauth2.googleapis.com/token', {
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_LOGIN_CLIENT_SECRET ?? '',
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL ?? '',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const data: {
      access_token: string;
      expires_in: number;
      id_token: string;
      scope: string;
      token_type: 'Bearer';
    } = await res.json();

    return await completeLogin({
      accessToken: data.access_token,
      sessionId,
      socialType: 'google',
    });
  });
}
