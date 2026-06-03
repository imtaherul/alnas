import Link from "next/link";
import { getOrder, getOrderMessages } from "@/lib/appwrite/queries";
import { Card, CardContent } from "@/components/ui";
import { formatPrice, formatDate } from "@/lib/utils";
import { ChatBox } from "./chat-box";
import { StatusDropdown } from "@/components/shared/status-dropdown";
import {
  TICKET_STATUSES,
  STATUS_LABELS,
  STATUS_COLORS,
  STATUS_COLORS_ACTIVE,
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_COLORS_ACTIVE,
} from "@/lib/ticket-status";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetail({ params }: PageProps) {
  const { id } = await params;
  const { order } = await getOrder(id);
  const { messages } = await getOrderMessages(id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Order not found</p>
        <Link
          href="/admin/orders"
          className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const items =
    typeof order.items === "string"
      ? JSON.parse(order.items)
      : order.items || [];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/orders"
          className="text-sm text-primary-600 hover:text-primary-500 mb-2 inline-block"
        >
          &larr; Back to orders
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order.$id.slice(0, 8)}
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-medium text-gray-900">
                {order.customerName || order.userId}
              </p>
              <p className="text-sm text-gray-500">{order.customerEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                {formatDate(order.$createdAt)}
              </p>
              <StatusDropdown
                orderId={id}
                currentStatus={order.status}
                statuses={ORDER_STATUSES}
                labels={ORDER_STATUS_LABELS}
                colors={ORDER_STATUS_COLORS}
                colorsActive={ORDER_STATUS_COLORS_ACTIVE}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {item.type}
                    </p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(item.price)}</p>
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
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">Support Chat</h2>
              <p className="text-xs text-gray-500">Communicate with customer</p>
            </div>
            <StatusDropdown
              orderId={id}
              currentStatus={order.ticketStatus || "new"}
              statuses={TICKET_STATUSES}
              labels={STATUS_LABELS}
              colors={STATUS_COLORS}
              colorsActive={STATUS_COLORS_ACTIVE}
              field="ticketStatus"
            />
          </div>
          <ChatBox
            orderId={id}
            initialMessages={JSON.parse(JSON.stringify(messages))}
          />
        </CardContent>
      </Card>

      {/* Infinite Image Scroll */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Trusted Partners
        </h3>
        <div className="overflow-hidden">
          <div className="flex space-x-8 animate-scroll">
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
              35, 36, 37, 38, 39, 40,
            ].map((index) => (
              <Image
                key={`partner-${index}`}
                src={`/working/${index + 1 < 10 ? "0" : ""}${index + 1}.svg`}
                alt={`Partner ${index + 1}`}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div> */}

      {/* Small Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Alnas. All rights reserved.
        </p>
      </div>
    </div>
  );
}
