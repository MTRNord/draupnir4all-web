import { type NextRequest, NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request)

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    console.error("Session check failed:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
