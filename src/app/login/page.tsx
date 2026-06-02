"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button, Input } from "@/components/ui"
import { useAuth } from "@/contexts/auth-context"
import { OAuthProvider } from "appwrite"
import { account } from "@/lib/appwrite/config"
import { ShoppingBag } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { user, loading: authLoading, login, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlError = params.get("error")
    if (urlError) {
      const decoded = decodeURIComponent(urlError)
      setLocalError(decoded)
      router.replace("/login", { scroll: false })
    }
  }, [router])

  useEffect(() => {
    if (error) setLocalError(error)
  }, [error])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setLocalError("Email and password are required")
      return
    }
    setSubmitting(true)
    setLocalError(null)
    clearError()
    try {
      await login(email, password)
    } catch {
      setLocalError(error || "Invalid email or password")
    } finally {
      setSubmitting(false)
    }
  }

  function handleGoogleLogin() {
    const { origin } = window.location
    const callbackUrl = `${origin}/auth/callback`
    const failureUrl = `${origin}/login?error=oauth_failed`
    account.createOAuth2Token(OAuthProvider.Google, callbackUrl, failureUrl)
  }

  if (authLoading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
          <div className="text-gray-500">Checking session...</div>
        </div>
      </PublicLayout>
    )
  }

  if (user) return null

  return (
    <PublicLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">Alnas</span>
            </Link>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">Sign in to your account</h1>
            <p className="mt-1 text-sm text-gray-500">
              Or{" "}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">create a new account</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(localError) && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{localError}</div>
            )}
            <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input id="password" name="password" type="password" label="Password" placeholder="Enter your password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
              <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Or continue with</span></div>
            </div>

            <div className="mt-4">
              <button type="button" onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
