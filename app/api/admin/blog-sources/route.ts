import type { BlogSource } from '@devlog/domain';

import { externalApi } from '@devlog/request';
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await externalApi.get<BlogSource[]>('/blog-sources');

  return NextResponse.json(res);
}
