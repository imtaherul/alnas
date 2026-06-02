"use server"

import { cookies } from "next/headers"
import { Client, Account, ID } from "node-appwrite"
import { InputFile } from "node-appwrite/file"
import { adminUsers, adminDatabases, adminStorage } from "./admin"
import { DATABASE_ID, COLLECTIONS, BUCKETS } from "./collections"
import { revalidatePath } from "next/cache"
import { getSessionClient } from "../server-utils"

export type ActionState = Record<string, any>

async function createSession(email: string, password: string) {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!

  const res = await fetch(`${endpoint}/account/sessions/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": projectId,
      "X-Appwrite-Response-Format": "1.9.5",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const body = await res.json()
    throw new Error(body.message || "Failed to create session")
  }

  const body = await res.json()
  const fallbackHeader = res.headers.get("x-fallback-cookies")
  if (!fallbackHeader) throw new Error("No fallback cookies in response")

  const fallback: Record<string, string> = JSON.parse(fallbackHeader)
  const cookieName = `a_session_${projectId}`
  const cookieValue = fallback[cookieName]
  if (!cookieValue) throw new Error("No session cookie in fallback")

  return { userId: body.userId as string, cookieName, cookieValue }
}

export async function loginAction(prevState: Record<string, any>, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  let userId: string
  let cookieName: string
  let cookieValue: string

  try {
    const result = await createSession(email, password)
    userId = result.userId
    cookieName = result.cookieName
    cookieValue = result.cookieValue
  } catch (error) {
    console.error("Login failed:", error)
    return { error: "Invalid email or password" }
  }

  const cookieStore = await cookies()
  cookieStore.set(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  const user = await adminUsers.get(userId)
  const labels = user.labels || []
  const role = labels.includes("admin") ? "admin" : "customer"

  return { success: true, role }
}

export async function registerAction(prevState: Record<string, any>, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" }
  }

  try {
    const appwriteClient = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

    const appwriteAccount = new Account(appwriteClient)
    const user = await appwriteAccount.create(ID.unique(), email, password, name)

    const { cookieName, cookieValue } = await createSession(email, password)

    const cookieStore = await cookies()
    cookieStore.set(cookieName, cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    })

    await adminUsers.updateLabels(user.$id, ["customer"])

    await adminDatabases.createDocument(
      DATABASE_ID,
      COLLECTIONS.PROFILES,
      ID.unique(),
      {
        userId: user.$id,
        name,
        email,
        role: "customer",
      }
    )

    return { success: true }
  } catch (error: any) {
    console.error("Registration failed:", error)
    return { error: error.message || "Registration failed. Please try again." }
  }
}

export async function createService(data: {
  name: string
  description: string
  price: string
  type: string
  categoryId: string
}) {
  try {
    const slug = data.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")

    await adminDatabases.createDocument(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      ID.unique(),
      {
        ...data,
        slug,
        price: data.price,
        featured: "false",
        published: "false",
      }
    )
    revalidatePath("/admin/services")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await adminDatabases.updateDocument(DATABASE_ID, COLLECTIONS.ORDERS, orderId, { status })
    revalidatePath("/admin/orders")
    revalidatePath(`/admin/orders/${orderId}`)
  } catch {}
}

export async function updateTicketStatus(orderId: string, ticketStatus: string) {
  try {
    await adminDatabases.updateDocument(DATABASE_ID, COLLECTIONS.ORDERS, orderId, { ticketStatus })
    revalidatePath(`/admin/orders/${orderId}`)
  } catch {}
}

export async function sendMessage(prevState: ActionState, formData: FormData) {
  const orderId = formData.get("orderId") as string
  const content = formData.get("content") as string
  const fileEntries = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0)

  if (!content?.trim() && fileEntries.length === 0) return { error: "Message cannot be empty" }

  try {
    const client = await getSessionClient()
    if (!client) return { error: "Not authenticated" }

    const account = new Account(client)
    const user = await account.get()
    const labels = user.labels || []
    const senderRole = labels.includes("admin") ? "admin" : "customer"
    const order = await adminDatabases.getDocument(DATABASE_ID, COLLECTIONS.ORDERS, orderId)

    if (senderRole !== "admin" && order.userId !== user.$id) {
      return { error: "Not allowed to send messages for this order" }
    }

    const attachments = []
    for (const file of fileEntries) {
      const uploaded = await adminStorage.createFile(
        BUCKETS.SERVICE_FILES,
        ID.unique(),
        InputFile.fromBuffer(file, file.name)
      )
      attachments.push({
        bucketId: BUCKETS.SERVICE_FILES,
        fileId: uploaded.$id,
        name: file.name,
        mimeType: file.type,
        size: file.size,
      })
    }

    await adminDatabases.createDocument(
      DATABASE_ID,
      COLLECTIONS.MESSAGES,
      ID.unique(),
      {
        orderId,
        senderId: user.$id,
        senderName: user.name || (senderRole === "admin" ? "Admin" : "Customer"),
        senderRole,
        content: content?.trim() || "",
        attachments: attachments.length > 0 ? JSON.stringify(attachments) : "",
      }
    )

    if (senderRole === "customer") {
      await adminDatabases.updateDocument(DATABASE_ID, COLLECTIONS.ORDERS, orderId, {
        ticketStatus: "reopened",
      })
    }

    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath(`/customer/orders/${orderId}`)
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to send message" }
  }
}

export async function createBlogPost(data: {
  title: string
  slug: string
  content: string
  excerpt: string
  image?: string
  author: string
  tags?: string
  published?: string
}) {
  try {
    await adminDatabases.createDocument(DATABASE_ID, COLLECTIONS.BLOG, ID.unique(), {
      title: data.title,
      slug: data.slug,
      content: data.content,
      excerpt: data.excerpt,
      image: data.image || "",
      author: data.author,
      tags: data.tags || "",
      published: data.published || "false",
    })
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateBlogPost(id: string, data: {
  title: string
  slug: string
  content: string
  excerpt: string
  image?: string
  author: string
  tags?: string
  published: string
}) {
  try {
    await adminDatabases.updateDocument(DATABASE_ID, COLLECTIONS.BLOG, id, {
      ...data,
      tags: data.tags || "",
      image: data.image || "",
    })
    revalidatePath("/admin/blog")
    revalidatePath(`/admin/blog/${id}`)
    revalidatePath("/blog")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await adminDatabases.deleteDocument(DATABASE_ID, COLLECTIONS.BLOG, id)
    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function submitContactForm(prevState: ActionState, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "Name, email, and message are required." }
  }

  try {
    await adminDatabases.createDocument(DATABASE_ID, COLLECTIONS.CONTACTS, ID.unique(), {
      name,
      email,
      subject: subject || "",
      message,
      read: "false",
    })
    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to submit message." }
  }
}

export async function markContactRead(id: string) {
  try {
    await adminDatabases.updateDocument(DATABASE_ID, COLLECTIONS.CONTACTS, id, { read: "true" })
    revalidatePath("/admin/contacts")
  } catch {}
}
