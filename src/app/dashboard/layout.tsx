import type { ReactNode } from "react"
import { Suspense } from "react"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { mockTeams } from "./mockData"

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
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
