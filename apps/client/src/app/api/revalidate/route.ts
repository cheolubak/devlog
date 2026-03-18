import type { NextRequest } from 'next/server';

import { log } from '@devlog/logger';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isValidBody = (
  value: unknown,
): value is { name?: string[]; path?: string[] } => {
  if (!value || typeof value !== 'object') return false;
  const obj = value as { name?: unknown; path?: unknown };
  return (
    (obj.name === undefined || isStringArray(obj.name)) &&
    (obj.path === undefined || isStringArray(obj.path))
  );
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let body: { name?: string[]; path?: string[] };

  try {
    const raw: unknown = await req.json();
    if (!isValidBody(raw)) {
      return NextResponse.json(
        { message: 'Invalid request body' },
        { status: 400 },
      );
    }
    body = raw;
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
