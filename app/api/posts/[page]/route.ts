import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { z } from 'zod';

import type { PostList } from '@/packages/domains/src/PostList';
import type { ResponseList } from '@/packages/domains/src/ResponseList';

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
