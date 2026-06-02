"use client"

import { useState } from "react"
import Link from "next/link"
import { SaudiLogo, StarShape } from "@/components/home/shape-svg"

const newsItems = [
  { id: 1, title: "Saudi Ministerial Decision No. (236) of 1447H: Direct Penalties for Late Financial Statement Filing", date: "2026-05-18", href: "/news/saudi-ministerial-decision-no-236-1447h-direct-penalties-late-financial-statement-filing", image: "/news-1.jpg" },
  { id: 2, title: "Digital Investment License 2026 Details | Motaded Co", date: "2026-04-28", href: "/news/digital-investment-license-2026-details-motaded-co", image: "/news-2.jpg" },
  { id: 3, title: "Motaded Co. Aligns with World Cup 2034 Sports Investments", date: "2026-04-27", href: "/news/motaded-co-aligns-world-cup-2034-sports-investments", image: "/news-3.jpg" },
  { id: 4, title: "Tourism and Marketing Localization 2026 | Motaded Co. Strategy for Compliance", date: "2026-04-27", href: "/news/tourism-and-marketing-localization-2026-motaded-co-strategy-compliance", image: "/news-4.jpg", featured: true },
]

export function LatestNews() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prev = () => setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
  const next = () => setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))

  return (
    <section className="relative z-10 pb-14 pt-28">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-[1320px] px-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="text-base md:w-2/3">
            <h2 className="text-2xl font-bold leading-tight text-teal-700 sm:text-[1.625rem]">Latest News</h2>
            <p className="font-medium leading-relaxed text-gray-700">Comprehensive business solutions designed to support investors, entrepreneurs, and companies entering the Saudi market.</p>
          </div>
          <Link href="/news" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-gray-50">News</Link>
        </div>

        <div className="mt-5 hidden w-full grid-cols-1 gap-5 md:grid md:grid-cols-2">
          <div className="hidden gap-5 sm:grid-cols-2 md:grid md:grid-cols-1">
            {newsItems.slice(0, 3).map((item) => (
              <Link key={item.id} href={item.href} className="block">
                <div className="h-full w-full rounded-xl border border-transparent bg-white p-4 shadow-sm transition hover:border-teal-700">
                  <div className="flex h-full justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex h-full flex-col justify-between">
                        <p className="font-semibold leading-relaxed text-gray-900">{item.title}</p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.date}</p>
                      </div>
                    </div>
                    <div className="aspect-[151/120] w-[151px] flex-shrink-0 overflow-hidden rounded-lg">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden h-full md:block">
            <Link href={newsItems[3].href} className="block h-full">
              <div className="h-full w-full rounded-xl border border-transparent bg-white p-4 shadow-sm transition hover:border-teal-700">
                <div className="relative aspect-[16/9] h-full w-full overflow-hidden rounded-lg">
                  <img src={newsItems[3].image} alt={newsItems[3].title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full px-5 py-4">
                    <p className="text-lg font-medium leading-relaxed text-white">{newsItems[3].title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">{newsItems[3].date}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="my-10 block md:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              {newsItems.map((item, index) => (
                <Link key={item.id} href={item.href} className={`block min-h-72 ${currentSlide === index ? "" : "hidden"}`}>
                  <div className="h-full rounded-xl border border-transparent bg-white p-4 shadow-sm transition hover:border-teal-700">
                    <div className="flex h-full flex-col justify-between">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="mt-5 flex flex-1 flex-col justify-between">
                        <p className="font-medium leading-relaxed text-gray-900">{item.title}</p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button type="button" className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50" onClick={prev}>Prev</button>
              <div className="flex gap-3">
                {newsItems.map((_, index) => (
                  <button key={index} type="button"
                    className={`size-3 rounded-full ${currentSlide === index ? "bg-teal-700" : "bg-gray-300"}`}
                    aria-label={`Go to slide ${index + 1}`} onClick={() => setCurrentSlide(index)} />
                ))}
              </div>
              <button type="button" className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50" onClick={next}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-50 -right-40 -translate-x-1/2 text-[#b4b4b41c] w-100" />
      <StarShape className="absolute bottom-1 left-50 -translate-x-1/4 text-[#6a85821a] w-50" />
    </section>
  )
}
