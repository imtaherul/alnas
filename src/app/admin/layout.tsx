import { getCurrentUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  if (user.role !== "admin") redirect("/customer/dashboard")

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
