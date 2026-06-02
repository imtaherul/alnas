"use client"

import type React from "react"
import { Header } from "@/components/header"
import { FooterTwo } from "@/components/home/footer2"
import { ContactButtons } from "@/components/home/contacts-button"

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <FooterTwo />
      <ContactButtons />
    </div>
  )
}
