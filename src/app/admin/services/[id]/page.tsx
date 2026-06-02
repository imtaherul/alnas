"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button, Input, Textarea, Card, CardContent, Badge } from "@/components/ui"
import { databases } from "@/lib/appwrite/config"
import { DATABASE_ID, COLLECTIONS } from "@/lib/appwrite/collections"
import { formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [service, setService] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTIONS.SERVICES, params.id)
        setService(doc)
      } catch {
        toast.error("Service not found")
        router.push("/admin/services")
      }
    }
    load()
  }, [params.id, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTIONS.SERVICES, params.id, {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        type: formData.get("type") as string,
        published: formData.get("published") === "true",
      })
      toast.success("Service updated!")
      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to update service")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this service?")) return
    setDeleting(true)
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTIONS.SERVICES, params.id)
      toast.success("Service deleted")
      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service")
    } finally {
      setDeleting(false)
    }
  }

  if (!service) {
    return <div className="text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
        <p className="mt-1 text-gray-500">{service.name}</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              name="name"
              label="Service Name"
              defaultValue={service.name}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                defaultValue={service.type}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              >
                <option value="digital">Digital Product</option>
                <option value="service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="published"
                defaultValue={String(service.published)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <Textarea
              id="description"
              name="description"
              label="Description"
              defaultValue={service.description}
              rows={5}
              required
            />
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              label={`Price (${formatPrice(0).replace(/[0-9.,]/g, "")})`}
              defaultValue={service.price}
              required
            />
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/services")}>
                  Cancel
                </Button>
              </div>
              <Button type="button" variant="outline" disabled={deleting} onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
