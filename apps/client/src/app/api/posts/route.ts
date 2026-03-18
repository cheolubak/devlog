import type { NextRequest } from 'next/server';

import {
  postListSchema,
  responseListSchema,
} from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplate';
import { handleRouteError } from 'helper/handleRouteError';
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

      const res = await externalApi.get(endpoint, {
        headers,
        params: apiParams,
      });

      const parsed = responseListSchema(postListSchema).parse(res);

      return NextResponse.json(parsed);
    } catch (e) {
      return handleRouteError(e, 'fetch posts', { page, q });
    }
  });
}
