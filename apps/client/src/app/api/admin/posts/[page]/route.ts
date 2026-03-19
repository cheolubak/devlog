import type { NextRequest } from 'next/server';

import { postListAllSchema, responseListSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { handleRouteError } from 'helper/handleRouteError';
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
        type: ['RSS', 'ATOM', 'SCRAPING'],
      },
    });

    const parsed = responseListSchema(postListAllSchema).parse(res);

    return NextResponse.json(parsed);
  } catch (e) {
    return handleRouteError(e, 'fetch posts', { page });
  }
}
