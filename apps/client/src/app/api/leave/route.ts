import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplace';
import { NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json(
        { message: '로그인이 필요해요' },
        { status: 401 },
      );
    }

    await externalApi.delete('/auth/leave', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        sessionId,
      },
    });

    return NextResponse.json({});
  });
}
