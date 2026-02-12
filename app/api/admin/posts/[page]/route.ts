import type { PostListAll, ResponseList } from '@devlog/domain';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page } = await params;

  const res = await externalApi.get<ResponseList<PostListAll>>('posts/all', {
    params: {
      offset: page,
    },
  });

  return NextResponse.json(res);
}
