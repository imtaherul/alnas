import { getOrders, getAdminServices } from "@/lib/appwrite/queries"
import { adminUsers } from "@/lib/appwrite/admin"
import { Card, CardContent } from "@/components/ui"
import { Package, ShoppingBag, Users as UsersIcon, DollarSign } from "lucide-react"

export default async function AdminDashboard() {
  const { orders } = await getOrders()
  const { services } = await getAdminServices()

  let userCount = 0
  try {
    const users = await adminUsers.list()
    userCount = users.total
  } catch {}

  const totalRevenue = orders.reduce((sum: number, o: any) =>
    o.status !== "cancelled" ? sum + Number(o.total) : sum, 0
  )

  const pendingOrders = orders.filter((o: any) => o.status === "pending").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-gray-500">Overview of your marketplace</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-blue-100 p-3">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-yellow-100 p-3">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-purple-100 p-3">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-green-100 p-3">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="/admin/services"
              className="rounded-xl border border-gray-200 p-4 text-center hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <ShoppingBag className="mx-auto h-8 w-8 text-primary-600" />
              <p className="mt-2 font-medium text-gray-900">Manage Services</p>
              <p className="text-sm text-gray-500">Add or edit your services</p>
            </a>
            <a
              href="/admin/orders"
              className="rounded-xl border border-gray-200 p-4 text-center hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <Package className="mx-auto h-8 w-8 text-primary-600" />
              <p className="mt-2 font-medium text-gray-900">View Orders</p>
              <p className="text-sm text-gray-500">Process customer orders</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
