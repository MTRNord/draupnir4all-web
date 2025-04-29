"use client"
import { AlertTriangle, Ban, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AddProtectedRoom from "../../../components/modals/add-protected-room"
import ProtectedRomsList from "../../../components/dashboard/protected-rooms-list"
import { mockPolicyLists, mockReports, mockTeams } from "../mockData"
import TabNavigation from "../../../components/dashboard/tab-navigation";
import { useSearchParams } from "next/navigation"

export default function OverviewPage() {
    const searchParams = useSearchParams()
    const teamIdParam = searchParams.get("team");


    const selectedTeam = mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0];
    const reports = mockReports.filter((report) => report.teamId === selectedTeam.id);
    const policyLists = mockPolicyLists.filter((list) => list.teamId === selectedTeam.id);

    return (
        <>
            <TabNavigation selectedTeam={selectedTeam} currentTab="overview" />
            <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Protected Rooms</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{selectedTeam.rooms.length}</div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-400">Monitored by this bot</p>
                                <AddProtectedRoom />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{reports.length}</div>
                            <p className="text-xs text-gray-400">{reports.filter((r) => r.priority === "high").length} high priority</p>
                        </CardContent>
                    </Card>
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Bans Issued</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {policyLists.reduce((total, list) => total + list.entries.length, 0)}
                            </div>
                            <p className="text-xs text-gray-400">Across all policy lists</p>
                        </CardContent>
                    </Card>
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Bot Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <div className="text-sm font-medium">Online</div>
                            </div>
                            <p className="text-xs text-gray-400">Last restart: 7d ago</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription className="text-gray-400">Latest moderation actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-red-500/20 p-2">
                                        <Ban className="h-4 w-4 text-red-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">User banned</p>
                                        <p className="text-xs text-gray-400">@spammer:matrix.org was banned from all rooms</p>
                                        <p className="text-xs text-gray-500">10 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-yellow-500/20 p-2">
                                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Report created</p>
                                        <p className="text-xs text-gray-400">Spam detected in #support</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full bg-green-500/20 p-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Report resolved</p>
                                        <p className="text-xs text-gray-400">Harassment report in #community resolved</p>
                                        <p className="text-xs text-gray-500">3 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Protected Rooms</CardTitle>
                                    <CardDescription className="text-gray-400">Rooms monitored by this bot</CardDescription>
                                </div>
                                <AddProtectedRoom filled />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ProtectedRomsList team={selectedTeam} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}