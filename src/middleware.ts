import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import noindexPages from '../noindex-pages.json';

// Pre-build set of paths matching with and without trailing slash for fast O(1) lookup
const noindexSet = new Set<string>();
for (const rawPath of (noindexPages.paths || [])) {
  if (!rawPath) continue;
  noindexSet.add(rawPath);
  if (rawPath === '/') continue;
  if (rawPath.endsWith('/')) {
    noindexSet.add(rawPath.slice(0, -1));
  } else {
    noindexSet.add(`${rawPath}/`);
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add Security & Performance Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // Conditional X-Robots-Tag: only set on matched noindex paths
  const pathname = request.nextUrl.pathname;
  if (noindexSet.has(pathname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for Next.js internal static assets & api
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
