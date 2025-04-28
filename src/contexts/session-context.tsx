"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { createSession, deleteSession, getSessionUser, User } from "@/lib/auth"

type SessionContextType = {
    user?: User
    isLoading: boolean
    isAuthenticated: boolean
    discoveryStatus: "idle" | "loading" | "success" | "error"
    homeserverUrl?: string
    token?: string
    login: (matrixId: string) => Promise<void>
    register: (matrixId: string) => Promise<void>
    logout: () => Promise<void>
    discoverHomeserver: (matrixId: string) => Promise<void>
}

interface WellKnownResponse {
    "m.homeserver"?: {
        base_url: string
    }
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(getSessionUser())
    const [isLoading, setIsLoading] = useState(false)
    const [homeserverUrl, setHomeserverUrl] = useState<string | undefined>()
    const [discoveryStatus, setDiscoveryStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [token, setToken] = useState<string | undefined>()
    const router = useRouter()


    const discoverHomeserver = async (matrixId: string) => {
        if (matrixId === "") {
            return
        }
        setDiscoveryStatus("loading")
        if (!matrixId.includes(":")) {
            setDiscoveryStatus("error")
            throw new Error("Invalid Matrix ID format. Please include a domain (e.g., @user:domain).")
        }
        // Extract username and server from Matrix ID
        const serverName = matrixId.split(":").pop()
        try {
            // Try to fetch well-known data
            const wellKnownUrl = `https://${serverName}/.well-known/matrix/client`

            try {
                const response = await fetch(wellKnownUrl)
                if (response.ok) {
                    const data = (await response.json()) as WellKnownResponse
                    if (data["m.homeserver"]?.base_url) {
                        setDiscoveryStatus("success")
                        setHomeserverUrl(data["m.homeserver"].base_url)
                        return;
                    }
                }
            } catch (e) {
                console.warn("Well-known discovery failed, falling back to direct server", e)
            }

            // Fallback to direct server
            setDiscoveryStatus("success")
            setHomeserverUrl(`https://${serverName}`)
        } catch (err) {
            setDiscoveryStatus("error")
            setHomeserverUrl(undefined)
            console.error("Homeserver discovery failed:", err)
            throw new Error("Could not discover Matrix homeserver. Please check your Matrix ID.")
        }
    }

    const login = async (matrixId: string) => {
        setIsLoading(true)
        try {
            // Step 1: Authenticate with the Matrix homeserver
            console.log(`Authenticating with ${homeserverUrl}`)

            // In a real implementation:
            // const loginResponse = await fetch(`${homeserverUrl}/_matrix/client/v3/login`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     type: 'm.login.password',
            //     identifier: {
            //       type: 'm.id.user',
            //       user: username
            //     },
            //     password
            //   })
            // })

            // const loginData = await loginResponse.json()
            // if (!loginData.access_token) {
            //   throw new Error(loginData.error || 'Login failed')
            // }

            // Simulate login delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Simulate access token
            // TODO: Fix me
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const mockAccessToken = "syt_" + Math.random().toString(36).substring(2, 15)

            // Step 2: Request an OpenID token
            console.log(`Requesting OpenID token for ${matrixId}`)

            // In a real implementation:
            // const openIdResponse = await fetch(
            //   `${homeserverUrl}/_matrix/client/v3/user/${encodeURIComponent(matrixId)}/openid/request_token`,
            //   {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       'Authorization': `Bearer ${loginData.access_token}`
            //     },
            //     body: JSON.stringify({})
            //   }
            // )

            // const openIdData = await openIdResponse.json()
            // if (!openIdData.access_token) {
            //   throw new Error(openIdData.error || 'Failed to get OpenID token')
            // }

            // Simulate OpenID token request delay
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Simulate OpenID token
            const mockOpenIdToken =
                "ey" +
                Math.random().toString(36).substring(2, 15) +
                "." +
                Math.random().toString(36).substring(2, 15) +
                "." +
                Math.random().toString(36).substring(2, 15)

            // Save the OpenID token to the session
            setToken(mockOpenIdToken)
            createSession({
                matrixId,
                displayName: matrixId.split(":")[0].substring(1),
                id: "user_" + Math.random().toString(36).substring(2, 9),
                isAdmin: false,
            })
            router.replace("/dashboard")
            return;
        } catch (err) {
            console.error("Matrix login failed:", err)
            throw err instanceof Error ? err.message : "Authentication failed"
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
            router.replace("/dashboard")
        } catch (error) {
            console.error("Registration failed:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            setUser(undefined)
            deleteSession()
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
                homeserverUrl,
                discoveryStatus,
                isAuthenticated: !!user,
                token,
                login,
                register,
                logout,
                discoverHomeserver,
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
