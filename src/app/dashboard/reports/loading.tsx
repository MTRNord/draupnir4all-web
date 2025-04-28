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

            <Card className="border-gray-800 bg-gray-950">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-8 w-32" />
                    </div>
                    <Skeleton className="h-4 w-64 mt-1" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-32 mb-2" />

                            {Array(3)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="p-3 rounded-md border border-gray-800 space-y-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-4 w-4" />
                                                <Skeleton className="h-5 w-32" />
                                            </div>
                                            <Skeleton className="h-5 w-16" />
                                        </div>
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                ))}
                        </div>

                        <div className="space-y-4">
                            <Skeleton className="h-5 w-32 mb-2" />

                            <div className="space-y-4">
                                <div className="p-4 rounded-md bg-gray-900 border border-gray-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-5 w-24" />
                                    </div>

                                    <div className="space-y-2">
                                        {Array(4)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div key={i} className="flex justify-between">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-md bg-gray-900 border border-gray-800">
                                    <Skeleton className="h-5 w-40 mb-3" />

                                    <div className="space-y-3">
                                        {Array(3)
                                            .fill(0)
                                            .map((_, i) => (
                                                <div key={i} className="flex justify-between">
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-4 w-32" />
                                                </div>
                                            ))}

                                        <Skeleton className="h-[100px] w-full mt-4" />
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Skeleton className="h-9 w-28" />
                                    <Skeleton className="h-9 w-28" />
                                    <Skeleton className="h-9 w-36" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
