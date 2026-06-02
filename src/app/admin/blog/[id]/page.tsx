import { notFound } from "next/navigation"
import { getAdminBlogPost } from "@/lib/server-utils"
import { BlogForm } from "../blog-form"

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { post, error } = await getAdminBlogPost(id)

  if (!post || error) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Blog Post</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <BlogForm post={post} />
      </div>
    </div>
  )
}
