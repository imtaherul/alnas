import { getAdminServices } from "@/lib/appwrite/queries"
import { Card, CardContent, Badge, Button } from "@/components/ui"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminServices() {
  const { services } = await getAdminServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-gray-500">Manage your service catalog</p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {services.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {services.map((service: any) => (
                <div key={service.$id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    {service.images?.[0] && (
                      <img
                        src={service.images[0]}
                        alt={service.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <Badge variant={service.published ? "success" : "warning"}>
                          {service.published ? "Published" : "Draft"}
                        </Badge>
                        <Badge variant="info" className="capitalize">{service.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{formatPrice(service.price)}</p>
                    </div>
                  </div>
                  <Link href={`/admin/services/${service.$id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No services yet</p>
              <Link href="/admin/services/new">
                <Button className="mt-4" variant="outline">
                  <Plus className="mr-1 h-4 w-4" />
                  Add your first service
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
