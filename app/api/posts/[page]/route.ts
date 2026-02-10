import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { PostList } from '@/packages/domains/PostList';
import { ResponseList } from '@/packages/domains/ResponseList';
import { externalApi } from '@/packages/request/src/request';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page: pageParam } = await params;

  const page = z.coerce.number().int().nonnegative().parse(pageParam);

  const res = await externalApi.get<ResponseList<PostList>>(`/posts`, {
    params: {
      offset: page,
    },
  });

  return NextResponse.json(res);
}
