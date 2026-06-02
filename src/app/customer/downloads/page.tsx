import { getMyDownloads } from "@/lib/appwrite/queries"
import { Card, CardContent } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Download } from "lucide-react"
import Link from "next/link"

export default async function CustomerDownloads() {
  const { downloads } = await getMyDownloads()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Downloads</h1>
        <p className="mt-1 text-gray-500">Access your purchased digital files</p>
      </div>

      {downloads.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {downloads.map((dl: any) => (
            <Card key={dl.$id}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-gray-900">{dl.fileName}</p>
                  <p className="text-xs text-gray-500">{formatDate(dl.$createdAt)}</p>
                </div>
                <a href={dl.fileUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No downloads available</p>
          <Link href="/" className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500">
            Browse services
          </Link>
        </div>
      )}
    </div>
  )
}
