import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { Client, Account } from "node-appwrite"

function getSessionCookieName() {
  return `a_session_${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`
}

export async function POST() {
  const cookieStore = await cookies()
  const cookieName = getSessionCookieName()
  const sessionValue = cookieStore.get(cookieName)?.value

  if (sessionValue) {
    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setSession(sessionValue)

      const account = new Account(client)
      await account.deleteSession("current")
    } catch {
      // ignore
    }
  }

  cookieStore.delete(cookieName)
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}
