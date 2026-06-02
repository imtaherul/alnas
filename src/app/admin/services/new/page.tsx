import { adminDatabases } from "@/lib/appwrite/admin"
import { DATABASE_ID, COLLECTIONS } from "@/lib/appwrite/collections"
import { NewServiceForm } from "./form"

export default async function NewServicePage() {
  let categories: any[] = []
  try {
    const res = await adminDatabases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES)
    categories = res.documents.map((d: any) => ({ $id: d.$id, name: d.name }))
  } catch (e: any) {
    console.error("Failed to load categories:", e.message)
  }

  return <NewServiceForm categories={categories} />
}
