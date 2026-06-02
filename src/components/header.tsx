"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CircleUserRound, Globe, Menu, Search, X } from "lucide-react"
import type { Locale } from "@/lib/translations"

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "en" },
  { code: "ar", name: "العربية", flag: "ar" },
  { code: "bn", name: "বাংলা", flag: "bn" },
]

function UserMenu() {
  const [user, setUser] = useState<{ role: string } | null>(null)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => setUser(u))
      .catch(() => setUser(null))
  }, [])

  if (user) {
    return (
      <Link
        href={user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard"}
        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <>
      <Link href="/login">
        <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
      </Link>
      <Link href="/register">
        <Button size="sm" className="text-sm">Register</Button>
      </Link>
    </>
  )
}

export function Header() {
  const { locale, setLocale, t, dir } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: "Services" },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: t.nav.contact },
  ]

  const currentLanguage = languages.find((lang) => lang.code === locale)

  return (
    <header className="pointer-events-auto fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto w-full max-w-400 sm:max-w-screen-sm md:max-w-3xl lg:max-w-5xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">Alnas</span>
              <span className="block text-xs text-muted-foreground -mt-1">Digital Services</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <UserMenu />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentLanguage?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={dir === "rtl" ? "start" : "end"}>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={locale === lang.code ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-2 px-4 flex gap-2">
                <UserMenu />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
