import { adminUsers } from "@/lib/appwrite/admin"
import { Card, CardContent } from "@/components/ui"

export default async function AdminCustomers() {
  let users: any[] = []
  try {
    const res = await adminUsers.list()
    users = res.users
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="mt-1 text-gray-500">View all registered users</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Registered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user: any) => (
                    <tr key={user.$id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 capitalize">
                          {(user.labels?.[0] || "customer")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.status ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(user.registration || user.$createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No users registered yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
