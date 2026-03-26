import type { NextRequest } from 'next/server';

import { postListSchema, responseListSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { handleRouteError } from 'helper/handleRouteError';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    if (!accessToken) {
      return NextResponse.json({
        data: [],
        pagination: { hasMore: false, limit: 20, page: 1, total: 0 },
      });
    }

    const { searchParams } = req.nextUrl;
    const page = z.coerce
      .number()
      .int()
      .positive()
      .default(1)
      .parse(searchParams.get('page') ?? undefined);
    const q = searchParams.get('q') ?? '';
    const sourceId = searchParams.get('sourceId');

    try {
      const apiParams: Record<string, number | string | string[]> = {
        page,
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
      return handleRouteError(e, 'fetch bookmark posts', {
        hasQuery: q.length > 0,
        page,
      });
    }
  });
}
