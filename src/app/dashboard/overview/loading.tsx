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

            <div className="space-y-8">
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
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>

                {/* Two Column Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <Skeleton className="h-6 w-40 mb-2" />
                            <Skeleton className="h-4 w-56" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array(3)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <div className="space-y-1 flex-1">
                                                <Skeleton className="h-5 w-32" />
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-6 w-40 mb-2" />
                                    <Skeleton className="h-4 w-56" />
                                </div>
                                <Skeleton className="h-9 w-24" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-2 w-2 rounded-full" />
                                                <Skeleton className="h-5 w-40" />
                                            </div>
                                            <Skeleton className="h-7 w-7 rounded-md" />
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
