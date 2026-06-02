import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { ContactForm } from "./contact-form"
import { Home, ChevronRight } from "lucide-react"

export default function ContactPage() {
  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium">Contact</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
          <p className="mt-2 text-gray-600">Fill out the form below and we will get back to you as soon as possible.</p>
          <ContactForm />
        </div>
      </div>
    </PublicLayout>
  )
}
