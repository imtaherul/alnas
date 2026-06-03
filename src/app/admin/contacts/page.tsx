import { getContactSubmissions } from "@/lib/server-utils"
import { markContactRead } from "@/lib/appwrite/actions"
import { Mail, CheckCircle } from "lucide-react"

export default async function AdminContactsPage() {
  const { submissions } = await getContactSubmissions()

  async function markRead(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) await markContactRead(id)
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">Contact Submissions</h1>

      <div className="space-y-3">
        {submissions.map((sub: any) => (
          <div
            key={sub.$id}
            className={`rounded-xl border p-4 shadow-sm ${
              sub.read ? "border-gray-200 bg-white" : "border-primary-200 bg-primary-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                  {!sub.read && (
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">{sub.email}</p>
                {sub.subject && (
                  <p className="mt-1 text-sm font-medium text-gray-700">{sub.subject}</p>
                )}
                <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">{sub.message}</p>
                <p className="mt-3 text-xs text-gray-400">
                  {new Date(sub.$createdAt).toLocaleString()}
                </p>
              </div>
              {!sub.read && (
                <form action={markRead} className="shrink-0">
                  <input type="hidden" name="id" value={sub.$id} />
                  <button
                    type="submit"
                    className="rounded-lg p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-16 text-center">
            <Mail className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 text-lg text-gray-500">No submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
