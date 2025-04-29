"use client";

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Heatmap } from "@/components/analytics/heatmap"
import { useSearchParams } from "next/navigation"
import { mockTeams } from "../mockData"
import TabNavigation from "../../../components/dashboard/tab-navigation";
import { BannedServerData, generateHeatmapData, getBannedServersConfig, getMonthlyActivityConfig, getReportTypesConfig, getRoomActivityConfig, MonthlyActivityData, ReportTypeData, RoomActivityData } from "@/components/analytics/chart-configs";
import { PlotlyChart } from "@/components/analytics/plotly-chart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfoCardWithTrend from "@/components/analytics/info-card-with-trend";

// Mock data for charts
const roomActivityData: RoomActivityData[] = [
    { name: "#general:matrix.org", reports: 42, bans: 15 },
    { name: "#support:matrix.org", reports: 28, bans: 9 },
    { name: "#community:matrix.org", reports: 17, bans: 5 },
    { name: "#development:matrix.org", reports: 8, bans: 2 },
    { name: "#random:matrix.org", reports: 5, bans: 1 },
]

const reportTypesData: ReportTypeData[] = [
    { id: 1, label: "Spam", value: 45, color: "#f97316" },
    { id: 2, label: "Harassment", value: 32, color: "#ef4444" },
    { id: 3, label: "Inappropriate Content", value: 28, color: "#ec4899" },
    { id: 4, label: "Scam", value: 15, color: "#f59e0b" },
    { id: 5, label: "Other", value: 10, color: "#6366f1" },
]

const bannedServersData: BannedServerData[] = [
    { label: "spam.org", value: 28, secondaryLabel: "28 users" },
    { label: "scam.net", value: 17, secondaryLabel: "17 users" },
    { label: "badactor.io", value: 12, secondaryLabel: "12 users" },
    { label: "malicious.com", value: 9, secondaryLabel: "9 users" },
    { label: "troll.xyz", value: 7, secondaryLabel: "7 users" },
]

// Enhanced monthly activity data with more realistic patterns
const monthlyActivityData: MonthlyActivityData[] = [
    { month: "Jan", reports: 24, bans: 8, year: 2025 },
    { month: "Feb", reports: 32, bans: 12, year: 2025 },
    { month: "Mar", reports: 45, bans: 18, year: 2025 },
    { month: "Apr", reports: 38, bans: 15, year: 2025 },
    { month: "May", reports: 29, bans: 11, year: 2025 },
    { month: "Jun", reports: 35, bans: 14, year: 2025 },
    { month: "Jul", reports: 42, bans: 17, year: 2025 },
    { month: "Aug", reports: 50, bans: 22, year: 2025 },
    { month: "Sep", reports: 43, bans: 19, year: 2025 },
    { month: "Oct", reports: 37, bans: 16, year: 2025 },
    { month: "Nov", reports: 31, bans: 13, year: 2025 },
    { month: "Dec", reports: 28, bans: 10, year: 2025 },
]


