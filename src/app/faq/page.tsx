import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { Home, ChevronRight } from "lucide-react"

const faqs = [
  { q: "What types of services are available?", a: "We offer a wide range of digital services including graphic design, web development, content writing, digital marketing, video editing, and more. Each service is provided by verified professionals." },
  { q: "How do I purchase a service?", a: "Simply browse our services, select the one you need, and add it to your cart. After checkout, you will receive the digital product or the service provider will begin working on your order." },
  { q: "Is my payment information secure?", a: "Yes. We use industry-standard encryption and secure payment processing to protect all transactions. Your payment details are never stored on our servers." },
  { q: "How are digital products delivered?", a: "Digital products are available for immediate download after purchase. For custom services, deliverables are shared through our platform's messaging system." },
  { q: "Can I get a refund?", a: "Refund eligibility depends on the service type and provider. Please contact our support team through the Contact page for assistance with any issues." },
  { q: "How do I contact the service provider?", a: "After placing an order, you can communicate with the service provider through our built-in messaging system. This keeps all communication organized and trackable." },
  { q: "Do I need to create an account?", a: "Yes, you need to register an account to purchase services. Registration is free and gives you access to order tracking, downloads, and direct communication with providers." },
  { q: "How are service prices determined?", a: "Service providers set their own prices based on the value and complexity of their offerings. We ensure all listings are transparent with no hidden fees." },
]

export default function FAQPage() {
  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium">FAQ</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-gray-200 bg-white p-6 [&[open]]:shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="ml-4 text-teal-600 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
