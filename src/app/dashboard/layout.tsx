import type React from "react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getSessionUser } from "@/lib/auth"
import { DashboardHeader } from "./components/dashboard-header"

// Mock data for teams/bots
const mockTeams = [
    {
        id: "team1",
        name: "Main Community Bot",
        description: "Moderation for main community rooms",
        owner: "@admin:matrix.org",
        created: "2025-01-15T10:00:00Z",
        members: [
            {
                id: "user1",
                name: "@admin:matrix.org",
                role: "owner",
                avatar: null,
                joined: "2025-01-15T10:00:00Z",
            },
            {
                id: "user2",
                name: "@mod1:matrix.org",
                role: "moderator",
                avatar: null,
                joined: "2025-01-16T14:30:00Z",
            },
            {
                id: "user3",
                name: "@mod2:matrix.org",
                role: "moderator",
                avatar: null,
                joined: "2025-02-01T09:15:00Z",
            },
        ],
        rooms: ["#general:matrix.org", "#support:matrix.org", "#community:matrix.org"],
    },
    {
        id: "team2",
        name: "Development Team Bot",
        description: "Moderation for development-related rooms",
        owner: "@admin:matrix.org",
        created: "2025-02-10T11:30:00Z",
        members: [
            {
                id: "user1",
                name: "@admin:matrix.org",
                role: "owner",
                avatar: null,
                joined: "2025-02-10T11:30:00Z",
            },
            {
                id: "user4",
                name: "@dev1:matrix.org",
                role: "moderator",
                avatar: null,
                joined: "2025-02-11T13:45:00Z",
            },
        ],
        rooms: ["#development:matrix.org", "#coding:matrix.org"],
    },
]

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
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Suspense
                fallback={
                    <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-black/80 backdrop-blur-sm">
                        Loading...
                    </div>
                }
            >
                <DashboardHeader teams={mockTeams} />
            </Suspense>
            <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
                <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
                    {children}
                </Suspense>
            </main>
        </div>
    )
}
