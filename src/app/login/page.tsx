"use client"

import { useEffect } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button, Input } from "@/components/ui"
import { loginAction, type ActionState } from "@/lib/appwrite/actions"
import { ShoppingBag } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(loginAction, {} as ActionState)

  useEffect(() => {
    if ("success" in state && state.success) {
      router.push(state.role === "admin" ? "/admin/dashboard" : "/customer/dashboard")
    }
  }, [state, router])

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

          <form action={formAction} className="space-y-4">
            {"error" in state && state.error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{state.error}</div>
            )}
            <Input id="email" name="email" type="email" label="Email" placeholder="you@example.com" required autoComplete="email" />
            <Input id="password" name="password" type="password" label="Password" placeholder="Enter your password" required autoComplete="current-password" />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </PublicLayout>
  )
}
