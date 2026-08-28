import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import pageRoutesData from './data/page_routes.json';

const HOSTINGER_ORIGIN = 'https://origen.wahanatotalita.com';

// Build a fast lookup set of all Vercel/Next.js paths
const vercelRoutesSet = new Set(
  Object.entries(pageRoutesData.routes || {})
    .filter(([_, dest]) => dest === 'vercel')
    .map(([path]) => path.toLowerCase())
);

// Explicit core paths that MUST always be handled by Next.js
const CORE_NEXTJS_PREFIXES = [
  '/tools',
  '/artikel',
  '/jadwal',
  '/csms',
  '/galeri',
  '/perusahaan',
  '/perpanjangan-skp',
  '/layanan-pemerintah',
  '/glosarium',
  '/insiden',
  '/verifikasi',
  '/lowongan',
  '/resources',
  '/forum',
  '/pelatihan-k3-'
];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lowerPath = pathname.toLowerCase();

  // 1. Homepage MUST always be handled by Next.js
  if (lowerPath === '/' || lowerPath === '') {
    return NextResponse.next();
  }

  // 2. Exact match in page-routes.json mapping
  const pathWithSlash = lowerPath.endsWith('/') ? lowerPath : `${lowerPath}/`;
  const pathWithoutSlash = lowerPath.endsWith('/') && lowerPath.length > 1 ? lowerPath.slice(0, -1) : lowerPath;

  if (
    vercelRoutesSet.has(lowerPath) ||
    vercelRoutesSet.has(pathWithSlash) ||
    vercelRoutesSet.has(pathWithoutSlash)
  ) {
    return NextResponse.next();
  }

  // 3. Core Next.js feature prefixes
  if (CORE_NEXTJS_PREFIXES.some(prefix => lowerPath.startsWith(prefix))) {
    return NextResponse.next();
  }

  // 4. Any unmapped / legacy / 404 routes fall through to Hostinger origin transparently
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
