import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <Skeleton className="h-9 w-64" />
                <div className="hidden md:block">
                    <Skeleton className="h-10 w-[400px]" />
                </div>
            </div>

            <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <Card key={i} className="border-gray-800 bg-gray-950">
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-32" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-16 mb-2" />
                                    <Skeleton className="h-4 w-32" />
                                </CardContent>
                            </Card>
                        ))}
                </div>

                {/* Heatmap Card */}
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <Skeleton className="h-6 w-40 mb-2" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-10 w-[240px]" />
                        </div>
                    </CardHeader>
                    <CardContent className="overflow-hidden">
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>

                {/* Two Column Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-56" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[280px] w-full" />
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-56" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[280px] w-full" />
                        </CardContent>
                    </Card>
                </div>

                {/* Two Column Charts */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-56" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[280px] w-full" />
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-56" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-[220px] w-full mb-4" />
                            <div className="flex items-center justify-center">
                                <Skeleton className="h-9 w-48" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Efficiency Card */}
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            {Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="h-5 w-40" />
                                        <div className="flex items-end gap-2">
                                            <Skeleton className="h-8 w-16" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                ))}
                        </div>

                        <div className="mt-6">
                            <Skeleton className="h-5 w-48 mb-4" />
                            <div className="space-y-4">
                                {Array(3)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <Skeleton className="h-5 w-32" />
                                                    <Skeleton className="h-4 w-16" />
                                                </div>
                                                <Skeleton className="h-1.5 w-full rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
