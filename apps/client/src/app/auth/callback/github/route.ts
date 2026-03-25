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

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '',
      client_secret: process.env.GITHUB_CLIENT_SECRET ?? '',
      code,
    });

    const res = await fetch(
      `https://github.com/login/oauth/access_token?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to exchange token' },
        { status: 502 },
      );
    }

    const data: { access_token: string; scope: string; token_type: 'bearer' } =
      await res.json();

    if (!data.access_token) {
      return NextResponse.json(
        { error: 'Invalid token response' },
        { status: 502 },
      );
    }

    return await completeLogin({
      accessToken: data.access_token,
      sessionId,
      socialType: 'github',
    });
  });
}
