import { BlogForm } from "../blog-form"

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">New Blog Post</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <BlogForm />
      </div>
    </div>
  )
}
