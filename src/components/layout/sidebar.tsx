"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
  Download,
  FileText,
  MessageSquare,
} from "lucide-react"

interface SidebarProps {
  role: "admin" | "customer"
  className?: string
}

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: ShoppingBag },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

const customerLinks = [
  { href: "/customer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customer/orders", label: "My Orders", icon: Package },
  { href: "/customer/downloads", label: "Downloads", icon: Download },
  { href: "/customer/profile", label: "Profile", icon: Users },
]

export function Sidebar({ role, className }: SidebarProps) {
  const pathname = usePathname()
  const links = role === "admin" ? adminLinks : customerLinks

  return (
    <div className={cn("flex h-full w-full flex-col bg-sidebar", className)}>
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <ShoppingBag className="h-6 w-6 text-primary-400" />
        <span className="text-lg font-bold text-white">Alnas</span>
      </Link>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary-600 text-white"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-gray-700 px-3 py-4">
        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
