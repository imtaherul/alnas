import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server-utils"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) return new NextResponse(null, { status: 401 })
    return NextResponse.json(user)
  } catch {
    return new NextResponse(null, { status: 401 })
  }
}
