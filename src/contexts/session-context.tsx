"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { generateOpenIDToken, login as realLogin, logout as realLogout } from "@/lib/clientSideAuth";
import { User } from "@/lib/auth";

type SessionContextType = {
    user?: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    discoveryStatus: "idle" | "loading" | "success" | "error";
    homeserverUrl?: string;
    login: (matrixId: string, password: string) => Promise<void>;
    register: (matrixId: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    discoverHomeserver: (matrixId: string) => Promise<void>;
    fetchWithTokenRefresh: (url: string, options?: RequestInit) => Promise<Response>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [homeserverUrl, setHomeserverUrl] = useState<string | undefined>();
    const [discoveryStatus, setDiscoveryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [openidExpiration, setOpenIDExpiration] = useState<number | undefined>();
    const router = useRouter();

    // Restore session from cookies on initial load
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("/api/session");
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Failed to restore session:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    const refreshOpenIDToken = useCallback(async () => {
        if (!homeserverUrl || !accessToken || !user) {
            throw new Error("Missing required information to refresh OpenID token.");
        }

        try {
            const openidToken = await generateOpenIDToken(homeserverUrl, user.matrixId, accessToken);

            // Update the session cookie with the new OpenID token
            const response = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ openidToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to update session with new OpenID token.");
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error("Failed to refresh OpenID token:", error);
            throw error;
        }
    }, [homeserverUrl, accessToken, user]);

    // Automatically refresh OpenID token before it expires
    useEffect(() => {
        if (openidExpiration) {
            const now = Date.now();
            const refreshTime = openidExpiration - 60 * 1000; // Refresh 1 minute before expiration

            if (refreshTime > now) {
                const timeout = setTimeout(() => {
                    refreshOpenIDToken().catch((err) => {
                        console.error("Failed to refresh OpenID token:", err);
                    });
                }, refreshTime - now);

                return () => clearTimeout(timeout);
            }
        }
    }, [openidExpiration, refreshOpenIDToken]);

    const discoverHomeserver = async (matrixId: string) => {
        setDiscoveryStatus("loading");
        if (!matrixId.includes(":")) {
            setDiscoveryStatus("error");
            throw new Error("Invalid Matrix ID format. Please include a domain (e.g., @user:domain).");
        }

        const serverName = matrixId.split(":").pop();

        try {
            const url = new URL("/.well-known/matrix/client", `https://${serverName}`);
            const response = await fetch(url);
            if (response.ok) {
                // Check if the response is empty
                if (!response.body) {
                    setHomeserverUrl(`https://${serverName}`);
                    setDiscoveryStatus("success");
                    return;
                }

                const data = await response.json();
                if (data["m.homeserver"]?.base_url) {
                    // Check if the base_url is a valid URL by checking /_matrix/client/versions on the endpoint
                    const url = new URL("/_matrix/client/versions", data["m.homeserver"].base_url)
                    const versionsResponse = await fetch(url);
                    console.log("Versions response:", versionsResponse.status);
                    if (versionsResponse.ok) {
                        setHomeserverUrl(data["m.homeserver"].base_url);
                        setDiscoveryStatus("success");
                        return;
                    } else {
                        setDiscoveryStatus("error");
                        throw new Error("Homeserver did not respond successfully to versions request.");
                    }
                }
            }
            setHomeserverUrl(`https://${serverName}`);
            setDiscoveryStatus("success");
        } catch (error: unknown) {
            console.warn("Failed to discover homeserver:", error);
            setHomeserverUrl(`https://${serverName}`);
            setDiscoveryStatus("success");
        }
    };

    const login = async (matrixId: string, password: string) => {
        setIsLoading(true);
        if (!homeserverUrl) {
            throw new Error("Homeserver URL is not set. Please discover your homeserver first.");
        }

        try {
            // Step 1: Login to Matrix and get access token
            const accessToken = await realLogin(homeserverUrl, matrixId, password);
            setAccessToken(accessToken);

            // Step 2: Generate OpenID token
            const { access_token: openidToken, expires_in } = await generateOpenIDToken(homeserverUrl, matrixId, accessToken);
            setOpenIDExpiration(expires_in);

            // Step 3: Send OpenID token to the server for validation and session creation
            const response = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ openidToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to create session on the server.");
            }

            const userData = await response.json();
            setUser(userData);

            // Persist access token and expiration in sessionStorage
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("openidExpiration", expires_in.toString());


            router.replace("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (matrixId: string, password: string) => {
        setIsLoading(true);
        if (!homeserverUrl) {
            throw new Error("Homeserver URL is not set. Please discover your homeserver first.");
        }

        try {

            // Step 1: Login to Matrix and get access token
            const accessToken = await realLogin(homeserverUrl, matrixId, password);
            setAccessToken(accessToken);

            // Step 2: Generate OpenID token
            const { access_token: openidToken, expires_in } = await generateOpenIDToken(homeserverUrl, matrixId, accessToken);
            setOpenIDExpiration(expires_in);

            // Step 3: Send OpenID token to the server for validation and session creation
            const response = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ openidToken }),
            });

            if (!response.ok) {
                throw new Error("Failed to create session on the server.");
            }
            const userData = await response.json();
            setUser(userData);

            // Persist access token and expiration in sessionStorage
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("openidExpiration", expires_in.toString());


            router.replace("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/session", { method: "DELETE" });

            if (homeserverUrl && accessToken) {
                await realLogout(homeserverUrl, accessToken);
            }

            setUser(undefined);
            setAccessToken(undefined);
            setOpenIDExpiration(undefined);

            // Clear sessionStorage
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("openidExpiration");

            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchWithTokenRefresh = async (url: string, options: RequestInit = {}) => {
        const response = await fetch(url, options);

        if (response.status === 401) {
            // Token expired, refresh it
            await refreshOpenIDToken();

            // Retry the request
            return fetch(url, options);
        }

        return response;
    };

    return (
        <SessionContext.Provider
            value={{
                user,
                isLoading,
                homeserverUrl,
                discoveryStatus,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                discoverHomeserver,
                fetchWithTokenRefresh,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}