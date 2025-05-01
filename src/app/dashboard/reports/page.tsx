import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockReports } from "../mockData";
import TabNavigation from "../../../components/dashboard/tab-navigation"
import LayoutWrapper from "@/components/dashboard/layoutWrapper"
import { cookies } from "next/headers"
import { User } from "@/lib/auth"
import { listBots } from "@/lib/api"
import ReportList from "@/components/dashboard/report-list"
import { redirect } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default async function ReportsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const teamIdParam = params.team as string | undefined;
    const filter = (params.filter as "all" | "message" | "invite" | "high" | undefined) ?? "all"
    if (!["all", "message", "invite", "high"].includes(filter)) {
        redirect(`/dashboard/reports?team=${teamIdParam}&filter=all`);
    }
    const cookieStore = await cookies()
    const session: User = JSON.parse(cookieStore.get("d4all_session")?.value || "{}")
    if (!session.token) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }
    const listData = await listBots(session.matrixId, session.token);

    if (!listData) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }

    const selectedBot = listData.bots.find((team) => team.id === teamIdParam) || listData.bots[0];

    // Filter reports based on selected team
    // TODO: Fetch from API
    const reports = mockReports

    return (
        <LayoutWrapper listData={listData} activeTab="reports" teamIdParam={teamIdParam}>
            <TabNavigation selectedBot={selectedBot} currentTab="reports" />
            <Card className="border-gray-800 bg-gray-950">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Active Reports</CardTitle>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-8 w-[120px] bg-gray-900 border border-gray-800 text-gray-400 rounded-md px-2 flex items-center justify-between cursor-pointer">
                                        <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="flex flex-col gap-1 bg-gray-900 border border-gray-800 rounded-md p-2 w-[150px]">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/reports?team=${selectedBot.id}&filter=all`}
                                            className={` block px-3 py-2 rounded-md text-sm ${filter === "all" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                                                }`}
                                        >
                                            All Reports
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/reports?team=${selectedBot.id}&filter=message`}
                                            className={`block px-3 py-2 rounded-md text-sm ${filter === "message" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                                                }`}
                                        >
                                            Messages
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/reports?team=${selectedBot.id}&filter=invite`}
                                            className={`block px-3 py-2 rounded-md text-sm ${filter === "invite" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                                                }`}
                                        >
                                            Invites
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={`/dashboard/reports?team=${selectedBot.id}&filter=high`}
                                            className={`block px-3 py-2 rounded-md text-sm ${filter === "high" ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800"
                                                }`}
                                        >
                                            High Priority
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <CardDescription className="text-gray-400">Reports requiring moderation action</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReportList reports={reports} filter={filter} />
                </CardContent>
            </Card>
        </LayoutWrapper >
    )
}
