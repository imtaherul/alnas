import { Card, CardContent } from "@/components/ui"
import { formatPrice, formatDate } from "@/lib/utils"
import { adminDatabases } from "@/lib/appwrite/admin"
import { DATABASE_ID, COLLECTIONS } from "@/lib/appwrite/collections"
import { getCurrentUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/ticket-status"
import { getMyOrderMessages } from "@/lib/appwrite/queries"
import { ChatBox } from "@/app/admin/orders/[id]/chat-box"
import { StatusDropdown } from "@/components/shared/status-dropdown"
import { TICKET_STATUSES, STATUS_LABELS, STATUS_COLORS, STATUS_COLORS_ACTIVE } from "@/lib/ticket-status"

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) redirect("/login")

  let order: any
  try {
    order = await adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.ORDERS, id)
    if (order.userId !== user.$id) redirect("/customer/orders")
  } catch {
    redirect("/customer/orders")
  }

  const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items
  const { messages } = await getMyOrderMessages(id)
  const statusColor = ORDER_STATUS_COLORS[order.status] || "bg-gray-50 text-gray-700 border-gray-200"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
        <p className="mt-1 text-gray-500">Order #{order.$id.slice(0, 8)}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{formatDate(order.$createdAt)}</p>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColor}`}>
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="font-semibold text-gray-900">Total</p>
            <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
          </div>
        </CardContent>
      </Card>

       <Card>
         <CardContent className="p-0">
           <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
             <div>
               <h2 className="font-semibold text-gray-900">Support Chat</h2>
               <p className="text-xs text-gray-500">Send messages and attachments about this order</p>
             </div>
             <StatusDropdown
               orderId={id}
               currentStatus={order.ticketStatus || "new"}
               statuses={TICKET_STATUSES}
               labels={STATUS_LABELS}
               colors={STATUS_COLORS}
               colorsActive={STATUS_COLORS_ACTIVE}
               field="ticketStatus"
               disabled={true}
             />
           </div>
           <ChatBox orderId={id} initialMessages={JSON.parse(JSON.stringify(messages))} viewerRole="customer" />
         </CardContent>
       </Card>
    </div>
  )
}
