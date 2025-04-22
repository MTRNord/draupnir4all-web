import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"
import { jwtVerify, SignJWT } from "jose"

// Secret key for JWT signing - in production, use a proper secret management system
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "this_is_a_secret_key_that_should_be_in_env_variables",
)

export type User = {
    id: string
    matrixId: string
    displayName: string
    avatarUrl?: string
    isAdmin: boolean
}

export async function createSession(user: User): Promise<string> {
    // Create a JWT token with user data
    const token = await new SignJWT({ user })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d") // Token expires in 7 days
        .sign(JWT_SECRET)

    return token
}

export async function setSessionCookie(token: string, response: NextResponse): Promise<void> {
    // Set the session cookie with secure attributes
    response.cookies.set({
        name: "matrix_session",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
}

export async function getSessionUser(request?: NextRequest): Promise<User | null> {
    try {
        // Get the session cookie
        const cookieStore = request ? request.cookies : await cookies()
        const sessionCookie = cookieStore.get("matrix_session")

        if (!sessionCookie?.value) {
            return null
        }

        // Verify the JWT token
        try {
            const { payload } = await jwtVerify(sessionCookie.value, JWT_SECRET)

            if (!payload.user) {
                return null
            }

            return payload.user as User
        } catch (jwtError) {
            console.error("JWT verification failed:", jwtError)
            return null
        }
    } catch (error) {
        console.error("Failed to verify session:", error)
        return null
    }
}

export async function clearSession(response: NextResponse): Promise<void> {
    // Clear the session cookie
    response.cookies.set({
        name: "matrix_session",
        value: "",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    })
}
