import type { BlogSource } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const res = await externalApi.get<BlogSource>(`/blog-sources/${id}`);

  return NextResponse.json({
    ...res,
    icon: `${process.env.NEXT_PUBLIC_IMAGE_URL_PREFIX}${res.icon?.startsWith('/') ? res.icon : `/${res.icon}`}`,
  });
}
