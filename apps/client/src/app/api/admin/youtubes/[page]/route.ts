import type { PostListAll, ResponseList } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page } = await params;
  const { searchParams } = req.nextUrl;

  const isDisplay = searchParams.get('isDisplay') ?? 'false';

  const res = await externalApi.get<ResponseList<PostListAll>>('posts/all', {
    params: {
      isDisplay,
      offset: page,
      type: ['YOUTUBE'],
    },
  });

  return NextResponse.json(res);
}
