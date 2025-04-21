"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MatrixLoginForm } from "@/components/matrix-login-form"

export default function RegisterPage() {
  const router = useRouter()
  const [matrixId, setMatrixId] = useState("")
  const [step, setStep] = useState<"initial" | "login" | "verifying" | "error">("initial")
  const [errorMessage, setErrorMessage] = useState("")

  const startMatrixAuth = () => {
    if (!matrixId) return
    setStep("login")
  }

  const handleLoginSuccess = async (token: string) => {
    setStep("verifying")

    try {
      // In a real implementation, send the token to your backend for verification
      // const response = await fetch('/api/verify-matrix-token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ matrixId, token })
      // })
      // const data = await response.json()
      // if (!data.success) throw new Error(data.error || 'Verification failed')

      // For demo purposes, simulate a successful verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard after successful registration
      router.push("/dashboard")
    } catch (error) {
      console.error("Token verification failed", error)
      setErrorMessage(error instanceof Error ? error.message : "Verification failed")
      setStep("error")
    }
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
              <MatrixLoginForm matrixId={matrixId} onSuccess={handleLoginSuccess} onCancel={() => setStep("initial")} />
            )}

            {step === "verifying" && (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <p className="text-gray-300">Registering your account...</p>
                <p className="text-xs text-gray-400">Setting up your Draupnir4All account</p>
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

            {step === "verifying" && (
              <Button className="w-full" disabled>
                Please wait...
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
