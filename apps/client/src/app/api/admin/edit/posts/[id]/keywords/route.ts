import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await req.json();

  const res = await externalApi.put(`/posts/${id}/keywords`, {
    keywords: body.keywords,
  });

  return NextResponse.json(res);
}
