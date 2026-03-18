import type { NextRequest } from 'next/server';

import { postListSchema, responseListSchema } from '@devlog/domains';
import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json({
        data: [],
        pagination: { hasMore: false, limit: 20, offset: 0, total: 0 },
      });
    }

    const { searchParams } = req.nextUrl;
    const page = z.coerce
      .number()
      .int()
      .nonnegative()
      .default(0)
      .parse(searchParams.get('page'));
    const q = searchParams.get('q') ?? '';
    const sourceId = searchParams.get('sourceId');

    try {
      const apiParams: Record<string, number | string | string[]> = {
        offset: page,
      };

      let endpoint = '/posts/bookmarks';
      if (q) {
        apiParams.q = q;

        endpoint = '/search/bookmarks';
      }

      if (sourceId) {
        apiParams.sourceId = sourceId;
      }

      const headers: Record<string, string> = {
        sessionId,
      };

      headers.Authorization = `Bearer ${accessToken}`;

      const res = await externalApi.get(endpoint, {
        headers,
        params: apiParams,
      });

      const parsed = responseListSchema(postListSchema).parse(res);

      return NextResponse.json({
        ...parsed,
        data: parsed.data.map((item) => ({ ...item, isBookmark: true })),
      });
    } catch (e) {
      log.error('GET Bookmark Posts', {
        error: e instanceof Error ? e.message : String(e),
        page,
        q,
      });
      return NextResponse.json({ message: 'Error!!' }, { status: 500 });
    }
  });
}
