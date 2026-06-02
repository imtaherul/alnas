"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OAuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const secret = params.get("secret")
    const userId = params.get("userId")
    const error = params.get("error")

    if (error || !secret || !userId) {
      router.replace(`/login?error=${error || "oauth_failed"}`)
      return
    }

    // Redirect to server endpoint that exchanges the secret for a session cookie
    window.location.href = `/api/auth/oauth/callback?secret=${encodeURIComponent(secret)}&userId=${encodeURIComponent(userId)}`
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Completing sign in...</p>
    </div>
  )
}
