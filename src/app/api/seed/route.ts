import { NextResponse } from "next/server"
import { Client, Databases, ID } from "node-appwrite"

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!)

const databases = new Databases(client)
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!

export async function GET() {
  try {
    // 1. Create categories if they don't exist
    const { documents: existingCategories } = await databases.listDocuments(DATABASE_ID, "categories")
    const existingNames = new Set(existingCategories.map((c: any) => c.name.toLowerCase()))

    const categoriesToCreate = [
      { name: "Accounting services", slug: "accounting" },
      { name: "Government Relations Services", slug: "government" },
      { name: "Office space services", slug: "office" },
    ]

    const catMap: Record<string, string> = {}
    for (const cat of existingCategories) {
      catMap[(cat as any).name.toLowerCase()] = (cat as any).$id
    }

    for (const cat of categoriesToCreate) {
      if (!catMap[cat.name.toLowerCase()]) {
        const doc = await databases.createDocument(DATABASE_ID, "categories", ID.unique(), cat)
        catMap[cat.name.toLowerCase()] = doc.$id
      }
    }

    // 2. Create services
    const services = [
      { name: "Accounting Catch-Up Services", description: "Professional accounting catch-up services in Saudi Arabia with accurate filing and authority-aligned compliance.", price: "2999", type: "service", categoryId: catMap["accounting services"] },
      { name: "Accounts Review Services", description: "Expert accounts review services ensuring accurate filing, authority-aligned compliance, and thorough financial statement analysis.", price: "1999", type: "service", categoryId: catMap["accounting services"] },
      { name: "Corporate Tax Services", description: "Comprehensive corporate tax services including Zakat, VAT, and income tax filing with full authority alignment.", price: "3999", type: "service", categoryId: catMap["accounting services"] },
      { name: "External Audit Services", description: "Thorough external audit services with compliant execution and independent verification of financial statements.", price: "4999", type: "service", categoryId: catMap["accounting services"] },
      { name: "Internal Audit Services", description: "Comprehensive internal audit services with risk assessment and operational efficiency recommendations.", price: "3499", type: "service", categoryId: catMap["government relations services"] },
      { name: "Government Relations Services", description: "Professional government relations for business licensing, permit processing, and regulatory compliance.", price: "2499", type: "service", categoryId: catMap["government relations services"] },
      { name: "Visa & Immigration Services", description: "End-to-end visa and immigration services for business investors and employees with full documentation support.", price: "1499", type: "service", categoryId: catMap["government relations services"] },
      { name: "Office Space Setup", description: "Complete office space setup including location scouting, lease negotiation, furnishing, and utility connections.", price: "5999", type: "service", categoryId: catMap["office space services"] },
      { name: "Coworking Space Membership", description: "Flexible coworking space memberships with premium amenities and networking opportunities.", price: "999", type: "service", categoryId: catMap["office space services"] },
      { name: "Business Center Services", description: "Full-service business center solutions including virtual office and administrative support.", price: "1999", type: "service", categoryId: catMap["office space services"] },
      { name: "Inventory & Stock Audit", description: "Professional inventory and stock audit services with accurate counting and comprehensive reporting.", price: "2499", type: "service", categoryId: catMap["government relations services"] },
      { name: "Company Registration Package", description: "Complete company registration including entity formation, commercial registration, and initial compliance setup.", price: "7999", type: "service", categoryId: catMap["office space services"] },
    ]

    const created: string[] = []
    const skipped: string[] = []

    for (const service of services) {
      if (!service.categoryId) {
        skipped.push(`${service.name} (no matching category)`)
        continue
      }

      const slug = service.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")

      await databases.createDocument(DATABASE_ID, "services", ID.unique(), {
        ...service,
        slug,
        featured: "true",
        published: "true",
      })
      created.push(service.name)
    }

    return NextResponse.json({ categoriesCreated: Object.keys(catMap).length, servicesCreated: created, skipped, count: created.length })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
