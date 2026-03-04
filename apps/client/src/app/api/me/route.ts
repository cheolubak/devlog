import type { User } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplace';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json(
        { message: '로그인이 필요해요' },
        { status: 401 },
      );
    }

    const res = await externalApi.get<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json({
      ...res,
      profile: res.profile
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${res.profile.startsWith('/') ? res.profile : `/${res.profile}`}`
        : undefined,
    });
  });
}
