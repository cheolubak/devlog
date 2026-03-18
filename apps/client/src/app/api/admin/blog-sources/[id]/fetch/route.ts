import type { NextRequest } from 'next/server';

import { feedFetchResultSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { handleRouteError } from 'helper/handleRouteError';
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
    return handleRouteError(e, 'fetch feed', { id });
  }
}
