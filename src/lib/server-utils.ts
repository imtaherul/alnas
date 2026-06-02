import { cookies } from "next/headers"
import { Client, Account } from "node-appwrite"
import { databases } from "./appwrite/config"
import { adminDatabases } from "./appwrite/admin"
import { DATABASE_ID, COLLECTIONS } from "./appwrite/collections"
import { ID, Query } from "appwrite"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

function getSessionCookieName() {
  return `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`
}

export async function getSessionClient() {
  const cookieStore = await cookies()
  const cookieName = getSessionCookieName()
  const cookieValue = cookieStore.get(cookieName)?.value
  if (!cookieValue) return null

  return new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setCookie(`${cookieName}=${cookieValue}`)
}

export async function getCurrentUser() {
  try {
    const client = await getSessionClient()
    if (!client) return null

    const account = new Account(client)
    const user = await account.get()
    const labels = user.labels || []
    const role = labels.includes("admin") ? "admin" : "customer"

    return {
      $id: user.$id,
      name: user.name,
      email: user.email,
      role: role as "admin" | "customer",
    }
  } catch (error) {
    console.error("getCurrentUser failed:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== "admin") redirect("/customer/dashboard")
  return user
}

export async function logoutUser() {
  try {
    const client = await getSessionClient()
    if (client) {
      const account = new Account(client)
      await account.deleteSession("current")
    }
  } catch {
    // ignore
  }

  try {
    const cookieStore = await cookies()
    cookieStore.set(getSessionCookieName(), "", { maxAge: 0, path: "/" })
  } catch {}

  redirect("/login")
}

// Query functions

export async function getServices(filters?: {
  categoryId?: string
  type?: string
  search?: string
  featured?: boolean
}) {
  const queries: string[] = []

  if (filters?.categoryId) queries.push(Query.equal("categoryId", filters.categoryId))
  if (filters?.type) queries.push(Query.equal("type", filters.type))
  if (filters?.search) queries.push(Query.search("name", filters.search))
  if (filters?.featured) queries.push(Query.equal("featured", "true"))

  queries.push(Query.orderDesc("$createdAt"))

  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SERVICES, queries)
    return { services: res.documents, total: res.total }
  } catch (error: any) {
    return { services: [], total: 0, error: error.message }
  }
}

export async function getService(id: string) {
  try {
    const service = await databases.getDocument(DATABASE_ID, COLLECTIONS.SERVICES, id)
    return { service }
  } catch (error: any) {
    return { service: null, error: error.message }
  }
}

export async function getCategories() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CATEGORIES)
    return { categories: res.documents }
  } catch (error: any) {
    return { categories: [], error: error.message }
  }
}

export async function createOrder(data: {
  items: any[]
  total: number
}) {
  const user = await requireAuth()

  try {
    const order = await adminDatabases.createDocument(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      ID.unique(),
      {
        userId: user.$id,
        items: JSON.stringify(data.items),
        total: String(data.total),
        status: "pending",
        customerName: user.name,
        customerEmail: user.email,
        ticketStatus: "new",
      }
    )
    revalidatePath("/customer/orders")
    return { order, success: true }
  } catch (error: any) {
    return { error: error.message, success: false }
  }
}

export async function getMyOrders() {
  const user = await requireAuth()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
    )
    return { orders: res.documents }
  } catch (error: any) {
    return { orders: [], error: error.message }
  }
}

export async function getMyDownloads() {
  const user = await requireAuth()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.DOWNLOADS,
      [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
    )
    return { downloads: res.documents }
  } catch (error: any) {
    return { downloads: [], error: error.message }
  }
}

export async function getOrders() {
  await requireAdmin()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ORDERS,
      [Query.orderDesc("$createdAt")]
    )
    return { orders: res.documents, total: res.total }
  } catch (error: any) {
    return { orders: [], total: 0, error: error.message }
  }
}

export async function getAdminServices() {
  await requireAdmin()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      [Query.orderDesc("$createdAt")]
    )
    return { services: res.documents, total: res.total }
  } catch (error: any) {
    return { services: [], total: 0, error: error.message }
  }
}

export async function getOrder(id: string) {
  await requireAdmin()

  try {
    const order = await adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.ORDERS, id)
    return { order }
  } catch (error: any) {
    return { order: null, error: error.message }
  }
}

export async function getOrderMessages(orderId: string) {
  await requireAdmin()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.MESSAGES,
      [
        Query.equal("orderId", orderId),
        Query.orderAsc("$createdAt"),
      ]
    )
    return { messages: res.documents }
  } catch (error: any) {
    return { messages: [], error: error.message }
  }
}

export async function getMyOrderMessages(orderId: string) {
  const user = await requireAuth()

  try {
    const order = await adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.ORDERS, orderId)
    if (order.userId !== user.$id) return { messages: [], error: "Order not found" }

    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.MESSAGES,
      [
        Query.equal("orderId", orderId),
        Query.orderAsc("$createdAt"),
      ]
    )
    return { messages: res.documents }
  } catch (error: any) {
    return { messages: [], error: error.message }
  }
}

export async function getBlogPosts() {
  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.BLOG,
      [Query.equal("published", "true"), Query.orderDesc("$createdAt")]
    )
    return { posts: res.documents }
  } catch (error: any) {
    return { posts: [], error: error.message }
  }
}

export async function getBlogPost(id: string) {
  try {
    const post = await databases.getDocument(DATABASE_ID, COLLECTIONS.BLOG, id)
    if (post.published !== "true") return { post: null, error: "Not found" }
    return { post }
  } catch (error: any) {
    return { post: null, error: error.message }
  }
}

export async function getAdminBlogPosts() {
  await requireAdmin()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.BLOG,
      [Query.orderDesc("$createdAt")]
    )
    return { posts: res.documents }
  } catch (error: any) {
    return { posts: [], error: error.message }
  }
}

export async function getAdminBlogPost(id: string) {
  await requireAdmin()

  try {
    const post = await adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.BLOG, id)
    return { post }
  } catch (error: any) {
    return { post: null, error: error.message }
  }
}

export async function getContactSubmissions() {
  await requireAdmin()

  try {
    const res = await adminDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.CONTACTS,
      [Query.orderDesc("$createdAt")]
    )
    return { submissions: res.documents }
  } catch (error: any) {
    return { submissions: [], error: error.message }
  }
}
