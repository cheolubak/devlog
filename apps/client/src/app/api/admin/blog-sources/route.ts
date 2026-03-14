import type { BlogSource } from '@devlog/domains';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { verifyAdmin } from 'helper/verifyAdmin';
import { NextResponse } from 'next/server';

const BLOG_SOURCE_TYPE_MAP: Record<string, string> = {
  BLOG: 'blogs',
  YOUTUBE: 'youtubes',
};

export async function GET(req: NextRequest) {
  const unauthorized = await verifyAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = req.nextUrl;

  const type = searchParams.get('type') ?? 'BLOG';

  const res = await externalApi.get<BlogSource[]>(
    `/blog-sources/${BLOG_SOURCE_TYPE_MAP[type] ?? 'blogs'}`,
    {
      headers: {
        'x-admin-api-key': process.env.AUTH_KEY!,
      },
    },
  );

  return NextResponse.json(res);
}
