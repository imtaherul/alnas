"use client"

import Link from "next/link"
import type { LucideProps } from "lucide-react"

function YoutubeIcon(props: LucideProps) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> }
function InstagramIcon(props: LucideProps) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> }
function TwitterIcon(props: LucideProps) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function LinkedinIcon(props: LucideProps) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }
function FacebookIcon(props: LucideProps) { return <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> }
import { useLanguage } from "@/contexts/language-context"

const ourServices = [
  { label: "Business Incubators", href: "/services/business-incubators" },
  { label: "Business Setup in Saudi Arabia", href: "/services/business-setup" },
  { label: "Consultation", href: "/services/consultation-services" },
  { label: "Coworking", href: "/services/coworking-spaces" },
  { label: "Free Zone", href: "/services/free-zones-ksa" },
  { label: "HR Services", href: "/services/hr-services" },
  { label: "Premium Residency", href: "/services/premium-residency-saudi-arabia" },
  { label: "Saudi Partner", href: "/services/saudi-partners" },
  { label: "Translation Services", href: "/services/translation-services" },
]

const usefulResources = [
  { label: "About Kingdom", href: "/about-kingdom" },
  { label: "Life in Saudi Arabia", href: "/blog/Life-in-Saudi-Arabia" },
  { label: "HR Packages", href: "/hr-packages" },
  { label: "Vision 2030", href: "/blog/vision-2030" },
  { label: "2034 World Cup", href: "/blog/2034-World-Cup" },
  { label: "NEOM", href: "/blog/what-neom" },
]

const legalPages = [
  { label: "Legal Policy", href: "/legal-policy" },
  { label: "Other Legal Information", href: "/other-legal-information" },
  { label: "Privacy Policy", href: "/privacy-policy" },
]

const socialLinks = [
  { icon: YoutubeIcon, href: "https://www.youtube.com/@MotadedConsultancy", label: "Youtube Channel" },
  { icon: InstagramIcon, href: "https://www.instagram.com/motaded_consultancy/", label: "Instagram" },
  { icon: TwitterIcon, href: "https://www.x.com/MotadedConsult", label: "X (Twitter)" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/motaded-consultancy", label: "LinkedIn" },
  { icon: FacebookIcon, href: "https://www.facebook.com/MotadedConsultancy/", label: "Facebook" },
]

export function FooterTwo() {
  const { t } = useLanguage()

  return (
    <footer className="bg-teal-700 text-white">
      <div className="mx-auto max-w-[1320px] px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-white">
            <Link href="/" className="mb-6 inline-block">
              <div className="flex h-12 w-32 items-center justify-center rounded bg-white/20 text-sm font-semibold">Logo</div>
            </Link>
            <p className="text-sm text-white/80">Your trusted partner for business setup and consultancy services in Saudi Arabia.</p>
          </div>

          <div className="text-white">
            <p className="mb-3 text-base font-semibold leading-relaxed">Our Services</p>
            <div className="mb-3 h-px w-full bg-white/30" />
            <div className="grid grid-cols-1 gap-1.5">
              {ourServices.map((service) => (
                <Link key={service.href} href={service.href} className="text-sm text-white hover:underline">{service.label}</Link>
              ))}
            </div>
          </div>

          <div className="hidden text-white md:block">
            <p className="mb-3 text-base font-semibold leading-relaxed">Useful Resources</p>
            <div className="mb-3 h-px w-full bg-white/30" />
            <div className="flex flex-col gap-1.5">
              {usefulResources.map((resource) => (
                <Link key={resource.href} href={resource.href} className="text-sm text-white hover:underline">{resource.label}</Link>
              ))}
            </div>
          </div>

          <div className="hidden text-white md:block">
            <p className="mb-3 text-base font-semibold leading-relaxed">Legal Pages</p>
            <div className="mb-3 h-px w-full bg-white/30" />
            <div className="flex flex-col gap-1.5">
              {legalPages.map((page) => (
                <Link key={page.href} href={page.href} className="text-sm text-white hover:underline">{page.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 text-white">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-4">
              <Link href="/privacy-policy" className="text-sm font-normal underline">Privacy Policy</Link>
              <Link href="/legal-policy" className="text-sm font-normal underline">Legal Policy</Link>
              <Link href="/sitemap.xml" className="text-sm font-normal underline">Sitemap</Link>
            </div>
            <p className="text-sm font-medium leading-relaxed">&copy; {new Date().getFullYear()} Al Naseir Business Solutions. {t.footer.rights}</p>
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-3 flex h-14 w-24 items-center justify-center rounded text-xs">
              <img src="/Vision 2030.svg" alt="Vision 2030" className="object-contain text-white" />
            </div>
            <ul className="flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="nofollow noopener noreferrer" title={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 transition hover:bg-white/30">
                    <social.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
