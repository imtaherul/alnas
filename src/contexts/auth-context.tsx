"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { loginAction as serverLogin, registerAction as serverRegister } from "@/lib/appwrite/actions"

type User = {
  $id: string
  name: string
  email: string
  role: "admin" | "customer"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = useCallback(async (email: string, password: string) => {
    setError(null)
    const formData = new FormData()
    formData.set("email", email)
    formData.set("password", password)

    const result = await serverLogin({}, formData)

    if ("error" in result && result.error) {
      setError(result.error)
      throw new Error(result.error)
    }

    await fetchUser()

    const role = result.role as string
    router.push(role === "admin" ? "/admin/dashboard" : "/customer/dashboard")
  }, [fetchUser, router])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setError(null)
    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("password", password)
    formData.set("confirmPassword", password)

    const result = await serverRegister({}, formData)

    if ("error" in result && result.error) {
      setError(result.error)
      throw new Error(result.error)
    }

    await fetchUser()
    router.push("/customer/dashboard")
  }, [fetchUser, router])

  const logout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST" })
    setUser(null)
    router.push("/")
    router.refresh()
  }, [router])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
