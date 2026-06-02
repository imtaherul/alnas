"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteBlogPost } from "@/lib/appwrite/actions"

export function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Delete this post?")) return
    const result = await deleteBlogPost(id)
    if (result.success) router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
