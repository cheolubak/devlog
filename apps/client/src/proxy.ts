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

const RATE_LIMITS: Record<string, { max: number; window: number }> = {
  auth: { max: 10, window: 60_000 },
  mutation: { max: 30, window: 60_000 },
  revalidate: { max: 5, window: 60_000 },
};

const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number }
>();

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  if (
    pathname.startsWith('/api/') &&
    STATE_CHANGING_METHODS.has(method) &&
    !validateOrigin(req)
  ) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const rateLimitCategory = getRateLimitCategory(pathname, method);
  if (rateLimitCategory) {
    const ip = getClientIp(req);
    if (isRateLimited(ip, rateLimitCategory)) {
      cleanupRateLimitStore();
      return NextResponse.json(
        { message: 'Too Many Requests' },
        { status: 429 },
      );
    }
  }

  const accessToken = req.cookies.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken && REQUIRE_LOGIN_PATH[pathname]) {
    return NextResponse.redirect(
      new URL(REQUIRE_LOGIN_PATH[pathname], req.url),
    );
  }

  return NextResponse.next();
}

function cleanupRateLimitStore() {
  if (rateLimitStore.size < 1000) return;

  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function getRateLimitCategory(
  pathname: string,
  method: string,
): null | string {
  if (pathname.startsWith('/auth/')) return 'auth';
  if (pathname === '/api/revalidate') return 'revalidate';
  if (
    pathname.startsWith('/api/') &&
    STATE_CHANGING_METHODS.has(method)
  ) {
    return 'mutation';
  }
  return null;
}

function isRateLimited(ip: string, category: string): boolean {
  const key = `${ip}:${category}`;
  const now = Date.now();
  const limit = RATE_LIMITS[category];
  if (!limit) return false;

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + limit.window });
    return false;
  }

  entry.count++;
  return entry.count > limit.max;
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
