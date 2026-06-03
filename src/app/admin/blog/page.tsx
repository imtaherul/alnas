import Link from "next/link"
import { getAdminBlogPosts } from "@/lib/server-utils"
import { Button } from "@/components/ui"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { DeleteBlogButton } from "./delete-button"

export default async function AdminBlogPage() {
  const { posts } = await getAdminBlogPosts()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 sm:px-6 font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 sm:px-6 font-semibold text-gray-700">Author</th>
              <th className="px-4 py-3 sm:px-6 font-semibold text-gray-700">Status</th>
              <th className="hidden sm:table-cell px-4 py-3 sm:px-6 font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 sm:px-6 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.$id} className="hover:bg-gray-50">
                <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 max-w-[160px] sm:max-w-xs truncate">
                  {post.title}
                </td>
                <td className="px-4 py-4 sm:px-6 text-gray-600">{post.author}</td>
                <td className="px-4 py-4 sm:px-6">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-4 py-4 sm:px-6 text-gray-600">
                  {new Date(post.$createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Link
                      href={`/blog/${post.$id}`}
                      target="_blank"
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/blog/${post.$id}`}
                      className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <DeleteBlogButton id={post.$id} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 sm:px-6 py-12 text-center text-gray-500">
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
