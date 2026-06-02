"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea, Card, CardContent } from "@/components/ui"
import { createService } from "@/lib/appwrite/actions"
import toast from "react-hot-toast"

export function NewServiceForm({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createService({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      type: formData.get("type") as string,
      categoryId: formData.get("categoryId") as string,
    })

    if (result.success) {
      toast.success("Service created!")
      router.push("/admin/services")
    } else {
      toast.error(result.error || "Failed to create service")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Service</h1>
        <p className="mt-1 text-gray-500">Create a new service or digital product</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="name" name="name" label="Service Name" placeholder="e.g. Logo Design" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              >
                <option value="digital">Digital Product</option>
                <option value="service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="categoryId"
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.$id} value={cat.$id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              id="description"
              name="description"
              label="Description"
              placeholder="Describe your service..."
              rows={5}
              required
            />
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              label="Price ($)"
              placeholder="29.99"
              required
            />
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Service"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
