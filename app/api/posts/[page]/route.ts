import { createClient } from '@devlog/database/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page: pageParam } = await params;

  const page = Number(pageParam);

  if (Number.isNaN(page)) {
    return NextResponse.json({}, { status: 500 });
  }

  const client = await createClient();
  const { data, error } = await client
    .from('posts')
    .select('*')
    .eq('is_display', true)
    .range((page - 1) * 20, page * 20);

  if (error) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json(data);
}
