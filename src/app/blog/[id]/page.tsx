import Link from "next/link"
import { notFound } from "next/navigation"
import { PublicLayout } from "@/components/layout/public-layout"
import { getBlogPost } from "@/lib/server-utils"
import { Calendar, User, Tag, Home, ChevronRight } from "lucide-react"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { post, error } = await getBlogPost(id)

  if (!post || error) notFound()

  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li><Link href="/blog" className="hover:text-teal-600">Blog</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <article>
          {post.image && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(post.$createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            {post.tags && <span className="flex items-center gap-1"><Tag className="h-4 w-4" />{post.tags}</span>}
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </article>
      </div>
    </PublicLayout>
  )
}
