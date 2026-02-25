import type { PostList, ResponseList } from '@devlog/domain';
import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page: pageParam } = await params;

  const page = z.coerce.number().int().nonnegative().parse(pageParam);
  const type = req.nextUrl.searchParams.get('type') ?? 'blog';
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const sourceId = req.nextUrl.searchParams.get('sourceId');

  try {
    log.info('GET Posts', { page, q, sourceId: sourceId ?? 'null', type });

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

    const res = await externalApi.get<ResponseList<PostList>>(endpoint, {
      params: apiParams,
    });

    return NextResponse.json(res);
  } catch (e) {
    log.error('GET Posts', { error: JSON.stringify(e), page, q, type });
    return NextResponse.json({ message: 'Error!!' }, { status: 500 });
  }
}
