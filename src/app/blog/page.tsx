import Link from "next/link"
import { PublicLayout } from "@/components/layout/public-layout"
import { getBlogPosts } from "@/lib/server-utils"
import { Calendar, User, ArrowRight, Home, ChevronRight } from "lucide-react"

export default async function BlogPage() {
  const { posts } = await getBlogPosts()

  return (
    <PublicLayout>
      <nav className="mx-auto max-w-7xl px-4 pt-25 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="flex items-center gap-1 hover:text-teal-600"><Home className="h-4 w-4" />Home</Link></li>
          <li><ChevronRight className="h-4 w-4" /></li>
          <li className="text-gray-900 font-medium">Blog</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post.$id} href={`/blog/${post.$id}`}
                className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
                {post.image && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(post.$createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-600">Read more <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-16 text-center">
            <p className="text-lg text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
