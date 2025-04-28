import { NextResponse } from "next/server"

interface WellKnownResponse {
  "m.homeserver"?: {
    base_url: string
  }
}

export async function POST(request: Request) {
  try {
    const { matrixId, token } = await request.json()

    if (!matrixId || !token) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!matrixId.includes(":")) {
      return NextResponse.json({ error: "Invalid Matrix ID format" }, { status: 400 })
    }

    // Extract server name from Matrix ID
    const serverName = matrixId.split(":").pop()

    // Discover homeserver URL
    let homeserverUrl = `https://${serverName}`

    try {
      // Try to fetch well-known data
      const wellKnownUrl = `https://${serverName}/.well-known/matrix/client`
      const response = await fetch(wellKnownUrl)

      if (response.ok) {
        const data = (await response.json()) as WellKnownResponse
        if (data["m.homeserver"]?.base_url) {
          // TODO: Fix me
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          homeserverUrl = data["m.homeserver"].base_url
        }
      }
    } catch (e) {
      console.warn("Well-known discovery failed, falling back to direct server", e)
    }

    // In a real implementation, you would:
    // 1. Make a request to the Matrix server to verify the token
    // const response = await fetch(
    //   `${homeserverUrl}/_matrix/federation/v1/openid/userinfo?access_token=${token}`,
    //   { method: "GET" }
    // )
    // const data = await response.json()

    // 2. Verify that the user ID in the response matches the provided matrixId
    // if (data.sub !== matrixId) {
    //   return NextResponse.json(
    //     { error: "Token verification failed" },
    //     { status: 401 }
    //   )
    // }

    // 3. Create a user account or session in your system

    // For demo purposes, we'll just return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying Matrix token:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
