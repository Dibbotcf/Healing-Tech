import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Subdomain routing for CMS
  if (hostname.startsWith('cms.')) {
    // Only rewrite if we aren't already requesting an API/admin mapped path
    if (!url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api')) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|media).*)'],
}
