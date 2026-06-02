process.env.FORCE_NODE_FETCH = "true"

import { readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { Client, Databases, ID } from "node-appwrite"

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
const envPath = join(__dirname, "..", ".env.local")
const envContent = readFileSync(envPath, "utf-8")
const env = Object.fromEntries(
  envContent
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => {
      const eq = line.indexOf("=")
      const key = line.slice(0, eq).trim()
      let val = line.slice(eq + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      return [key, val]
    })
)

const client = new Client()
  .setEndpoint(env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY)

const databases = new Databases(client)
const DATABASE_ID = env.NEXT_PUBLIC_APPWRITE_DATABASE_ID

async function main() {
  // Get existing categories
  const { documents: categories } = await databases.listDocuments(DATABASE_ID, "categories")
  console.log("Existing categories:", categories.map((c) => ({ id: c.$id, name: c.name })))

  if (categories.length === 0) {
    console.log("No categories found. Create categories first.")
    return
  }

  // Map category names to their IDs
  const catMap = Object.fromEntries(categories.map((c) => [c.name.toLowerCase(), c.$id]))

  const services = [
    {
      name: "Accounting Catch-Up Services",
      description: "Professional accounting catch-up services in Saudi Arabia with accurate filing, authority-aligned compliance, and comprehensive financial record reconciliation for businesses of all sizes.",
      price: "2999",
      type: "service",
      categoryId: catMap["accounting"],
    },
    {
      name: "Accounts Review Services",
      description: "Expert accounts review services in Saudi Arabia ensuring accurate filing, authority-aligned compliance, and thorough financial statement analysis for regulatory adherence.",
      price: "1999",
      type: "service",
      categoryId: catMap["accounting"],
    },
    {
      name: "Corporate Tax Services",
      description: "Comprehensive corporate tax services in Saudi Arabia including Zakat, VAT, and income tax filing with full authority alignment and strategic tax planning.",
      price: "3999",
      type: "service",
      categoryId: catMap["accounting"],
    },
    {
      name: "External Audit Services",
      description: "Thorough external audit services in Saudi Arabia with compliant execution, accurate data handling, and independent verification of financial statements.",
      price: "4999",
      type: "service",
      categoryId: catMap["accounting"],
    },
    {
      name: "Internal Audit Services",
      description: "Comprehensive internal audit services in Saudi Arabia with compliant execution, risk assessment, and operational efficiency recommendations.",
      price: "3499",
      type: "service",
      categoryId: catMap["government"],
    },
    {
      name: "Government Relations Services",
      description: "Professional government relations services in Saudi Arabia for business licensing, permit processing, and regulatory compliance with local authorities.",
      price: "2499",
      type: "service",
      categoryId: catMap["government"],
    },
    {
      name: "Visa & Immigration Services",
      description: "End-to-end visa and immigration services in Saudi Arabia for business investors, employees, and their families with full documentation support.",
      price: "1499",
      type: "service",
      categoryId: catMap["government"],
    },
    {
      name: "Office Space Setup",
      description: "Complete office space setup services in Saudi Arabia including location scouting, lease negotiation, furnishing, and utility connection management.",
      price: "5999",
      type: "service",
      categoryId: catMap["office"],
    },
    {
      name: "Coworking Space Membership",
      description: "Flexible coworking space memberships in Saudi Arabia with premium amenities, networking opportunities, and business support services.",
      price: "999",
      type: "service",
      categoryId: catMap["office"],
    },
    {
      name: "Business Center Services",
      description: "Full-service business center solutions in Saudi Arabia including virtual office, mail handling, meeting rooms, and administrative support.",
      price: "1999",
      type: "service",
      categoryId: catMap["office"],
    },
    {
      name: "Inventory & Stock Audit",
      description: "Professional inventory and stock audit services in Saudi Arabia with compliant execution, accurate counting, and comprehensive reporting.",
      price: "2499",
      type: "service",
      categoryId: catMap["government"],
    },
    {
      name: "Company Registration Package",
      description: "Complete company registration package in Saudi Arabia including entity formation, commercial registration, and initial compliance setup.",
      price: "7999",
      type: "service",
      categoryId: catMap["office"],
    },
  ]

  for (const service of services) {
    if (!service.categoryId) {
      console.log(`Skipping "${service.name}" — no matching category found`)
      continue
    }

    const slug = service.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")

    try {
      await databases.createDocument(DATABASE_ID, "services", ID.unique(), {
        name: service.name,
        description: service.description,
        price: service.price,
        type: service.type,
        categoryId: service.categoryId,
        slug,
        featured: "true",
        published: "true",
      })
      console.log(`✓ Created: ${service.name}`)
    } catch (err) {
      console.error(`✗ Failed: ${service.name}`, err.message)
    }
  }

  console.log("\nDone!")
}

main()
