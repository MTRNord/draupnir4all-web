'use client'

export type User = {
    id: string
    matrixId: string
    displayName: string
    avatarUrl?: string
    isAdmin: boolean
}

export function createSession(user: User) {
    const localStorage = globalThis.localStorage;
    if (localStorage) {
        localStorage.setItem('session', JSON.stringify(user))
    }
}

export function deleteSession() {
    const localStorage = globalThis.localStorage;
    if (localStorage) {
        localStorage.removeItem('session')
    }
}

export function getSessionUser(): User | undefined {
    try {
        // Get the session from local storage
        const sessionCookie = globalThis.localStorage?.getItem('session')
        if (!sessionCookie) {
            return
        }

        return JSON.parse(sessionCookie) as User
    } catch (error) {
        globalThis.localStorage?.removeItem('session')

        console.error("Failed to verify session:", error)
        return
    }
}