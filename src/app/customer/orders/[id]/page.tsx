import { Card, CardContent } from "@/components/ui";
import { formatPrice, formatDate } from "@/lib/utils";
import { adminDatabases } from "@/lib/appwrite/admin";
import { DATABASE_ID, COLLECTIONS } from "@/lib/appwrite/collections";
import { getCurrentUser } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/ticket-status";
import { getMyOrderMessages } from "@/lib/appwrite/queries";
import { ChatBox } from "@/app/admin/orders/[id]/chat-box";
import { StatusDropdown } from "@/components/shared/status-dropdown";
import {
  TICKET_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_COLORS_ACTIVE,
} from "@/lib/ticket-status";
import Image from "next/image";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  let order: any;
  try {
    order = await adminDatabases.getDocument(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      id,
    );
    if (order.userId !== user.$id) redirect("/customer/orders");
  } catch {
    redirect("/customer/orders");
  }

  const items =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;
  const { messages } = await getMyOrderMessages(id);
  const statusColor =
    ORDER_STATUS_COLORS[order.status] ||
    "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
        <p className="mt-1 text-gray-500">Order #{order.$id.slice(0, 8)}</p>
      </div>

      <Card>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
            <p className="text-sm text-gray-500">
              {formatDate(order.$createdAt)}
            </p>
            <span
              className={`self-start rounded-full border px-3 py-1 text-xs font-medium ${statusColor}`}
            >
              {ORDER_STATUS_LABELS[order.status] || order.status}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3 gap-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {item.type}
                    </p>
                  </div>
                </div>
                <p className="font-medium shrink-0">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="font-semibold text-gray-900">Total</p>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(order.total)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Support Chat</h2>
              <p className="text-xs text-gray-500">
                Send messages and attachments about this order
              </p>
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
          <ChatBox
            orderId={id}
            initialMessages={JSON.parse(JSON.stringify(messages))}
            viewerRole="customer"
          />
        </CardContent>
      </Card>

      {/* Infinite Image Scroll */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trusted Partners
        </h3>
        <div className="mx-auto grid place-items-center overflow-hidden">
          <div className="flex h-40 w-full items-center justify-center p-3 space-x-2 animate-scroll">
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
              36, 37, 38,
            ].map((index) => (
              <img
                key={`partner-${index}`}
                src={`/infinite/${index + 1 < 10 ? "0" : ""}${index + 1}.svg`}
                alt={`Partner ${index + 1}`}
                className="h-40 w-60 object-contain opacity-70 hover:opacity-100 transition-opacity "
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Small Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Alnas. All rights reserved.
        </p>
      </div>
    </div>
  );
}
