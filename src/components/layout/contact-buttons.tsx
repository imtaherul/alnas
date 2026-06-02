"use client"

import { useState } from "react"
import { Phone, Mail, MessageCircle, X, MessagesSquare } from "lucide-react"

export function ContactButtons() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <a
          href="tel:+966500000000"
          className="group flex items-center gap-3"
          aria-label="Call us"
        >
          <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            Call Us
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110">
            <Phone className="h-5 w-5" />
          </div>
        </a>

        <a
          href="mailto:support@alnas.com"
          className="group flex items-center gap-3"
          aria-label="Email us"
        >
          <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            Email Us
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110">
            <Mail className="h-5 w-5" />
          </div>
        </a>

        <a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          aria-label="Chat on WhatsApp"
        >
          <span className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
            WhatsApp
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110">
            <MessageCircle className="h-5 w-5" />
          </div>
        </a>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gray-700 text-white rotate-0"
            : "bg-primary-600 text-white hover:bg-primary-700"
        }`}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessagesSquare className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
