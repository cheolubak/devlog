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

  try {
    log.info('GET Blog Posts', { page });

    const res = await externalApi.get<ResponseList<PostList>>(`/posts/blog`, {
      params: {
        offset: page,
      },
    });

    return NextResponse.json(res);
  } catch (e) {
    log.error('GET Blog Posts', { error: JSON.stringify(e), page });
    return NextResponse.json({ message: 'Error!!' }, { status: 500 });
  }
}
