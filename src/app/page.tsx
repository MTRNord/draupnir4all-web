import Link from "next/link"
import { Shield, Users, BarChart, Settings, AlertTriangle, CheckCircle, Ban, Eye, LogIn, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cookies } from "next/headers"

export const experimental_ppr = true
const d4all_support_url = process.env.NEXT_PUBLIC_D4ALL_SUPPORT_URL || "#"

export default async function Home() {
  // Get session cookie if available
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold tracking-tighter">Draupnir4All</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium text-gray-400 transition-colors hover:text-white" href="#features">
              Features
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              href="https://the-draupnir-project.github.io/draupnir-documentation/category/moderators-guide"
            >
              Documentation
            </Link>
            <Link
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              href={d4all_support_url}
            >
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {sessionCookie ? (
                <Link href="/dashboard">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">Dashboard</Button>
                </Link>
              ) :
                (
                  <>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-purple-600 text-white hover:bg-purple-700">Register</Button>
                    </Link>
                  </>
                )}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-950 border-gray-800 p-0">
                <VisuallyHidden asChild>
                  <SheetTitle>Navigaion</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col h-full">
                  <div className="border-b border-gray-800 p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span className="font-medium">Draupnir4All</span>
                    </div>
                  </div>
                  <nav className="flex flex-col p-4 gap-4">
                    <Link
                      className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                      href="#features"
                    >
                      Features
                    </Link>
                    <Link
                      className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                      href="https://the-draupnir-project.github.io/draupnir-documentation/category/moderators-guide"
                    >
                      Documentation
                    </Link>
                    <Link
                      className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                      href={d4all_support_url}
                    >
                      Support
                    </Link>
                  </nav>
                  <div className="mt-auto border-t border-gray-800 p-4 flex flex-col gap-3">
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Register</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Draupnir4All</h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Self-service moderation for Matrix communities. Deploy your own Draupnir bot instance and protect
                    your spaces with advanced filtering, reporting, and management.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Register with Matrix</Button>
                  </Link>
                  <Link href="https://the-draupnir-project.github.io/draupnir-documentation/category/moderators-guide">
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                    >
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] overflow-hidden rounded-lg border border-gray-800 bg-black p-2">
                  <div className="flex items-center justify-between border-b border-gray-800 p-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span className="text-sm font-medium">Draupnir Moderation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center gap-2 rounded-md bg-gray-900 p-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs">Spam detected in #general - Action required</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-gray-900 p-2">
                      <Ban className="h-4 w-4 text-red-500" />
                      <span className="text-xs">User @spammer:example.com banned from 3 rooms</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-gray-900 p-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs">Moderation report resolved by @admin:example.com</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-gray-900 p-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="text-xs">Monitoring 12 active rooms - All systems normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Self-service provisioning for Draupnir moderation bots
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900 mb-4">
                    <LogIn className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold">1. Authenticate</h3>
                  <p className="text-gray-400 mt-2">Verify your identity with your Matrix account</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900 mb-4">
                    <Settings className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold">2. Configure</h3>
                  <p className="text-gray-400 mt-2">Set up your Draupnir bot with custom rules and policies</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900 mb-4">
                    <Shield className="h-6 w-6 text-purple-300" />
                  </div>
                  <h3 className="text-xl font-bold">3. Moderate</h3>
                  <p className="text-gray-400 mt-2">Access your moderation dashboard to manage your Matrix spaces</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 id="features" className="scroll-mt-24 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Draupnir Features
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Powerful moderation tools designed specifically for Matrix communities
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Ban className="h-5 w-5 text-red-500" />
                    <CardTitle>Ban Management</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    Efficiently manage bans across multiple rooms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Create and manage ban lists that can be shared across rooms and servers. Ban by user ID, server
                    name, or room patterns with powerful filtering options.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Placeholder TODO</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Placeholder TODO</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Meow Meow Meow</p>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <CardTitle>Distributed Moderation</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Collaborate with trusted moderators</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Create policy rooms where trusted moderators can collaborate on moderation decisions. Share ban
                    lists and coordinate responses to abuse across communities.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    <CardTitle>Analytics Dashboard</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Monitor moderation activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Track moderation actions, abuse patterns, and community reports.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <CardTitle>Customizable Rules</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Create rules tailored to your community</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">
                    Use powerful Draupnir Protections to configure the bot for your needs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-black">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-orange-500" />
                    <CardTitle>Placeholder TODO</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">Placeholder TODO</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Meow Meow Meow</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-black py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Secure Your Matrix Community?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Register with your Matrix account and deploy your Draupnir bot in minutes
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">Register with Matrix</Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-black py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium">Draupnir4All</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            © 2025 Draupnir4All. Built for the Matrix ecosystem.
          </p>
          <div className="flex gap-4">
            <Link className="text-sm font-medium text-gray-500 transition-colors hover:text-white" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium text-gray-500 transition-colors hover:text-white" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium text-gray-500 transition-colors hover:text-white" href="#">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}