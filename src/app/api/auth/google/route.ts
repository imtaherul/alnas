import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
  const { origin } = new URL(request.url)

  // Appwrite v1.9.5 OAuth - uses parameter name "redirect" for the callback
  const callbackUrl = encodeURIComponent(`${origin}/api/auth/oauth/callback`)
  const failureUrl = encodeURIComponent(`${origin}/login`)

  const oauthUrl = `${endpoint}/account/sessions/oauth2/google?project=${projectId}&redirect=${callbackUrl}&failure=${failureUrl}`

  return NextResponse.redirect(oauthUrl)
}
