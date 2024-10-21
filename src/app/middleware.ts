import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add cache control headers for service worker
  const response = NextResponse.next();

  if (request.nextUrl.pathname === '/sw.js') {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: ['/sw.js'],
};