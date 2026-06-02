import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const userId = searchParams.get("userId")
  const error = searchParams.get("error")
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  if (error || !secret || !userId) {
    return NextResponse.redirect(`${siteUrl}/login?error=${error || "oauth_failed"}`)
  }

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

  try {
    const res = await fetch(`${endpoint}/account/sessions/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": projectId,
        "X-Appwrite-Response-Format": "1.9.5",
      },
      body: JSON.stringify({ secret, userId }),
    })

    if (!res.ok) {
      const body = await res.json()
      return NextResponse.redirect(`${siteUrl}/login?error=${body.message || "oauth_callback_failed"}`)
    }

    const fallbackHeader = res.headers.get("x-fallback-cookies")
    if (!fallbackHeader) {
      return NextResponse.redirect(`${siteUrl}/login?error=no_fallback_cookies`)
    }

    const fallback: Record<string, string> = JSON.parse(fallbackHeader)
    const cookieName = `a_session_${projectId}`
    const cookieValue = fallback[cookieName]
    if (!cookieValue) {
      return NextResponse.redirect(`${siteUrl}/login?error=no_session_cookie`)
    }

    const cookieStore = await cookies()
    cookieStore.set(cookieName, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    return NextResponse.redirect(`${siteUrl}/customer/dashboard`)
  } catch (err) {
    return NextResponse.redirect(`${siteUrl}/login?error=oauth_exception`)
  }
}
