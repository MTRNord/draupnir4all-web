import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export type User = {
    id: string
    matrixId: string
    displayName: string
    avatarUrl?: string
    isAdmin: boolean
}

export async function encrypt(user: User) {
    return new SignJWT({ user })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error: unknown) {
        console.log('Failed to verify session', error)
    }
}

export async function createSession(user: User) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(user)
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function getSessionUser(): Promise<User | null> {
    try {
        // Get the session cookie
        const sessionCookie = (await cookies()).get('session')

        if (!sessionCookie?.value) {
            return null
        }

        // Verify the JWT token
        try {
            const { payload } = await jwtVerify(sessionCookie.value, encodedKey)

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