export const TICKET_STATUSES = ["new", "open", "assigned", "inprocess", "replied", "reopened", "closed"] as const

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  open: "Open",
  assigned: "Assigned",
  inprocess: "Inprocess",
  replied: "Replied",
  reopened: "Reopened",
  closed: "Closed",
}

export const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  open: "bg-green-50 text-green-700 border-green-200",
  assigned: "bg-purple-50 text-purple-700 border-purple-200",
  inprocess: "bg-yellow-50 text-yellow-700 border-yellow-200",
  replied: "bg-cyan-50 text-cyan-700 border-cyan-200",
  reopened: "bg-orange-50 text-orange-700 border-orange-200",
  closed: "bg-red-50 text-red-700 border-red-200",
}

export const STATUS_COLORS_ACTIVE: Record<string, string> = {
  new: "bg-blue-600 text-white border-blue-600",
  open: "bg-green-600 text-white border-green-600",
  assigned: "bg-purple-600 text-white border-purple-600",
  inprocess: "bg-yellow-600 text-white border-yellow-600",
  replied: "bg-cyan-600 text-white border-cyan-600",
  reopened: "bg-orange-600 text-white border-orange-600",
  closed: "bg-red-600 text-white border-red-600",
}

export const ORDER_STATUSES = ["pending", "completed", "cancelled", "refunded"] as const

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  refunded: "bg-blue-50 text-blue-700 border-blue-200",
}

export const ORDER_STATUS_COLORS_ACTIVE: Record<string, string> = {
  pending: "bg-yellow-600 text-white border-yellow-600",
  completed: "bg-green-600 text-white border-green-600",
  cancelled: "bg-red-600 text-white border-red-600",
  refunded: "bg-blue-600 text-white border-blue-600",
}