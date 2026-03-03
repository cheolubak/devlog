import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { bffTemplate } from 'helper/bffTemplace';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return bffTemplate(req, async ({ accessToken, sessionId }) => {
    const { id } = await params;

    const headers: Record<string, string> = {
      sessionId,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    await externalApi.put(`/posts/${id}/view`, null, {
      headers,
    });

    revalidateTag('posts', { expire: 0 });
    revalidatePath('/');
    revalidatePath('/channel/[id]/contents');

    return NextResponse.json({});
  });
}
