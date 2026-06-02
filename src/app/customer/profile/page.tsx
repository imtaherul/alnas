import { getCurrentUser } from "@/lib/server-utils"
import { Card, CardContent, CardHeader } from "@/components/ui"
import { Mail, User } from "lucide-react"

export default async function CustomerProfile() {
  const user = await getCurrentUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-gray-500">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Account Details</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <div className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
              {user?.role}
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
