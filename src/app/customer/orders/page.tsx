import Link from "next/link"
import { getMyOrders } from "@/lib/appwrite/queries"
import { Card, CardContent, Badge } from "@/components/ui"
import { formatPrice, formatDate } from "@/lib/utils"

export default async function CustomerOrders() {
  const { orders } = await getMyOrders()

  const statusVariant = (status: string) => {
    switch (status) {
      case "completed": return "success"
      case "pending": return "warning"
      case "cancelled": return "danger"
      case "refunded": return "info"
      default: return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-gray-500">View all your orders</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {orders.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {orders.map((order: any) => (
                <Link
                  key={order.$id}
                  href={`/customer/orders/${order.$id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-gray-900">
                        {order.items
                          ? JSON.parse(order.items).map((i: any) => i.name).join(", ")
                          : "Order"}
                      </p>
                      <Badge variant={statusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{formatDate(order.$createdAt)}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(order.total)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No orders yet</p>
              <Link href="/" className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500">
                Browse services
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
