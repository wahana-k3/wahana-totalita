import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import pageRoutesData from './data/page_routes.json';

const HOSTINGER_ORIGIN = 'https://origen.wahanatotalita.com';

interface PageRoutesConfig {
  routes: Record<string, string>;
  default: string;
}

const pageRoutes = pageRoutesData as PageRoutesConfig;

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Normalize path with and without trailing slash for robust lookup
  const pathWithSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const pathWithoutSlash = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  // Look up destination in routes mapping
  const destination =
    pageRoutes.routes[pathWithSlash] ||
    pageRoutes.routes[pathWithoutSlash] ||
    pageRoutes.routes[pathname] ||
    pageRoutes.default;

  // 1. If value is "vercel", let Next.js handle it normally
  if (destination === 'vercel') {
    return NextResponse.next();
  }

  // 2. Non-GET requests (POST, forms, etc.) -> proxy directly without caching
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const targetUrl = new URL(`${pathname}${search}`, HOSTINGER_ORIGIN);
    return NextResponse.rewrite(targetUrl);
  }

  // 3. For GET requests marked "hostinger" (or default), fetch and cache at Vercel Edge for 5 minutes
  const targetUrl = new URL(`${pathname}${search}`, HOSTINGER_ORIGIN);

  try {
    const upstreamResponse = await fetch(targetUrl.toString(), {
      headers: {
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'id,en-US;q=0.9,en;q=0.8',
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'X-Forwarded-Host': request.headers.get('host') || 'wahanatotalita.com',
      },
      method: 'GET',
      redirect: 'follow',
    });

    const responseHeaders = new Headers(upstreamResponse.headers);

    // Cache at Vercel Edge for 5 minutes (300s), background refresh within 10 minutes (600s)
    responseHeaders.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.rewrite(targetUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for Next.js internal static assets
     */
    '/((?!_next/static|_next/image).*)',
  ],
};
