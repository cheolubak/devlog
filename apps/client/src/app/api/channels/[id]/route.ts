import type { NextRequest } from 'next/server';

import { blogSourceSchema } from '@devlog/domains';
import { log } from '@devlog/logger';
import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const parsed = blogSourceSchema.parse(
      await externalApi.get(`/blog-sources/${id}`),
    );

    return NextResponse.json({
      ...parsed,
      icon: parsed.icon
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${parsed.icon.startsWith('/') ? parsed.icon : `/${parsed.icon}`}`
        : null,
    });
  } catch (e) {
    log.error('GET Channel', {
      error: e instanceof Error ? e.message : String(e),
      id,
    });
    return NextResponse.json(
      { message: 'Failed to fetch channel' },
      { status: 500 },
    );
  }
}
