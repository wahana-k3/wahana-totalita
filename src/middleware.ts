import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import pageRoutesData from './data/page_routes.json';

const HOSTINGER_ORIGIN = 'https://origen.wahanatotalita.com';

interface PageRoutesConfig {
  routes: Record<string, string>;
  default: string;
}

const pageRoutes = pageRoutesData as PageRoutesConfig;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Normalize path variations (with and without trailing slash)
  const pathWithSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const pathWithoutSlash = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  // Look up destination in routes mapping
  const destination =
    pageRoutes.routes[pathWithSlash] ||
    pageRoutes.routes[pathWithoutSlash] ||
    pageRoutes.routes[pathname] ||
    pageRoutes.default;

  // 1. If destination is 'vercel', let Next.js handle it normally
  if (destination === 'vercel') {
    return NextResponse.next();
  }

  // 2. If destination is 'hostinger' (or default), transparently proxy/rewrite to Hostinger origin
  const targetUrl = new URL(`${pathname}${search}`, HOSTINGER_ORIGIN);
  return NextResponse.rewrite(targetUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static chunks)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - local images in /images
     * - static asset files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|xml|txt)$).*)',
  ],
};
