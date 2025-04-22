"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
    id: string
    matrixId: string
    displayName: string
    avatarUrl?: string
    isAdmin: boolean
}

type SessionContextType = {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (matrixId: string) => Promise<void>
    register: (matrixId: string) => Promise<void>
    logout: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("/api/auth/session")
                const data = await response.json()

                if (data.authenticated && data.user) {
                    setUser(data.user)
                }
            } catch (error) {
                console.error("Failed to check session:", error)
            } finally {
                setIsLoading(false)
            }
        }

        checkSession()
    }, [])

    const login = async (matrixId: string) => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matrixId }),
            })

            if (!response.ok) {
                throw new Error("Authentication failed")
            }

            const data = await response.json()
            setUser(data.user)
            router.push("/dashboard")
        } catch (error) {
            console.error("Login failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (matrixId: string) => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ matrixId }),
            })

            if (!response.ok) {
                throw new Error("Registration failed")
            }

            const data = await response.json()
            setUser(data.user)
            router.push("/dashboard")
        } catch (error) {
            console.error("Registration failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" })
            setUser(null)
            router.push("/")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <SessionContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
