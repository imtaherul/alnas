"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { SaudiLogo, StarShape } from "@/components/home/shape-svg"

const partners = [
  { id: 1, name: "Ministry of investment", logo: "/working/01 Investment.svg" },
  { id: 2, name: "Ministry of Commerce and Investment", logo: "/working/02 Commerce.svg" },
  { id: 3, name: "Saudi Business Center", logo: "/working/03 SBC.svg" },
  { id: 4, name: "Qiwa", logo: "/working/04 Qiwa.svg" },
  { id: 5, name: "Ministry of Human Resources and Social Development", logo: "/working/05 HRSD.svg" },
  { id: 6, name: "Ministry of Labour and Social Development", logo: "/working/06 Labor.svg" },
  { id: 7, name: "Saudi Ministry of Interior", logo: "/working/07 Interior.svg" },
  { id: 8, name: "Saudi General Organization for Social Insurance", logo: "/working/08 GOSI.svg" },
  { id: 9, name: "Mudad Wage Protection System", logo: "/working/09 Mudad.svg" },
  { id: 10, name: "Transport General Authority", logo: "/working/10 TGA.svg" },
  { id: 11, name: "Zakat, Tax and Customs Authority", logo: "/working/11 Zakat.svg" },
  { id: 12, name: "Riyadh Passport Department", logo: "/working/12 Passports.svg" },
  { id: 13, name: "13 Muqeem", logo: "/working/13 Muqeem.svg" },
  { id: 14, name: "Saudi Post", logo: "/working/14 SPL.svg" },
  { id: 15, name: "Premium Residency", logo: "/working/15 pr.svg" },
  { id: 16, name: "Absher Business", logo: "/working/16 Absher Business.svg" },
  { id: 17, name: "Ajeer", logo: "/working/17 ajeer.png" },
  { id: 18, name: "Balady", logo: "/working/18 balady.svg" },
  { id: 19, name: "Saudi Ministry of Foreign Affairs", logo: "/working/19 Foreign-Affairs.svg" },
  { id: 20, name: "General Authority of Civil Aviation", logo: "/working/20 Gaca.svg" },
  { id: 21, name: "Saudi Ministry of Justice", logo: "/working/21 Najiz.svg" },
  { id: 22, name: "Saudi Ministry of Justice BUSINESS", logo: "/working/22 NajizB.svg" },
  { id: 23, name: "Nafith", logo: "/working/23 Nafith.png" },
  { id: 24, name: "Ministry Of Industry And Mineral Resources", logo: "/working/24 Industry and Mineral.svg" },
  { id: 25, name: "Saudi Product Safety Program", logo: "/working/25 Saber.svg" },
  { id: 26, name: "Saudi Authority for Intellectual Property", logo: "/working/26 saudi authority for intellectual property.svg" },
  { id: 27, name: "Real Estate General Authority", logo: "/working/27 rega.svg" },
  { id: 28, name: "Riyadh Chamber of Commerce", logo: "/working/28 Riyadh-Chamber.svg" },
  { id: 29, name: "Saudi Ministry of Tourism", logo: "/working/29 Tourism.svg" },
  { id: 30, name: "Saudi Arabia Airlines", logo: "/working/30 Saudi-Arabian-Airlines2.svg" },
  { id: 31, name: "Saudi Authority for Data and AI", logo: "/working/31 Saudi Authority for Data and AI.svg" },
  { id: 32, name: "Absher", logo: "/working/32 Absher.svg" },
  { id: 33, name: "Al-Rajhi Bank", logo: "/working/33 Al-Rajhi.svg" },
  { id: 34, name: "Arab National Bank", logo: "/working/34 anb.svg" },
  { id: 35, name: "Bank AlJazira", logo: "/working/35 Bank AlJazira.svg" },
  { id: 36, name: "Alinma Bank", logo: "/working/36 Alinma.svg" },
  { id: 37, name: "Riyad Bank", logo: "/working/37 Riyad-Bank.svg" },
  { id: 38, name: "SAB Bank", logo: "/working/38 Sab.svg" },
]

export function PartnersSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [Autoplay({ delay: 3000, stopOnInteraction: false })])

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  return (
    <section className="relative z-10 pb-14 pt-28">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-330 px-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="text-base md:w-2/3">
            <h2 className="text-xl font-bold text-gray-900">Our Collaborates</h2>
            <p className="mb-4 text-base text-gray-600 md:w-2/3">We collaborate with leading organizations, banks, and service providers to deliver reliable business solutions across Saudi Arabia and beyond.</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {partners.map((partner) => (
                <div key={partner.id} className="min-w-0 flex-[0_0_calc(50%-6px)] sm:flex-[0_0_calc(33.333%-8px)] md:flex-[0_0_calc(20%-10px)] lg:flex-[0_0_calc(16.666%-10px)]">
                  <div className="h-full rounded-lg border border-gray-300 bg-white p-2 transition hover:shadow-sm">
                    <div className="mx-auto grid place-items-center">
                      <div className="flex h-16 w-full items-center justify-center p-3">
                        <img src={partner.logo} alt={partner.name || "logo"} className="h-40 w-60 object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button key={index} onClick={() => scrollTo(index)}
                className={cn("h-2 w-2 rounded-full transition-colors", index === selectedIndex ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-400")}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-10 left-30 -translate-x-1/2 text-[#b4b4b41c] w-70" />
      <StarShape className="absolute bottom-1 right-30 -translate-x-1/4 text-[#6a85821a] w-50" />
    </section>
  )
}
