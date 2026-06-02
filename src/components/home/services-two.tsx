"use client"

import { useState } from "react"
import { Target } from "lucide-react"
import Link from "next/link"
import { SaudiLogo, StarShape } from "@/components/home/shape-svg"

const categories = [
  { id: "accounting", label: "Accounting services" },
  { id: "government", label: "Government Relations Services" },
  { id: "office", label: "Office space services" },
]

const services = [
  { id: 1, title: "Accounting Catch-Up Services in Saudi Arabia", description: "Accounting Catch-Up Services in Saudi Arabia support in Saudi Arabia with accurate filing,...", href: "/services/accounting-catch-services-saudi-arabia", category: "accounting" },
  { id: 2, title: "Accounts Review Services in Saudi Arabia", description: "Accounts Review Services in Saudi Arabia support in Saudi Arabia with accurate filing, authority-...", href: "/services/accounts-review-services-saudi-arabia", category: "accounting" },
  { id: 3, title: "CORPORATE TAX", description: "Corporate Tax Services support in Saudi Arabia with accurate filing, authority-aligned...", href: "/services/corporate-tax", category: "accounting" },
  { id: 4, title: "External Audit", description: "External Audit Services support in Saudi Arabia with compliant execution, accurate data handling,...", href: "/services/external-audit", category: "accounting" },
  { id: 5, title: "Internal Audit", description: "Internal Audit Services support in Saudi Arabia with compliant execution, accurate data handling,...", href: "/services/internal-audit", category: "government" },
  { id: 6, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "government" },
  { id: 7, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "government" },
  { id: 8, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "government" },
  { id: 9, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "government" },
  { id: 10, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "office" },
  { id: 11, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "office" },
  { id: 12, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "office" },
  { id: 13, title: "Inventory / Stock Audit", description: "Inventory and Stock Audit Services support in Saudi Arabia with compliant execution, accurate data...", href: "/services/inventory-stock-audit", category: "office" },
]

export function ServicesSectionTwo() {
  const [activeCategory, setActiveCategory] = useState("accounting")
  const filteredServices = services.filter((service) => service.category === activeCategory)

  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-10">
        <div className="mx-auto max-w-330 px-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="text-base md:w-2/3">
              <p className="text-2xl font-semibold leading-[1.35]">Integrated Services</p>
              <div className="h-3" />
              <p className="text-2xl font-bold leading-[1.3] text-teal-600">A Digital Mark in Every Service</p>
              <div className="h-3" />
              <p className="text-md font-medium leading-[1.6]">Comprehensive business solutions designed to support investors, entrepreneurs, and companies entering the Saudi market.</p>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">View All Services</Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category.id} onClick={() => setActiveCategory(category.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeCategory === category.id ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {category.label}
              </button>
            ))}
          </div>

          <div className="h-px bg-gray-300 my-4"></div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <article key={service.id} className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
                  <Target className="h-6 w-6 text-teal-600" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold leading-7 text-neutral-900">{service.title}</h3>
                  <p className="text-sm leading-5 text-gray-700">{service.description}</p>
                  <div className="mt-auto flex gap-2">
                    <Link href={service.href} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Explore benefits</Link>
                    <button className="cursor-pointer rounded-md bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-700">Book now</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-30 right-10 -translate-x-1/2 text-[#b4b4b41c] w-50" />
      <StarShape className="absolute bottom-1 left-50 -translate-x-1/4 text-[#6a85821a] w-50" />
    </section>
  )
}
