import Link from "next/link"
import { SaudiLogo, StarShape } from "@/components/home/shape-svg"

export function BusinessSetupTwo() {
  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:pt-24 sm:pb-16 lg:pt-28">
        <div className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden shadow-sm border border-[#e8e0d8]">
          <div className="w-full md:w-[55%] relative min-h-90 md:min-h-120">
            <img src="/BusinessSetUpstartup.jpg" alt="Aerial view of an architectural complex with egg-shaped domed structures surrounded by trees"
              className="w-full h-full object-cover absolute inset-0" />
          </div>
          <div className="w-full md:w-[45%] flex items-center px-10 py-14 lg:px-16">
            <div className="max-w-md">
              <p className="text-[#4a7c6f] text-xs font-semibold uppercase tracking-[0.18em] mb-6">next generation startups</p>
              <h2 className="text-[#1a1a2e] text-3xl lg:text-4xl font-bold leading-tight mb-6 text-balance">Let&apos;s Begin with Business Set Up in Saudi Arabia</h2>
              <p className="text-[#4a4a5a] text-sm leading-relaxed">
                Company Formation in Saudi Arabia is a strategic opportunity for every Investor aiming to grow in the region&apos;s largest economy.
                Starting a business requires obtaining a license from the Ministry of Investment to ensure compliance, followed by issuing
                a Commercial Register and activating Government Services to build a strong legal entity that supports the General Manager&apos;s
                vision for expansion and success.
              </p>
              <div className="mt-5">
                <Link href="/services/business-setup-saudi-arabia" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-teal-700 text-white text-sm font-medium hover:bg-teal-800 transition-colors">
                  Start Your Setup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-30 right-10 -translate-x-1/2 text-[#b4b4b41c] w-100" />
      <StarShape className="absolute bottom-1 left-50 -translate-x-1/4 text-[#6a85821a] w-50" />
    </section>
  )
}
