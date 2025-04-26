import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { matrixId } = await request.json()

    if (!matrixId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would verify the user's credentials with Matrix
    // For demo purposes, we'll create a mock user
    const user = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      matrixId,
      displayName: matrixId.split(":")[0].substring(1),
      isAdmin: matrixId.includes("admin"),
    }

    // Create a session token
    await createSession(user)

    // Create a response
    const response = NextResponse.json({ success: true, user })

    return response
  } catch (error) {
    console.error("Login failed:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
