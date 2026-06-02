import { Client, Databases, Storage, ID, Permission, Role } from "node-appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "6a09e3e30036c20b23d8";
const apiKey = process.env.APPWRITE_API_KEY;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6a09e47b0029f7a24e80";

if (!apiKey) {
  console.error("APPWRITE_API_KEY is required");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function deleteCollection(collectionId) {
  try {
    await databases.deleteCollection(databaseId, collectionId);
    console.log(`  Deleted collection: ${collectionId}`);
    await wait(1000);
  } catch (e) {
    // ignore if not found
  }
}

async function createCollection(collectionId, name, attributes = [], indexes = [], permissions = []) {
  console.log(`\n=== Creating collection: ${name} (id: ${collectionId}) ===`);
  try {
    const collection = await databases.createCollection(
      databaseId,
      collectionId,
      name,
      permissions
    );
    console.log(`  Created collection: ${name}`);

    for (const attr of attributes) {
      await wait(500);
      try {
        await databases.createStringAttribute(
          databaseId, collectionId, attr.key, attr.size || 255, attr.required !== false
        );
        console.log(`  Added string attribute: ${attr.key}`);
      } catch (e) {
        console.log(`  Skipped string attribute ${attr.key}: ${e.message}`);
      }
    }

    for (const idx of indexes) {
      await wait(500);
      try {
        await databases.createIndex(
          databaseId, collectionId, idx.key, idx.type || "key", idx.attributes, idx.orders || []
        );
        console.log(`  Created index: ${idx.key}`);
      } catch (e) {
        console.log(`  Skipped index ${idx.key}: ${e.message}`);
      }
    }

    return collection.$id;
  } catch (e) {
    if (e.type === "collection_already_exists") {
      console.log(`  Collection already exists: ${name}`);
      return null;
    }
    throw e;
  }
}

async function main() {
  console.log("Setting up Appwrite collections...");
  console.log(`Endpoint: ${endpoint}`);
  console.log(`Project: ${projectId}`);
  console.log(`Database: ${databaseId}`);

  // Use collection name as ID so code references work
  const collections = [
    {
      id: "profiles", name: "profiles",
      attributes: [
        { key: "userId", size: 36 },
        { key: "name", size: 255 },
        { key: "email", size: 255 },
        { key: "role", size: 50 },
        { key: "avatar", size: 512, required: false },
        { key: "phone", size: 50, required: false },
      ],
      indexes: [
        { key: "userId_idx", type: "key", attributes: ["userId"] },
      ],
    },
    {
      id: "services", name: "services",
      attributes: [
        { key: "name", size: 255 },
        { key: "slug", size: 255 },
        { key: "description", size: 4096 },
        { key: "price", size: 255, required: false },
        { key: "type", size: 50 },
        { key: "categoryId", size: 36 },
        { key: "images", size: 4096, required: false },
        { key: "fileUrl", size: 512, required: false },
        { key: "featured", size: 255, required: false },
        { key: "published", size: 255, required: false },
      ],
      indexes: [
        { key: "published_idx", type: "key", attributes: ["published"] },
        { key: "type_idx", type: "key", attributes: ["type"] },
        { key: "category_idx", type: "key", attributes: ["categoryId"] },
        { key: "featured_idx", type: "key", attributes: ["featured"] },
      ],
    },
    {
      id: "categories", name: "categories",
      attributes: [
        { key: "name", size: 255 },
        { key: "slug", size: 255 },
        { key: "description", size: 1024, required: false },
        { key: "image", size: 512, required: false },
      ],
      indexes: [],
    },
    {
      id: "orders", name: "orders",
      attributes: [
        { key: "userId", size: 36 },
        { key: "items", size: 8192 },
        { key: "total", size: 255, required: false },
        { key: "status", size: 50 },
        { key: "customerName", size: 255, required: false },
        { key: "customerEmail", size: 255, required: false },
        { key: "ticketStatus", size: 50, required: false },
      ],
      indexes: [
        { key: "userId_idx", type: "key", attributes: ["userId"] },
        { key: "status_idx", type: "key", attributes: ["status"] },
      ],
    },
    {
      id: "downloads", name: "downloads",
      attributes: [
        { key: "orderId", size: 36 },
        { key: "serviceId", size: 36 },
        { key: "userId", size: 36 },
        { key: "fileName", size: 255 },
        { key: "fileUrl", size: 512 },
        { key: "downloaded", size: 255, required: false },
      ],
      indexes: [
        { key: "userId_idx", type: "key", attributes: ["userId"] },
      ],
    },
    {
      id: "messages", name: "messages",
      attributes: [
        { key: "orderId", size: 36 },
        { key: "senderId", size: 36 },
        { key: "senderName", size: 255 },
        { key: "senderRole", size: 50 },
        { key: "content", size: 16384 },
        { key: "attachments", size: 16384, required: false },
      ],
      indexes: [
        { key: "orderId_idx", type: "key", attributes: ["orderId"] },
      ],
    },
    {
      id: "blog", name: "blog",
      attributes: [
        { key: "title", size: 255 },
        { key: "slug", size: 255 },
        { key: "content", size: 16384 },
        { key: "excerpt", size: 512 },
        { key: "image", size: 512, required: false },
        { key: "author", size: 255 },
        { key: "tags", size: 512, required: false },
        { key: "published", size: 255, required: false },
      ],
      indexes: [
        { key: "published_idx", type: "key", attributes: ["published"] },
      ],
    },
    {
      id: "contacts", name: "contacts",
      attributes: [
        { key: "name", size: 255 },
        { key: "email", size: 255 },
        { key: "subject", size: 512, required: false },
        { key: "message", size: 4096 },
        { key: "read", size: 255, required: false },
      ],
      indexes: [],
    },
  ];

  // Delete existing auto-ID collections if any
  console.log("\nDeleting legacy collections...");
  const legacyIds = ["6a1e2bf30007a5f1664f", "6a1e2bfa003922b346cb", "6a1e2c0a001892d1a897", "6a1e2c0e003d229e2e4a", "6a1e2c18001d9071d20d"];
  for (const id of legacyIds) {
    await deleteCollection(id);
  }

  for (const col of collections) {
    await createCollection(col.id, col.name, col.attributes, col.indexes);
  }

  // Set public read permissions on collections that need it
  console.log(`\n=== Setting public read permissions ===`);
  const publicCollections = ["services", "categories", "blog"];
  for (const colId of publicCollections) {
    try {
      await wait(500);
      await databases.updateCollection(databaseId, colId, colId, [
        Permission.read(Role.any()),
      ]);
      console.log(`  ${colId}: public read enabled`);
    } catch (e) {
      console.log(`  ${colId}: could not update permissions - ${e.message || e.type}`);
    }
  }

  // Add ticketStatus attribute to orders collection if missing
  console.log(`\n=== Adding ticketStatus to orders ===`);
  try {
    await wait(500);
    await databases.createStringAttribute(databaseId, "orders", "ticketStatus", 50, false);
    console.log("  Added ticketStatus attribute to orders");
  } catch (e) {
    const msg = e?.message || e?.type || String(e);
    if (msg.includes("already exists")) {
      console.log("  ticketStatus already exists");
    } else {
      console.error(`  Error: ${msg}`);
    }
  }

  // Check/create storage buckets
  console.log("\n=== Checking storage buckets ===");
  const bucketIds = ["6a0afb15003564dd0429", "service-files", "service-images", "avatars", "chat-attachments"];
  let foundBucket = "";
  for (const bucketId of bucketIds) {
    try {
      await wait(300);
      const bucket = await storage.getBucket(bucketId);
      console.log(`  ${bucketId} (${bucket.name}): OK`);
      if (!foundBucket) foundBucket = bucketId;
    } catch (e) {
      console.log(`  ${bucketId}: NOT FOUND`);
    }
  }

  // Ensure the bucket has public read permissions for file viewing
  if (foundBucket) {
    try {
      await storage.updateBucket(foundBucket, "alnaser-attachments", [
        Permission.read(Role.any()),
        Permission.write(Role.any()),
      ]);
      console.log(`  Updated permissions for ${foundBucket}`);
    } catch (e) {
      console.log(`  Could not update bucket permissions: ${e.message}`);
    }
  } else {
    // Try to create one
    for (const bucketId of ["chat-attachments", "service-files"]) {
      try {
        await storage.createBucket(bucketId, bucketId, [
          Permission.read(Role.any()),
          Permission.write(Role.any()),
        ]);
        console.log(`  Created bucket: ${bucketId}`);
        foundBucket = bucketId;
        break;
      } catch (e) {
        console.log(`  Could not create ${bucketId}: ${e.message}`);
      }
      await wait(500);
    }
  }

  if (foundBucket) {
    console.log(`\n  Using bucket: ${foundBucket}`);
    console.log(`  Run this to set the env var:\n    echo NEXT_PUBLIC_APPWRITE_BUCKET_ID="${foundBucket}" >> .env.local`);
  } else {
    console.log("\n  No storage buckets available. Create one manually in Appwrite console.");
  }

  console.log("\n=== Setup complete ===");
}

main().catch(console.error);
