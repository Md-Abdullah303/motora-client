import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that require authentication here
const protectedPaths = [
  '/dashboard',
  '/payment'
]

// Add paths that are only for unauthenticated users here
const publicOnlyPaths = [
  '/login',
  '/signup'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // better-auth stores session token in cookies
  // The exact cookie name depends on your better-auth config, commonly 'better-auth.session_token'
  const sessionToken = request.cookies.get('better-auth.session_token')?.value || 
                       request.cookies.get('__Secure-better-auth.session_token')?.value

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isPublicOnlyPath = publicOnlyPaths.some(path => pathname.startsWith(path))

  // If user is trying to access a protected route without a session, redirect to login
  if (isProtectedPath && !sessionToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // If user is already logged in and tries to access login/signup, redirect to dashboard or home
  if (isPublicOnlyPath && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
