import type React from "react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/auth"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Check if the user is authenticated on the server
    const user = await getSessionUser()

    // If not authenticated, redirect to login
    if (!user) {
        redirect("/login")
    }

    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
            {children}
        </Suspense>
    )
}
