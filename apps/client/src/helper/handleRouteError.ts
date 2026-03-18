import { log } from '@devlog/logger';
import { FetchError } from '@devlog/request';
import { NextResponse } from 'next/server';

export function handleRouteError(
  e: unknown,
  context: string,
  attrs?: Record<string, boolean | number | string>,
) {
  const status =
    e instanceof FetchError && e.status >= 400 && e.status < 500
      ? e.status
      : 500;

  log.error(context, {
    error: e instanceof Error ? e.message : String(e),
    status,
    ...attrs,
  });

  return NextResponse.json(
    { message: `Failed to ${context.toLowerCase()}` },
    { status },
  );
}
