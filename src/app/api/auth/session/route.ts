import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    console.error("Session check failed:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
