import Link from "next/link"
import { getOrders } from "@/lib/appwrite/queries"
import { Card, CardContent } from "@/components/ui"
import { formatPrice, formatDate } from "@/lib/utils"
import { StatusDropdown } from "@/components/shared/status-dropdown"
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_COLORS_ACTIVE,
} from "@/lib/ticket-status"

export default async function AdminOrders() {
  const { orders } = await getOrders()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-gray-500">Manage customer orders</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Items</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Total</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order: any) => (
                    <tr key={order.$id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/admin/orders/${order.$id}`} className="block cursor-pointer">
                          <p className="font-medium text-gray-900 hover:text-primary-600">{order.customerName || order.userId}</p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <Link href={`/admin/orders/${order.$id}`} className="block cursor-pointer">
                          {order.items
                            ? JSON.parse(order.items).map((i: any) => i.name).join(", ")
                            : "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/admin/orders/${order.$id}`} className="block cursor-pointer">
                          {formatPrice(order.total)}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <StatusDropdown
                          orderId={order.$id}
                          currentStatus={order.status}
                          statuses={ORDER_STATUSES}
                          labels={ORDER_STATUS_LABELS}
                          colors={ORDER_STATUS_COLORS}
                          colorsActive={ORDER_STATUS_COLORS_ACTIVE}
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        <Link href={`/admin/orders/${order.$id}`} className="block cursor-pointer">
                          {formatDate(order.$createdAt)}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No orders yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}