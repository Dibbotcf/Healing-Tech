import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https: http://localhost:8055",
  "media-src 'self' blob: https: http://localhost:8055",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.openstreetmap.org",
  "connect-src 'self' https://*.facebook.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://cloudflareinsights.com https://*.on.aws https://*.run.app",
  "worker-src 'self' blob:",
].join('; ')

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Fix Webpack/Next.js Path Configuration Bug where chunks are requested with /_next//_next/
  if (url.pathname.startsWith('/_next/_next/')) {
    url.pathname = url.pathname.replace('/_next/_next/', '/_next/')
    return NextResponse.rewrite(url)
  }

  // Subdomain routing: cms.healingtechnology.com.bd → /admin
  if (hostname.startsWith('cms.')) {
    if (!url.pathname.startsWith('/admin') && !url.pathname.startsWith('/api')) {
      url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`
      const res = NextResponse.rewrite(url)
      res.headers.set('Content-Security-Policy', CSP)
      return res
    }
  }

  const res = NextResponse.next()
  res.headers.set('Content-Security-Policy', CSP)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|media).*)'],
}
