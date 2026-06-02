"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SaudiLogo, StarShape, QuarterCircle } from "@/components/home/shape-svg"
import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

const steps = [
  { step_title: "MISA", title: "Ministry of investment", desc: "Obtain an investment license from the Ministry of Investment in Saudi Arabia (MISA)", img: "/working/01 Investment.svg" },
  { step_title: "Commerce", title: "Ministry of commerce", desc: "Register your company with the Ministry of Commerce and obtain the necessary commercial registration", img: "/working/02 Commerce.svg" },
  { step_title: "HR", title: "Ministry of Human resource", desc: "Issuing the visa of the general manager from the ministry of human resource and social development", img: "/working/05 HRSD.svg" },
  { step_title: "GOSI", title: "General Organization of Social Insurance (GOSI)", desc: "Open your account and activate Nitaqat system from the General organization of social insurance \u201c GOSI", img: "/working/08 GOSI.svg" },
  { step_title: "Zakat", title: "ZAKAT, Tax Income and customs Authority", desc: "Issuing all the tax certificate from Zakat, tax and customs authority", img: "/working/11 Zakat.svg" },
  { step_title: "Platforms", title: "Organizational Platforms", desc: "Register in all of the Organizational Platforms like Mudad, Muqeem, and Qiwa", img: "/working/pl.webp" },
  { step_title: "SPL", title: "Saudi Post Local", desc: "Register the address from the Saudi Post Local (SPL)", img: "/working/14 SPL.svg" },
  { step_title: "MOI", title: "Ministry Of Interior", desc: "Issuing the residency Iqama from Ministry of interior", img: "/working/07 Interior.svg" },
  { step_title: "Bank", title: "Bank Account", desc: "Open a corporate bank account with a local Saudi bank", img: "/working/33 Al-Rajhi.svg" },
]

export function HeroSection() {
  const { t, dir } = useLanguage()
  const [current, setCurrent] = useState(0)

  const prev = () => { if (current > 0) setCurrent(current - 1) }
  const next = () => { if (current < steps.length - 1) setCurrent(current + 1) }
  const go = (index: number) => setCurrent(index)

  return (
    <section className="relative z-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28">
        <div className="text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-semibold leading-tight text-[clamp(1.2rem,2vw,2.0rem)]">Business Setup in Saudi Arabia Is Super Easy</h1>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-none text-balance">{t.hero.title}</h1>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground text-pretty">{t.hero.subtitle}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/services/business-setup" className="inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:translate-y-0">
                Explore Services <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center gap-2 rounded-lg bg-background px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 active:translate-y-0">
                Wharsapp Us <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="translate-y-12 sm:translate-y-16">
            <div className="max-w-330 mx-auto px-4">
              <div className="gap-2">
                <div>
                  <h2 className="text-[1.625rem] font-bold text-teal-700 max-sm:text-2xl leading-tight">Investor Journey</h2>
                  <p className="text-gray-600 mt-1">Registration Process and Required Documentation</p>
                </div>
              </div>

              <div className="rounded-xl p-4 max-sm:px-1 sm:p-6 mt-5">
                <div className="flex flex-row items-start gap-2">
                  <div className="flex flex-col flex-1 items-center">
                    <div className="hidden lg:flex relative justify-between w-full sm:w-[95%] pt-4">
                      {steps.map((step, i) => (
                        <div key={i} className="relative flex flex-col items-center w-full group">
                          {i < steps.length - 1 && (
                            <div className={`absolute top-[7px] left-1/2 h-[2px] w-full z-0 ${i < current ? "bg-teal-700" : "bg-gray-200"}`} />
                          )}
                          <button type="button"
                            className={`z-10 w-4 h-4 rounded-full border-4 flex items-center justify-center transition ${i <= current ? "border-teal-700 bg-teal-700" : "border-teal-700 bg-white hover:bg-gray-50"}`}
                            onClick={() => go(i)} aria-label={`Go to step ${i + 1}: ${step.title}`}>
                            <span className="sr-only">{step.title}</span>
                          </button>
                          <div className="text-center mt-3 text-[13px] font-semibold text-black"><span>{step.step_title}</span></div>
                        </div>
                      ))}
                    </div>

                    <div className="flex lg:hidden items-center gap-2 py-4">
                      <span className="text-sm font-medium text-teal-700">Step {current + 1} of {steps.length}</span>
                      <div className="flex gap-1">
                        {steps.map((_, i) => (
                          <button key={i} onClick={() => go(i)}
                            className={`w-2 h-2 rounded-full transition ${i <= current ? "bg-teal-700" : "bg-gray-300"}`}
                            aria-label={`Go to step ${i + 1}`} />
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div className="grid place-items-center">
                          <div className="rounded-lg border border-gray-200 bg-white w-50 h-40 items-center justify-center flex">
                            <img src={steps[current].img} alt={steps[current].title} className="max-w-full h-auto" />
                          </div>
                        </div>
                        <div className="col-span-1 lg:col-span-2">
                          <div className="flex flex-col gap-2 sm:gap-4">
                            <p className="text-lg font-semibold text-teal-700 leading-[1.6] text-start">Step {current + 1} of {steps.length}</p>
                            <h3 className="text-[16px] font-bold text-black text-start">{steps[current].title}</h3>
                            <p className="leading-[1.75] text-gray-700 h-10 text-start">{steps[current].desc}</p>
                            <div className="flex justify-between items-center mt-4">
                              <button type="button"
                                className={`cursor-pointer border border-teal-700 inline-flex items-center justify-center rounded-lg text-sm px-3 py-1.5 gap-2 ${current === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                                aria-label="Previous step" onClick={prev} disabled={current === 0}>
                                <ChevronUp className="w-5 h-5 -rotate-90" /> Previous step
                              </button>
                              <button type="button"
                                className={`cursor-pointer border border-teal-700 inline-flex items-center justify-center rounded-lg text-sm px-3 py-1.5 gap-2 ${current === steps.length - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                                aria-label="Next step" onClick={next} disabled={current === steps.length - 1}>
                                Next step <ChevronDown className="w-5 h-5 -rotate-90" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-30 left-100 -translate-x-1/2 text-[#b4b4b41c] w-100" />
      <SaudiLogo className="absolute top-30 right-10 -translate-x-1/2 text-[#b4b4b41c] w-100" />
      <QuarterCircle className="absolute bottom-1 left-50 -translate-x-1/4 text-[#6a85821a] w-90" />
      <StarShape className="absolute bottom-1 left-50 -translate-x-1/4 text-[#8d78781a] w-54" />
      <StarShape className="absolute top-10 right-50 translate-x-1/2 text-[#b4b4b418] w-100" />
    </section>
  )
}
