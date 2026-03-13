import type { FeedFetchResult } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const res = await externalApi.post<FeedFetchResult>(
    `/feed-fetcher/fetch/${id}`,
  );

  return NextResponse.json(res);
}
