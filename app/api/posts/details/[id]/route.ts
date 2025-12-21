import { createClient } from '@devlog/database/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const client = await createClient();

  const { data, error } = await client.from('posts').select('*').eq('id', id);

  if (error) {
    return NextResponse.json({}, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({}, { status: 404 });
  }

  console.log(
    '=======Array.isArray(data) ? data.at(0) : data=======',
    Array.isArray(data) ? data.at(0) : data);
  return NextResponse.json(Array.isArray(data) ? data.at(0) : data);
}
