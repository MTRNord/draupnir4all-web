import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionUser } from "./lib/auth"

export async function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname

    // Define public paths that don't require authentication
    const isPublicPath = path === "/" || path === "/login" || path === "/register"

    // Check if the user is authenticated
    const user = await getSessionUser(request)
    const isAuthenticated = !!user

    // If the path is dashboard and the user is not authenticated, redirect to login
    if (path.startsWith("/dashboard") && !isAuthenticated) {
        const url = new URL("/login", request.url)
        return NextResponse.redirect(url)
    }

    // If the user is authenticated and trying to access login/register, redirect to dashboard
    if (isAuthenticated && isPublicPath) {
        const url = new URL("/dashboard", request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
    matcher: ["/", "/login", "/register", "/dashboard/:path*"],
}
