"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui"
import { Input } from "@/components/ui"
import { Textarea } from "@/components/ui"
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react"
import { ContactButtonGroup } from "@/components/home/contact-button-group-flat"
import { SaudiLogo, StarShape } from "@/components/home/shape-svg"

export function Contact() {
  const { t, dir, locale } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    alert(locale === "ar" ? "تم إرسال رسالتك بنجاح!" : locale === "bn" ? "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!" : "Your message has been sent successfully!")
  }

  return (
    <section id="contact" className="relative z-10 py-10 md:py-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{t.contact.subtitle}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground">{t.contact.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{t.contact.subtitle}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.name}</label>
                  <Input type="text" required placeholder={t.contact.name} dir={dir} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contact.email}</label>
                  <Input type="email" required placeholder={t.contact.email} dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.contact.phone}</label>
                <Input type="tel" placeholder={t.contact.phone} dir="ltr" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.contact.message}</label>
                <Textarea required placeholder={t.contact.message} rows={5} dir={dir} />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.contact.submit}
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.contact.address}</p>
                  <p className="text-muted-foreground">{t.contact.addressText}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-6 bg-card border border-border rounded-xl p-6 pl-20">
                <ContactButtonGroup />
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden h-64">
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground">Business Bay, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaudiLogo className="absolute top-10 left-30 -translate-x-1/2 text-[#b4b4b41c] w-100" />
      <StarShape className="absolute bottom-1 right-30 -translate-x-1/4 text-[#6a85821a] w-50" />
    </section>
  )
}