export default function AnalyticsDashboard() {
    const searchParams = useSearchParams()
    const teamIdParam = searchParams.get("team")
    const [selectedTeam, setSelectedTeam] = useState(mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0])


    // Update selected team when URL param changes
    useEffect(() => {
        const team = mockTeams.find((t) => t.id === teamIdParam)
        if (team) {
            setSelectedTeam(team)
        }
    }, [teamIdParam])

    const [timeRange, setTimeRange] = useState("year")
    const [heatmapType, setHeatmapType] = useState("reports")

    // Generate mock data
    const reportsHeatmapData = generateHeatmapData(1.5, 42)
    const bansHeatmapData = generateHeatmapData(1, 123)

    // Get chart configurations
    const roomActivityConfig = getRoomActivityConfig(roomActivityData)
    const reportTypesConfig = getReportTypesConfig(reportTypesData)
    const monthlyActivityConfig = getMonthlyActivityConfig(monthlyActivityData)
    const bannedServersConfig = getBannedServersConfig(bannedServersData)


    const reportChangePercent = 12

    return (
        <>
            <TabNavigation selectedTeam={selectedTeam} currentTab="analytics" />
            <div className="space-y-4">
                <div className="flex items-center  justify-end">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[120px] h-8 bg-gray-900 border-gray-800">
                            <SelectValue placeholder="Time Range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="month">Past Month</SelectItem>
                            <SelectItem value="quarter">Past Quarter</SelectItem>
                            <SelectItem value="year">Past Year</SelectItem>
                            <SelectItem value="all">All Time</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <InfoCardWithTrend title="Total Reports" changePercent={12} value={247} trendColorOverride={reportChangePercent > 0 ? "text-red-400" : "text-green-400"} />
                    <InfoCardWithTrend title="Bans Issued" changePercent={5} value={98} />
                    <InfoCardWithTrend title="Unique Reporters" changePercent={8} value={42} />
                    <InfoCardWithTrend title="Avg. Response Time" changePercent={-15} value="1.4h" />
                </div>

                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Activity Heatmap</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Visualization of moderation activity over time
                                </CardDescription>
                            </div>
                            <Tabs value={heatmapType} onValueChange={setHeatmapType}>
                                <TabsList className="bg-gray-900">
                                    <TabsTrigger value="reports" className="text-xs">
                                        Reports
                                    </TabsTrigger>
                                    <TabsTrigger value="bans" className="text-xs">
                                        Bans
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent className="overflow-hidden">
                        <Heatmap
                            data={heatmapType === "reports" ? reportsHeatmapData : bansHeatmapData}
                            title={`${heatmapType === "reports" ? "Reports Activity" : "Ban Actions"} (Past Year)`}
                            colorIntensityLabel={heatmapType === "reports" ? "reports" : "bans"}
                        />
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <CardTitle>Room Activity</CardTitle>
                            <CardDescription className="text-gray-400">Reports and bans by room</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PlotlyChart data={roomActivityConfig.data} layout={roomActivityConfig.layout} />
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <CardTitle>Report Types</CardTitle>
                            <CardDescription className="text-gray-400">Distribution of report reasons</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PlotlyChart data={reportTypesConfig.data} layout={reportTypesConfig.layout} />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <CardTitle>Monthly Activity</CardTitle>
                            <CardDescription className="text-gray-400">Reports and bans over the past year</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PlotlyChart data={monthlyActivityConfig.data} layout={monthlyActivityConfig.layout} />
                        </CardContent>
                    </Card>

                    <Card className="border-gray-800 bg-gray-950">
                        <CardHeader>
                            <CardTitle>Most Banned Servers</CardTitle>
                            <CardDescription className="text-gray-400">Servers with the most banned users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PlotlyChart data={bannedServersConfig.data} layout={bannedServersConfig.layout} />
                            <div className="mt-4 flex items-center justify-center">
                                <Button variant="outline" size="sm" className="border-gray-800 text-gray-400 hover:text-white" asChild>
                                    <Link href={`/dashboard/bans?team=${selectedTeam.id}`}>
                                        <Users className="mr-2 h-4 w-4" />
                                        View All Banned Servers
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <CardTitle>Moderation Efficiency</CardTitle>
                        <CardDescription className="text-gray-400">
                            Key performance indicators for your moderation team
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-400">Average Response Time</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold">1.4h</span>
                                    <span className="text-xs text-green-400">-15% from last month</span>
                                </div>
                                <p className="text-xs text-gray-400">Time between report creation and moderator action</p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-400">Resolution Rate</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold">92%</span>
                                    <span className="text-xs text-green-400">+3% from last month</span>
                                </div>
                                <p className="text-xs text-gray-400">Percentage of reports that were resolved</p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-400">Moderator Activity</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold">4.2</span>
                                    <span className="text-xs text-gray-400">actions per day</span>
                                </div>
                                <p className="text-xs text-gray-400">Average number of moderation actions per day</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="mb-2 text-sm font-medium text-gray-400">Moderator Performance</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-900 text-xs font-medium">
                                        AM
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">@admin:matrix.org</span>
                                            <span className="text-xs text-gray-400">42 actions</span>
                                        </div>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-900">
                                            <div className="h-full rounded-full bg-purple-600" style={{ width: "85%" }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-medium">
                                        M1
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">@mod1:matrix.org</span>
                                            <span className="text-xs text-gray-400">36 actions</span>
                                        </div>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-900">
                                            <div className="h-full rounded-full bg-blue-600" style={{ width: "72%" }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-900 text-xs font-medium">
                                        M2
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">@mod2:matrix.org</span>
                                            <span className="text-xs text-gray-400">28 actions</span>
                                        </div>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-900">
                                            <div className="h-full rounded-full bg-green-600" style={{ width: "56%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
