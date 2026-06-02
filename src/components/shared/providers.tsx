"use client"

import type React from "react"
import { Toaster } from "react-hot-toast"
import { LanguageProvider } from "@/contexts/language-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster position="top-right" />
    </LanguageProvider>
  )
}
