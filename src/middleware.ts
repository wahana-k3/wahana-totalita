import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add Security, Performance & Noindex Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

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
