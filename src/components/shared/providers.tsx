"use client"

import type React from "react"
import { Toaster } from "react-hot-toast"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" />
      </AuthProvider>
    </LanguageProvider>
  )
}
