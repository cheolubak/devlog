import type { NextRequest } from 'next/server';

import { userSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json(
        { message: '로그인이 필요해요' },
        { status: 401 },
      );
    }

    const res = await externalApi.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    const parsed = userSchema.parse(res);

    return NextResponse.json({
      ...parsed,
      profile: parsed.profile
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${parsed.profile.startsWith('/') ? parsed.profile : `/${parsed.profile}`}`
        : undefined,
    });
  });
}
