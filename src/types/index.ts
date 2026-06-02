export type Role = "admin" | "customer"

export interface UserProfile {
  $id: string
  userId: string
  name: string
  email: string
  role: Role
  avatar?: string
  phone?: string
  createdAt: string
}

export interface ServiceCategory {
  $id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export type ServiceType = "digital" | "service"

export interface Service {
  $id: string
  name: string
  slug: string
  description: string
  price: number
  type: ServiceType
  categoryId: string
  images: string[]
  fileUrl?: string
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  serviceId: string
  name: string
  price: number
  quantity: number
  type: ServiceType
  image?: string
}

export type OrderStatus = "pending" | "completed" | "cancelled" | "refunded"

export interface Order {
  $id: string
  userId: string
  items: CartItem[]
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface Download {
  $id: string
  orderId: string
  serviceId: string
  fileName: string
  fileUrl: string
  downloaded: boolean
  createdAt: string
}
