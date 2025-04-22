import { NextResponse } from "next/server"
import { clearSession } from "@/lib/auth"

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json({ success: true })

    // Clear the session cookie
    await clearSession(response)

    return response
  } catch (error) {
    console.error("Logout failed:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
