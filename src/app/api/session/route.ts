import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { openidToken } = await req.json();

    if (!openidToken) {
        return NextResponse.json({ error: "OpenID token is required" }, { status: 400 });
    }

    const isValid = await validateOpenIDToken(openidToken);
    if (!isValid) {
        return NextResponse.json({ error: "Invalid OpenID token" }, { status: 401 });
    }

    const user = {
        id: "user_" + Math.random().toString(36).substring(2, 9),
        isAdmin: false,
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

export async function DELETE() {
    const response = NextResponse.json({}, { status: 204 });
    response.cookies.set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
    return response;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateOpenIDToken(openidToken: string): Promise<boolean> {
    // TODO: Implement OpenID token validation logic with the backend
    return true;
}