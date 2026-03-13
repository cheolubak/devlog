import type { NextRequest } from 'next/server';

import { ACCESS_TOKEN_KEY } from 'constants/auth';
import { NextResponse } from 'next/server';

const REQUIRE_LOGIN_PATH: Readonly<Record<string, string>> = {
  '/bookmarks': '/mypage',
};

const STATE_CHANGING_METHODS = new Set([
  'DELETE',
  'PATCH',
  'POST',
  'PUT',
]);

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/api/') &&
    STATE_CHANGING_METHODS.has(req.method.toUpperCase()) &&
    !validateOrigin(req)
  ) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken && REQUIRE_LOGIN_PATH[pathname]) {
    return NextResponse.redirect(
      new URL(REQUIRE_LOGIN_PATH[pathname], req.url),
    );
  }

  return NextResponse.next();
}

function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');

  if (!origin) {
    return true;
  }

  const host = req.headers.get('host') ?? req.nextUrl.host;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
