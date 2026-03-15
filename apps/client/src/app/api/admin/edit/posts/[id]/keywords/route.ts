import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const body = await req.json();

  if (
    !body ||
    !Array.isArray(body.keywords) ||
    body.keywords.some((keyword: unknown) => typeof keyword !== 'string')
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const res = await externalApi.put(
    `/posts/${id}/keywords`,
    {
      keywords: body.keywords,
    },
    {
      headers: getAdminApiHeaders(),
    },
  );

  return NextResponse.json(res);
}
