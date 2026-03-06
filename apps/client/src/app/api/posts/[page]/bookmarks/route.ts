import type { PostList, ResponseList } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { page: pageParam } = await params;

    const page = z.coerce.number().int().nonnegative().parse(pageParam);
    const q = req.nextUrl.searchParams.get('q') ?? '';
    const sourceId = req.nextUrl.searchParams.get('sourceId');

    try {
      log.info('GET Posts', { page, q, sourceId: sourceId ?? 'null' });

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

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const res = await externalApi.get<ResponseList<PostList>>(endpoint, {
        headers,
        params: apiParams,
      });

      return NextResponse.json({
        ...res,
        data: res.data.map((item) => ({ ...item, isBookmark: true })),
      });
    } catch (e) {
      log.error('GET Posts', { error: JSON.stringify(e), page, q });
      return NextResponse.json({ message: 'Error!!' }, { status: 500 });
    }
  });
}
