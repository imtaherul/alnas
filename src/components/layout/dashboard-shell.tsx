"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, X } from "lucide-react";

export function DashboardShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "admin" | "customer";
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-3 top-5 z-10 flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
          <Sidebar role={role} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 pt-14 pb-6 sm:px-6 sm:pt-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
