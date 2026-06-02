# Alnas - Setup Guide

This guide walks you through setting up **Appwrite** as the backend for Alnas.

## 1. Install Appwrite

### Option A: Appwrite Cloud (Recommended)

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io) and create an account
2. Create a new project → name it `alnas`
3. Note your **Project ID** from Settings > General

### Option B: Self-Hosted (Docker)

```bash
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/usr/src/appwrite \
  --env-file .env \
  appwrite/appwrite:latest
```

Follow the setup wizard, then open `http://localhost:80`.

## 2. Create Collections

In the Appwrite Console, create these collections:

### `profiles`
| Attribute    | Type    | Required | Description            |
|-------------|---------|----------|------------------------|
| userId      | string  | Yes      | Appwrite user ID       |
| name        | string  | Yes      | Display name           |
| email       | string  | Yes      | Email address          |
| role        | string  | Yes      | "admin" or "customer"  |
| avatar      | string  | No       | Avatar URL             |
| phone       | string  | No       | Phone number           |
| createdAt   | string  | Auto     | Creation timestamp     |

**Indexes:**
- `userId` (key, unique)

### `categories`
| Attribute    | Type    | Required | Description        |
|-------------|---------|----------|--------------------|
| name        | string  | Yes      | Category name      |
| slug        | string  | Yes      | URL-friendly slug  |
| description | string  | No       | Short description  |
| image       | string  | No       | Category image URL |

**Indexes:**
- `slug` (key, unique)

### `services`
| Attribute    | Type    | Required | Description               |
|-------------|---------|----------|---------------------------|
| name        | string  | Yes      | Service name              |
| slug        | string  | Yes      | URL-friendly slug         |
| description | string  | Yes      | Full description           |
| price       | number  | Yes      | Price in USD              |
| type        | string  | Yes      | "digital" or "service"    |
| categoryId  | string  | Yes      | Reference to categories   |
| images      | string[]| No       | Array of image URLs       |
| fileUrl     | string  | No       | Digital file download URL |
| featured    | boolean | No       | Show on homepage          |
| published   | boolean | No       | Visible to customers      |
| createdAt   | string  | Auto     | Creation timestamp        |
| updatedAt   | string  | Auto     | Update timestamp          |

**Indexes:**
- `slug` (key, unique)
- `published` (key)
- `categoryId` (key)

### `orders`
| Attribute      | Type    | Required | Description               |
|---------------|---------|----------|---------------------------|
| userId        | string  | Yes      | Customer user ID          |
| customerName  | string  | No       | Customer display name     |
| customerEmail | string  | No       | Customer email            |
| items         | string  | Yes      | JSON string of cart items  |
| total         | number  | Yes      | Order total               |
| status        | string  | Yes      | pending/completed/cancelled/refunded |
| createdAt     | string  | Auto     | Creation timestamp        |
| updatedAt     | string  | Auto     | Update timestamp          |

**Indexes:**
- `userId` (key)
- `status` (key)

### `downloads`
| Attribute    | Type    | Required | Description           |
|-------------|---------|----------|-----------------------|
| userId      | string  | Yes      | Customer user ID      |
| orderId     | string  | Yes      | Reference to orders   |
| serviceId   | string  | Yes      | Reference to services |
| fileName    | string  | Yes      | Display file name     |
| fileUrl     | string  | Yes      | Download URL          |
| downloaded  | boolean | No       | Already downloaded    |
| createdAt   | string  | Auto     | Creation timestamp    |

## 3. Create Storage Buckets

| Bucket Name      | Max File Size | Allowed MIME Types        |
|-----------------|---------------|---------------------------|
| service-files   | 100 MB        | All                       |
| service-images  | 5 MB          | image/*                   |
| avatars         | 2 MB          | image/*                   |

## 4. Set Up Auth

1. In App Console: **Auth > Settings**
2. Enable **Email/Password** authentication
3. (Optional) Enable OAuth providers (Google, GitHub, etc.)

## 5. Configure Environment

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id

# Create this in App Console: Settings > API Keys
APPWRITE_API_KEY=your-api-key-with-full-access
```

## 6. Create Admin User

1. Register a user through the app at `/register`
2. In App Console: **Auth > Users** → find the user
3. Add label: `admin`
4. The user can now access the admin panel at `/admin/dashboard`

## 7. Seed Initial Data

After setup, go to **Admin Dashboard > Services > Add Service** to create your first service.

Or insert directly in App Console:
1. Go to **Database > categories** → Create Document
2. Add a category (e.g., "Design", "Development", "Writing")
3. Go to **Database > services** → Create Document
4. Add your first service with `published: true` and `featured: true`

## 8. Run

```bash
npm run dev
```

Visit:
- Landing page: `http://localhost:3000`
- Customer dashboard: `http://localhost:3000/customer/dashboard`
- Admin dashboard: `http://localhost:3000/admin/dashboard`
