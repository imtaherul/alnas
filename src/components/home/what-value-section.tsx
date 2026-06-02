import { ArchShape, QuarterCircle, SaudiLogo, StarShape, CodeBrackets } from "@/components/home/shape-svg"

const values = [
  {
    label: "/ Saving Time\nWhere It Matters",
    description: "Our services eliminate repetitive work and unnecessary steps, helping teams focus on outcomes, not processes.",
  },
  {
    label: "/ Reducing Operational\nComplexity",
    description: "Clear communication. Logical flows. Fewer decisions. This leads to faster delivery.",
  },
  {
    label: "/ Supporting\nLong-Term Use",
    description: "Our team are built to remain stable as teams and businesses grow.",
  },
]

export function WhatValueSection() {
  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="value-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="flex min-h-150">
        <div className="flex-1 px-10 py-16 md:px-16 lg:px-20">
          <div className="relative mb-14">
            <h2 id="value-heading" className="tracking-tight text-[clamp(6rem,12vw,14rem)] leading-[0.9] font-extrabold">
              <span className="relative inline-block">
                What{" "}
                <span className="relative inline-block">
                  Value
                  <span className="absolute top-10 left-[30%] -translate-x-1/2 rounded-sm px-2 py-0.5 text-xs font-bold bg-[#e040fb] text-[2rem] tracking-wider">Discipline</span>
                  <span className="absolute top-70 right-[-30%] rounded-sm px-2 py-0.5 text-xs font-bold text-black bg-[#c6f135] text-[1rem] tracking-[0.02em]">Perspective</span>
                </span>
              </span>
              <br />
              <span className="relative inline-block">
                <span className="relative inline-block">
                  M
                  <span className="absolute top-20 left-[80%] rounded-sm px-2 py-0.5 text-xs font-bold text-black bg-[#00d4c8] text-[0.8rem] tracking-[0.05em]">Growth</span>
                </span>
                ean To Us
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {values.map((item) => (
              <div key={item.label} className="grid grid-cols-2 pt-8 text-center items-center" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="font-bold uppercase" style={{ fontSize: "1rem", letterSpacing: "0.08em", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                  {item.label}
                </p>
                <p className="font-bold leading-snug" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.25 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex w-64 xl:w-72 flex-col">
          <div className="relative flex-1 overflow-hidden flex items-center justify-center" aria-hidden="true">
            <StarShape className="absolute text-[#b7bdbe56] w-[140%] max-w-none" aria-hidden="true" />
          </div>
          <div className="relative flex-1 overflow-hidden flex items-end justify-end" aria-hidden="true">
            <span className="absolute bottom-0 right-0 leading-none font-black text-[#2729447a] select-none" style={{ fontSize: "clamp(8rem, 14vw, 14rem)", lineHeight: 0.85 }}>01</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto overflow-hidden" style={{ width: "min(3000px, 100%)", height: "300px", marginTop: "-1px" }} aria-hidden="true">
        <ArchShape className="absolute -top-10 left-1/1 -translate-x-1/2 text-[#b4b4b44f] w-204" />
        <QuarterCircle className="absolute -top-10 left-1/4 -translate-x-1/4 text-[#8d787848] w-104" />
        <CodeBrackets className="absolute left-50 -translate-x-1/4 text-[#6a858233] w-130" />
      </div>
      <SaudiLogo className="absolute top-10 left-1/2 -translate-x-1/2 text-[#b4b4b41c] w-180" />
    </section>
  )
}
