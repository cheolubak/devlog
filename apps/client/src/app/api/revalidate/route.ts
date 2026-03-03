import type { NextRequest } from 'next/server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body: { name?: string[]; path?: string[] } = await req.json();

  body.name?.forEach((name) => {
    revalidateTag(name, { expire: 0 });
  });

  body.path?.forEach((path) => {
    revalidatePath(path, 'layout');
    revalidatePath(path, 'page');
  });

  return NextResponse.json({ message: 'ok' });
}
