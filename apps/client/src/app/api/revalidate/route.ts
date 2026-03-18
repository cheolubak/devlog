import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: { name?: string[]; path?: string[] };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 },
    );
  }

  body.name?.forEach((name) => {
    revalidateTag(name, { expire: 0 });
  });

  body.path?.forEach((path) => {
    revalidatePath(path, 'layout');
    revalidatePath(path, 'page');
  });

  log.info('Revalidate', {
    names: body.name?.join(', ') ?? 'none',
    paths: body.path?.join(', ') ?? 'none',
  });

  return NextResponse.json({ message: 'ok' });
}
