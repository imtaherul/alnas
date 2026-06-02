"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, getTranslation, getDirection } from "@/lib/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: ReturnType<typeof getTranslation>
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && ["en", "ar", "bn"].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.dir = getDirection(newLocale)
    document.documentElement.lang = newLocale
  }

  useEffect(() => {
    document.documentElement.dir = getDirection(locale)
    document.documentElement.lang = locale
  }, [locale])

  const t = getTranslation(locale)
  const dir = getDirection(locale)

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
