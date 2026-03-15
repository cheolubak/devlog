import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { verifyAdmin } from 'helper/verifyAdmin';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  await externalApi.delete(`/posts/${id}`, {
    headers: getAdminApiHeaders(),
  });

  revalidateTag('posts', {
    expire: 0,
  });
  revalidatePath('/');

  return NextResponse.json({ message: 'success' });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const body: { isDisplay: boolean } = await req.json();

  await externalApi.patch(`/posts/${id}/display`, body, {
    headers: getAdminApiHeaders(),
  });

  revalidateTag('posts', {
    expire: 0,
  });
  revalidatePath('/');

  return NextResponse.json({ message: 'success' });
}
