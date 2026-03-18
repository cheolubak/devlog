import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { verifyAdmin } from 'helper/verifyAdmin';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const postEditBodySchema = z.object({
  isDisplay: z.boolean(),
});

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  try {
    await externalApi.delete(`/posts/${id}`, {
      headers: getAdminApiHeaders(),
    });

    revalidateTag('posts', {
      expire: 0,
    });
    revalidatePath('/');

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    log.error('DELETE Admin Post', {
      error: e instanceof Error ? e.message : String(e),
      id,
    });
    return NextResponse.json(
      { message: 'Failed to delete post' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const result = postEditBodySchema.safeParse(await req.json().catch(() => null));

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const payload = result.data;

  try {
    await externalApi.patch(`/posts/${id}/display`, payload, {
      headers: getAdminApiHeaders(),
    });

    revalidateTag('posts', {
      expire: 0,
    });
    revalidatePath('/');

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    log.error('PATCH Admin Post', {
      error: e instanceof Error ? e.message : String(e),
      id,
    });
    return NextResponse.json(
      { message: 'Failed to update post' },
      { status: 500 },
    );
  }
}
