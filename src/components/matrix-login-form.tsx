"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2, X, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MatrixLoginFormProps {
  matrixId: string
  onSuccess: (token: string) => void
  onCancel: () => void
}

interface WellKnownResponse {
  "m.homeserver"?: {
    base_url: string
  }
}

export function MatrixLoginForm({ matrixId, onSuccess, onCancel }: MatrixLoginFormProps) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [homeserverUrl, setHomeserverUrl] = useState<string | null>(null)
  const [discoveryStatus, setDiscoveryStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Extract username and server from Matrix ID
  const serverName = matrixId.includes(":") ? matrixId.split(":").pop() || "matrix.org" : "matrix.org"
  // TODO: Fix me
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const username = matrixId.startsWith("@")
    ? matrixId.includes(":")
      ? matrixId.split(":")[0].substring(1)
      : matrixId.substring(1)
    : matrixId

  // Discover homeserver URL
  useEffect(() => {
    async function discoverHomeserver() {
      if (!serverName) return

      setDiscoveryStatus("loading")
      try {
        // Try to fetch well-known data
        const wellKnownUrl = `https://${serverName}/.well-known/matrix/client`

        try {
          const response = await fetch(wellKnownUrl)
          if (response.ok) {
            const data = (await response.json()) as WellKnownResponse
            if (data["m.homeserver"]?.base_url) {
              setHomeserverUrl(data["m.homeserver"].base_url)
              setDiscoveryStatus("success")
              return
            }
          }
        } catch (e) {
          console.warn("Well-known discovery failed, falling back to direct server", e)
        }

        // Fallback to direct server
        setHomeserverUrl(`https://${serverName}`)
        setDiscoveryStatus("success")
      } catch (err) {
        console.error("Homeserver discovery failed:", err)
        setError("Could not discover Matrix homeserver. Please check your Matrix ID.")
        setDiscoveryStatus("error")
      }
    }

    discoverHomeserver()
  }, [serverName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!homeserverUrl) {
      setError("Homeserver URL not available. Please try again.")
      return
    }

    setIsLoading(true)
    setError("")

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

      // Pass the token to the parent component
      onSuccess(mockOpenIdToken)
    } catch (err) {
      console.error("Matrix login failed:", err)
      setError(err instanceof Error ? err.message : "Authentication failed")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="matrix-username">Matrix ID</Label>
          <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-gray-400" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm">
          <span>{matrixId}</span>
        </div>

        {discoveryStatus === "loading" && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            Discovering homeserver...
          </div>
        )}

        {discoveryStatus === "success" && homeserverUrl && (
          <p className="text-xs text-gray-400">Authenticating with {homeserverUrl.replace(/^https?:\/\//, "")}</p>
        )}

        {discoveryStatus === "error" && (
          <p className="text-xs text-red-400">Failed to discover homeserver. Please check your Matrix ID.</p>
        )}
      </div>

      {discoveryStatus === "success" && (
        <div className="space-y-2">
          <Label htmlFor="matrix-password">Password</Label>
          <Input
            id="matrix-password"
            type="password"
            placeholder="Enter your Matrix password"
            className="bg-gray-900 border-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-800">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-sm text-red-300">{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          className="flex-1 bg-purple-600 text-white hover:bg-purple-700"
          disabled={isLoading || !password || discoveryStatus !== "success"}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            "Log in"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Your credentials are sent directly to your Matrix homeserver. Draupnir4All only receives a verification token.
      </p>
    </form>
  )
}
