"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Shield, ArrowRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "@/contexts/session-context"
import { redirect } from "next/navigation"
import RedirectionPageClient from "@/components/redirect-workaround"

export default function RegisterPage() {
  const { isLoading, register, discoveryStatus, homeserverUrl, discoverHomeserver, user } = useSession();
  const [loginLoading, setLoginLoading] = useState(isLoading)
  const [matrixId, setMatrixId] = useState("")
  const [step, setStep] = useState<"initial" | "login" | "error">("initial")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  if (user) {
    redirect("/dashboard")
  }

  useEffect(() => {
    console.log("Discovery status changed:", discoveryStatus)
    if (discoveryStatus === "loading") {
      setLoginLoading(true)
    } else if (discoveryStatus === "error") {
      setErrorMessage("Failed to discover homeserver. Please check your Matrix ID format.")
      setLoginLoading(false)
    } else if (discoveryStatus === "success") {
      setErrorMessage("")
      setLoginLoading(false)
    }
  }, [discoveryStatus])

  const startMatrixAuth = useCallback(() => {
    if (!matrixId) return
    setLoginLoading(true)
    discoverHomeserver(matrixId).then(() => {
      setStep("login")
    }).catch((err) => {
      console.error("Error discovering homeserver:", err)
      setErrorMessage("Please check your Matrix ID format. It should be like @username:matrix.org")
      setStep("error")
      setLoginLoading(false)
    });
  }, [matrixId, discoverHomeserver]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      await register(matrixId, password)
    } catch (err) {
      console.error("Login failed:", err)
      setErrorMessage("Login failed. Please check your credentials.")
    }
  }, [register, matrixId, password])

  if (user) {
    return <RedirectionPageClient redirectUrl="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="border-b border-gray-800 bg-black py-4">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold tracking-tighter">Draupnir4All</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-gray-800 bg-gray-950">
          <CardHeader>
            <CardTitle className="text-2xl">Register with Matrix</CardTitle>
            <CardDescription className="text-gray-400">
              Use your Matrix account to register for Draupnir4All
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === "initial" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="matrix-id">Matrix ID</Label>
                  <Input
                    id="matrix-id"
                    placeholder="@username:matrix.org"
                    className="bg-gray-900 border-gray-800"
                    value={matrixId}
                    onChange={(e) => setMatrixId(e.target.value)}
                  />
                  <p className="text-xs text-gray-400">Enter your Matrix ID to begin the authentication process</p>
                </div>
              </div>
            )}

            {step === "login" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="matrix-username">Matrix ID</Label>
                    <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-gray-400" onClick={() => setStep("initial")}>
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
                    <p className="text-xs text-red-400">Failed to discover homeserver. Please check your Matrix ID and ensure it&apos;s format is &quot;@localpart:example.com&quot;.</p>
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
                    onClick={() => {
                      setStep("initial")
                      setMatrixId("")
                      setPassword("")
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Your credentials are sent directly to your Matrix homeserver. Draupnir4All only receives a verification token.
                </p>
              </form>
            )}

            {((isLoading || loginLoading) && discoveryStatus !== "loading") && (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <p className="text-gray-300">Registering your account...</p>
                <p className="text-xs text-gray-400">Setting up your Draupnir4All account</p>
              </div>
            )}

            {((isLoading || loginLoading) && discoveryStatus === "loading") && (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <p className="text-gray-300">Discovering the Homeserver URL...</p>
              </div>
            )}

            {step === "error" && (
              <div className="rounded-md bg-red-900/20 border border-red-800 p-4 text-center">
                <p className="text-red-300 font-medium">Registration Failed</p>
                <p className="text-sm text-red-200 mt-1">{errorMessage}</p>
                <Button
                  variant="outline"
                  className="mt-4 border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300"
                  onClick={() => setStep("initial")}
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {step === "initial" && (
              <Button
                className="w-full bg-purple-600 text-white hover:bg-purple-700"
                onClick={startMatrixAuth}
                disabled={!matrixId}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
