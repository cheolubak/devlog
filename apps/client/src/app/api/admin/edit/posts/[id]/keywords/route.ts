import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
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

  const res = await externalApi.put(
    `/posts/${id}/keywords`,
    {
      keywords: body.keywords,
    },
    {
      headers: {
        'x-admin-api-key': process.env.AUTH_KEY!,
      },
    },
  );

  return NextResponse.json(res);
}
