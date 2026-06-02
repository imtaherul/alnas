import Link from "next/link"
import { getService } from "@/lib/appwrite/queries"
import { createOrder, getCurrentUser } from "@/lib/server-utils"
import { PublicLayout } from "@/components/layout/public-layout"
import { Button, Badge } from "@/components/ui"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Home, ChevronRight } from "lucide-react"
import { redirect } from "next/navigation"

export default async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ error?: string | string[] }>
}) {
  const { id } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const orderError = typeof resolvedSearchParams.error === "string" ? resolvedSearchParams.error : null
  const user = await getCurrentUser()
  const { service } = await getService(id)

  if (!service) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
          <Link href="/" className="mt-4 inline-block text-primary-600 hover:text-primary-500">Back to home</Link>
        </div>
      </PublicLayout>
    )
  }

  const serviceForOrder = service

  async function placeOrder() {
    "use server"

    const result = await createOrder({
      items: [
        {
          serviceId: serviceForOrder.$id,
          name: serviceForOrder.name,
          price: serviceForOrder.price,
          type: serviceForOrder.type,
          image: serviceForOrder.images?.[0] || "",
        },
      ],
      total: Number(serviceForOrder.price) || 0,
    })

    if (!result.success) {
      redirect(`/services/${id}?error=${encodeURIComponent(result.error || "order_failed")}`)
    }

    if (!result.order) {
      redirect(`/services/${id}?error=order_failed`)
    }

    redirect(`/customer/orders/${result.order.$id}`)
  }

  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li><Link href="/services" className="hover:text-teal-600">Services</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">{service.name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {service.images?.[0] && (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 mb-6">
                <img src={service.images[0]} alt={service.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="info" className="capitalize">{service.type}</Badge>
            </div>
            <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-wrap">{service.description}</p>
          </div>

          <div>
            <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-gray-900">{formatPrice(service.price)}</p>
              <p className="mt-1 text-sm text-gray-500">
                {service.type === "digital" ? "Instant digital delivery" : "Service will be delivered as agreed"}
              </p>
              <hr className="my-6" />
              {user ? (
                <form action={placeOrder}>
                  {orderError && (
                    <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      Could not place order: {orderError}
                    </p>
                  )}
                  <Button className="w-full" size="lg" type="submit"><ShoppingCart className="mr-2 h-5 w-5" />Place Order</Button>
                </form>
              ) : (
                <Link href="/login"><Button className="w-full" size="lg">Sign in to Purchase</Button></Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
