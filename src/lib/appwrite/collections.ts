export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!

export const COLLECTIONS = {
  SERVICES: "services",
  CATEGORIES: "categories",
  ORDERS: "orders",
  DOWNLOADS: "downloads",
  PROFILES: "profiles",
  MESSAGES: "messages",
  BLOG: "blog",
  CONTACTS: "contacts",
} as const

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!

export const BUCKETS = {
  SERVICE_FILES: BUCKET_ID,
  SERVICE_IMAGES: BUCKET_ID,
  AVATARS: BUCKET_ID,
} as const
