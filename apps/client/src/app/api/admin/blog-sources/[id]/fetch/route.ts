import type { NextRequest } from 'next/server';

import { feedFetchResultSchema } from '@devlog/domains';
import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    const res = await externalApi.post(
      `/feed-fetcher/fetch/${id}`,
      null,
      {
        headers: getAdminApiHeaders(),
      },
    );

    const parsed = feedFetchResultSchema.parse(res);

    return NextResponse.json(parsed);
  } catch (e) {
    log.error('POST Admin Feed Fetch', {
      error: e instanceof Error ? e.message : String(e),
      id,
    });
    return NextResponse.json(
      { message: 'Failed to fetch feed' },
      { status: 500 },
    );
  }
}
