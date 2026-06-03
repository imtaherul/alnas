"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleUserRound,
  Globe,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import type { Locale } from "@/lib/translations";

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "en" },
  { code: "ar", name: "العربية", flag: "ar" },
  { code: "bn", name: "বাংলা", flag: "bn" },
];

function UserMenu() {
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <CircleUserRound className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link
              href={
                user.role === "admin"
                  ? "/admin/dashboard"
                  : "/customer/dashboard"
              }
            >
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm" className="text-sm">
          Sign In
        </Button>
      </Link>
      <Link href="/register">
        <Button size="sm" className="text-sm">
          Register
        </Button>
      </Link>
    </div>
  );
}

export function Header() {
  const { locale, setLocale, t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: "Services" },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: t.nav.contact },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <header className="pointer-events-auto fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto w-full max-w-400 sm:max-w-screen-sm md:max-w-1xl lg:max-w-5xl px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="inline-flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">AlNas</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <UserMenu />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {currentLanguage?.flag}
                    </span>
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
            </div>

            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
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
              <div className="border-t border-border mt-2 pt-2 px-4 flex flex-col gap-2">
                <UserMenu />
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        locale === lang.code
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
