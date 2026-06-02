import { Client, Users, Account, Databases, Storage } from "node-appwrite"

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
const apiKey = process.env.APPWRITE_API_KEY!

export const adminClient = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey)

export const adminAccount = new Account(new Client().setEndpoint(endpoint).setProject(projectId))
export const adminDatabases = new Databases(adminClient)
export const adminStorage = new Storage(adminClient)
export const adminUsers = new Users(adminClient)
