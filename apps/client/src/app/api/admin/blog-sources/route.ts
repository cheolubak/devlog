import type { NextRequest } from 'next/server';

import { blogSourceSchema } from '@devlog/domains';
import { externalApi } from '@devlog/request';
import { getAdminApiHeaders } from 'helper/adminApiHeaders';
import { handleRouteError } from 'helper/handleRouteError';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const BLOG_SOURCE_TYPE_MAP: Record<string, string> = {
  BLOG: 'blogs',
  YOUTUBE: 'youtubes',
};

export async function GET(req: NextRequest) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = req.nextUrl;

  const type = searchParams.get('type') ?? 'BLOG';

  try {
    const res = await externalApi.get(
      `/blog-sources/${BLOG_SOURCE_TYPE_MAP[type] ?? 'blogs'}`,
      {
        headers: getAdminApiHeaders(),
      },
    );

    const parsed = z.array(blogSourceSchema).parse(res);

    return NextResponse.json(parsed);
  } catch (e) {
    return handleRouteError(e, 'fetch blog sources', { type });
  }
}
