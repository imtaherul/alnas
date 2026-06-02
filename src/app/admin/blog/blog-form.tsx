"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Textarea } from "@/components/ui"
import { createBlogPost, updateBlogPost } from "@/lib/appwrite/actions"

interface BlogFormProps {
  post?: any
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter()
  const isEdit = !!post

  async function handleSubmit(prev: any, formData: FormData) {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string || (formData.get("title") as string)?.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      image: formData.get("image") as string,
      author: formData.get("author") as string,
      tags: formData.get("tags") as string,
      published: formData.get("published") as string || "false",
    }

    const result = isEdit
      ? await updateBlogPost(post.$id, data)
      : await createBlogPost(data)

    if (result.success) {
      router.push("/admin/blog")
      router.refresh()
    }
    return result
  }

  const [state, formAction, pending] = useActionState(handleSubmit, {} as Record<string, any>)

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
          <Input id="title" name="title" defaultValue={post?.title} required className="mt-1" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
          <Input id="slug" name="slug" defaultValue={post?.slug} className="mt-1" placeholder="Auto-generated if empty" />
        </div>
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt *</label>
        <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} required rows={2} className="mt-1" />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content *</label>
        <Textarea id="content" name="content" defaultValue={post?.content} required rows={12} className="mt-1 font-mono text-sm" />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author *</label>
          <Input id="author" name="author" defaultValue={post?.author || "Admin"} required className="mt-1" />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <Input id="image" name="image" defaultValue={post?.image} className="mt-1" placeholder="https://..." />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <Input id="tags" name="tags" defaultValue={post?.tags} className="mt-1" placeholder="comma, separated" />
        </div>
      </div>
      {isEdit && (
        <div>
          <label htmlFor="published" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="published"
            name="published"
            defaultValue={post?.published}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
      )}
      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/blog")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
