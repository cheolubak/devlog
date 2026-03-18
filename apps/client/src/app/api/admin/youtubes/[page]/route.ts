import type { NextRequest } from 'next/server';

import {
  postListAllSchema,
  responseListSchema,
} from '@devlog/domains';
import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
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

  try {
    const res = await externalApi.get('posts/all', {
      headers: getAdminApiHeaders(),
      params: {
        isDisplay,
        offset: page,
        type: ['YOUTUBE'],
      },
    });

    const parsed = responseListSchema(postListAllSchema).parse(res);

    return NextResponse.json(parsed);
  } catch (e) {
    log.error('GET Admin Youtubes', {
      error: e instanceof Error ? e.message : String(e),
      page,
    });
    return NextResponse.json(
      { message: 'Failed to fetch youtubes' },
      { status: 500 },
    );
  }
}
