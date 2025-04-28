"use client"
import { useSession } from "@/contexts/session-context"
import { redirect, useSearchParams } from "next/navigation"

export default function DashboardPage() {
  const { user } = useSession()
  const searchParams = useSearchParams()
  const teamId = searchParams.get("team")
  if (!user) {
    redirect("/login")
  }

  // Redirect to overview with team parameter
  const redirectUrl = teamId ? `/dashboard/overview?team=${teamId}` : "/dashboard/overview"

  redirect(redirectUrl)
}
