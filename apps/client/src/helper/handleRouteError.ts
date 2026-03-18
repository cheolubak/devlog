import { log } from '@devlog/logger';
import { NextResponse } from 'next/server';

export function handleRouteError(
  e: unknown,
  context: string,
  attrs?: Record<string, unknown>,
) {
  log.error(context, {
    error: e instanceof Error ? e.message : String(e),
    ...attrs,
  });

  return NextResponse.json(
    { message: `Failed to ${context.toLowerCase()}` },
    { status: 500 },
  );
}
