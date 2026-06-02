import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero"
import { Contact } from "@/components/contact"
import { PartnersSection } from "@/components/home/partners-section"
import { FooterTwo } from "@/components/home/footer2"
import { LatestNews } from "@/components/home/latest-news"
import { ContactButtons } from "@/components/home/contacts-button"
import { WhatValueSection } from "@/components/home/what-value-section"
import { BusinessSetupTwo } from "@/components/home/business-setup-two"
import { PremiumResidencyBannerTwo } from "@/components/home/premium-residency-banner-two"
import { ServicesSectionTwo } from "@/components/home/services-two"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <PartnersSection />
          <WhatValueSection />
          <BusinessSetupTwo />
          <PremiumResidencyBannerTwo />
          <ServicesSectionTwo />
          <LatestNews />
          <Contact />
          <ContactButtons />
        </main>
        <FooterTwo />
      </div>
    </LanguageProvider>
  )
}
