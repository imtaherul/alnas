import { getCurrentUser } from "@/lib/server-utils"
import { getMyOrders, getMyDownloads } from "@/lib/appwrite/queries"
import { Card, CardContent, CardHeader } from "@/components/ui"
import { formatPrice, formatDate } from "@/lib/utils"
import { Package, Download, Clock } from "lucide-react"

export default async function CustomerDashboard() {
  const user = await getCurrentUser()
  const { orders } = await getMyOrders()
  const { downloads } = await getMyDownloads()

  const totalSpent = orders.reduce((sum: number, o: any) => sum + o.total, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-1 text-gray-500">Manage your purchases and downloads</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary-100 p-3">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-green-100 p-3">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{downloads.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-purple-100 p-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalSpent)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order: any) => (
                <div key={order.$id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.items ? JSON.parse(order.items).map((i: any) => i.name).join(", ") : "Order"}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(order.$createdAt)}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">No orders yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
