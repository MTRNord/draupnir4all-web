import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./lib/auth";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("d4all_session");

    // If not root url check if the session cookie is set, and check if the session expired. If it did redirect to /refresh
    if (req.nextUrl.pathname !== "/" && session) {
        console.log("Session cookie found:", session.value);
        const sessionData: User = JSON.parse(session.value);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if the session has expired
        if (sessionData.openidExpiration && sessionData.openidExpiration < currentTime) {
            console.log("Session expired, redirecting to /refresh");
            return NextResponse.redirect(new URL("/refresh", req.url));
        }
    }

    // Redirect to login if session is missing on protected routes
    if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"], // Add other protected routes here
};