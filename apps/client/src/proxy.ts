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
    // 브라우저는 same-origin 요청에서 Origin 헤더를 생략할 수 있음
    // cross-origin 요청은 항상 Origin을 포함하므로 이 분기는 안전
    return true;
  }

  const host = req.headers.get('host') ?? req.nextUrl.host;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
