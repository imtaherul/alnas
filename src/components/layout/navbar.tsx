"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  Menu,
  X,
  ShoppingBag,
  User,
  LogOut,
  Package,
  Download,
  LayoutDashboard,
} from "lucide-react"

interface NavbarProps {
  user?: {
    name: string
    email: string
    role: string
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register")
  const isDashboard = pathname.startsWith("/customer") || pathname.startsWith("/admin")

  if (isAuthPage || isDashboard) return null

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Alnas</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link href={user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard"}>
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="mr-1 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <span className="text-sm text-gray-500">{user.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link href="/services" className="block py-2 text-sm font-medium text-gray-600">
              Services
            </Link>
            <Link href="/about" className="block py-2 text-sm font-medium text-gray-600">
              About
            </Link>
            <Link href="/blog" className="block py-2 text-sm font-medium text-gray-600">
              Blog
            </Link>
            <Link href="/faq" className="block py-2 text-sm font-medium text-gray-600">
              FAQ
            </Link>
            <Link href="/contact" className="block py-2 text-sm font-medium text-gray-600">
              Contact
            </Link>
            {user ? (
              <>
                <Link href={user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard"}
                  className="block py-2 text-sm font-medium text-primary-600">
                  Dashboard
                </Link>
                <form action="/api/logout" method="POST">
                  <button type="submit" className="block w-full text-left py-2 text-sm font-medium text-red-600">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-sm font-medium text-gray-600">Sign In</Link>
                <Link href="/register" className="block py-2 text-sm font-medium text-primary-600">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
