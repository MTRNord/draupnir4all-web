import type { ReactNode } from "react"
import { Suspense } from "react"

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
            {children}
        </Suspense>
    )
}
