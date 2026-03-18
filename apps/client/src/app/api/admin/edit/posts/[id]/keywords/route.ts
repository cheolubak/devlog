import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const keywordsBodySchema = z.object({
  keywords: z.array(z.string()),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  const result = keywordsBodySchema.safeParse(
    await req.json().catch(() => null),
  );

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const res = await externalApi.put(
      `/posts/${id}/keywords`,
      result.data,
      {
        headers: getAdminApiHeaders(),
      },
    );

    return NextResponse.json(res);
  } catch (e) {
    log.error('PUT Admin Post Keywords', {
      error: e instanceof Error ? e.message : String(e),
      id,
    });
    return NextResponse.json(
      { message: 'Failed to update keywords' },
      { status: 500 },
    );
  }
}
