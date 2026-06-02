import { Card, CardContent } from "@/components/ui"

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Configure your marketplace</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-sm">
            Marketplace settings will be available here. Configure payment gateways,
            email templates, and general platform settings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
