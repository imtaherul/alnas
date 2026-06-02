"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateOrderStatus, updateTicketStatus } from "@/lib/appwrite/actions"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface StatusDropdownProps {
  orderId: string
  currentStatus: string
  statuses: readonly string[]
  labels: Record<string, string>
  colors: Record<string, string>
  colorsActive: Record<string, string>
  field?: "status" | "ticketStatus"
  disabled?: boolean
}

export function StatusDropdown({
  orderId,
  currentStatus,
  statuses,
  labels,
  colors,
  colorsActive,
  field = "status",
  disabled = false,
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleSelect(status: string) {
    if (status === currentStatus || updating) {
      setOpen(false)
      return
    }
    setUpdating(true)
    if (field === "ticketStatus") {
      await updateTicketStatus(orderId, status)
    } else {
      await updateOrderStatus(orderId, status)
    }
    setUpdating(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
          colorsActive[currentStatus] || "bg-gray-600 text-white border-gray-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {labels[currentStatus] || currentStatus}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {!disabled && open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleSelect(status)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-50",
                status === currentStatus && "font-semibold"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", colors[status]?.split(" ")[0] || "bg-gray-400")} />
              {labels[status] || status}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}