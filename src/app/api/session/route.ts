import { User } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { openidToken, homeserverUrl, matrixId, openidExpiration } = await req.json();

    if (!openidToken) {
        return NextResponse.json({ error: "OpenID token is required" }, { status: 400 });
    }
    if (!homeserverUrl) {
        return NextResponse.json({ error: "Homeserver URL is required" }, { status: 400 });
    }
    if (!matrixId) {
        return NextResponse.json({ error: "Matrix ID is required" }, { status: 400 });
    }
    if (!openidExpiration) {
        return NextResponse.json({ error: "OpenID expiration is required" }, { status: 400 });
    }

    const user: User = {
        matrixId: matrixId,
        token: openidToken,
        homeserverUrl: homeserverUrl,
        openidExpiration: openidExpiration,
    };

    const response = NextResponse.json(user);
    response.cookies.set("session", JSON.stringify(user), { httpOnly: true, path: "/" });
    return response;
}

export async function GET() {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
        return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    return NextResponse.json(JSON.parse(session));
}

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const response = NextResponse.redirect(url.origin);
    response.cookies.set("session", "", { httpOnly: true, path: "/", maxAge: 0 });

    return response;
}