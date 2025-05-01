import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { Shield } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <header className="sticky top-0 z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-purple-400" />
                            <span className="text-xl font-bold tracking-tighter">Draupnir4All</span>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
                <div>
                    {/* Tab Navigation Skeleton */}
                    <div className="flex items-center justify-between mb-8">
                        <Skeleton className="h-9 w-64" />
                        <div className="hidden md:block">
                            <Skeleton className="h-10 w-[400px]" />
                        </div>
                    </div>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-6 w-32 mb-1" />
                                <Skeleton className="h-9 w-24" /> {/* Add Ban button */}
                            </div>
                            <Skeleton className="h-4 w-64" />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Policy Lists Column */}
                                <div className="space-y-4">
                                    <Skeleton className="h-5 w-32" />
                                    <div className="space-y-2">
                                        {Array(3)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div key={i} className="p-3 rounded-md border border-gray-800 space-y-2">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <Skeleton className="h-5 w-32" />
                                                        <Skeleton className="h-4 w-4" /> {/* Edit icon */}
                                                    </div>
                                                    <Skeleton className="h-4 w-full" />
                                                    <Skeleton className="h-4 w-16" />
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Ban Entries Columns (spans 2 columns) */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-5 w-32" />
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-8 w-[200px]" /> {/* Search input */}
                                            <Skeleton className="h-8 w-[120px]" /> {/* Filter dropdown */}
                                        </div>
                                    </div>
                                    <Skeleton className="h-[400px] w-full rounded-md border border-gray-800" /> {/* Ban entries list */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>

    )
}
