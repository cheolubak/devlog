import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await externalApi.delete(`/posts/${id}`);

  return NextResponse.json({ message: 'success' });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body: { isDisplay: boolean } = await req.json();

  await externalApi.patch(`/posts/${id}/display`, body);

  return NextResponse.json({ message: 'success' });
}
