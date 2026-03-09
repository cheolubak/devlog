import type { PostList, ResponseList } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { searchParams } = req.nextUrl;

    const page = z.coerce
      .number()
      .int()
      .nonnegative()
      .default(0)
      .parse(searchParams.get('page'));
    const q = searchParams.get('q') ?? '';
    const sourceId = searchParams.get('sourceId');
    const region = searchParams.get('region');
    const type = searchParams.get('type');

    try {
      const apiParams: Record<string, number | string | string[]> = {
        offset: page,
      };

      let endpoint = '/posts';
      if (q) {
        apiParams.q = q;

        endpoint = '/search';
      }

      if (sourceId) {
        apiParams.sourceId = sourceId;
      }

      if (region) {
        apiParams.region = region;
      }

      if (type === 'BLOG') {
        apiParams.type = ['RSS', 'ATOM', 'SCRAPING'];
      } else if (type === 'YOUTUBE') {
        apiParams.type = ['YOUTUBE'];
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

      return NextResponse.json(res);
    } catch (e) {
      log.error('GET Posts', { error: JSON.stringify(e), page, q });
      return NextResponse.json({ message: 'Error!!' }, { status: 500 });
    }
  });
}
