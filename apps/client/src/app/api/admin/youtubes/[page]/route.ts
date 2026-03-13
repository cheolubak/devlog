import type { PostListAll, ResponseList } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

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
