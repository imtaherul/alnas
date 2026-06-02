import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/shared/providers"

export const metadata: Metadata = {
  title: "Alnas - Digital Services Marketplace",
  description: "Buy and sell digital products and services",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
