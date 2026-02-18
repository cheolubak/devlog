import type { BlogSource } from '@devlog/domain';
import type { NextRequest } from 'next/server';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

const BLOG_SOURCE_TYPE_MAP: Record<string, string> = {
  BLOG: 'blogs',
  YOUTUBE: 'youtubes',
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const type = searchParams.get('type') ?? 'BLOG';

  const res = await externalApi.get<BlogSource[]>(
    `/blog-sources/${BLOG_SOURCE_TYPE_MAP[type] ?? 'blogs'}`,
  );

  return NextResponse.json(res);
}
