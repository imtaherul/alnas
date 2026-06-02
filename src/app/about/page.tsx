import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { Shield, Users, Award, Globe, Home, ChevronRight } from "lucide-react"

export default function AboutPage() {
  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium">About</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Alnas</h1>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Alnas was founded to bridge the gap between talented creators and those seeking
              high-quality digital services. We believe that great digital products should be
              accessible to everyone, and that creators deserve a platform that showcases their
              work effectively.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From design and development to marketing and content creation, our marketplace
              connects you with verified professionals who deliver exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Shield, label: "Secure Platform", desc: "Protected transactions & data" },
              { icon: Users, label: "Trusted Community", desc: "Verified creators & buyers" },
              { icon: Award, label: "Premium Quality", desc: "Curated services, top standards" },
              { icon: Globe, label: "Global Reach", desc: "Services available worldwide" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-xl border border-gray-200 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-900">{item.label}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
