import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function getSessionCookieName(): string {
  return `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get(getSessionCookieName())?.value
  const isAuthenticated = !!sessionCookie

  // Protect admin and customer routes
  if ((pathname.startsWith("/admin") || pathname.startsWith("/customer")) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/login", "/register"],
}
