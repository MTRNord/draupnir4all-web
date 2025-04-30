import { Suspense } from "react"
import Link from "next/link"
import { Shield, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import AddBan from "../modals/add-ban"
import KickUserModal from "../modals/kick-user"
import { mockPolicyLists } from "../../app/dashboard/mockData"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import BotSelector from "./bot-selector"
import Logout from "./logout"
import Notifications from "./notifications"
import { ListResponse } from "@/lib/api"

interface DashboardHeaderProps {
    activeTab: "overview" | "reports" | "bans" | "analytics" | "settings"
    teamIdParam?: string
    listData: ListResponse | undefined
}

export function DashboardHeader({ activeTab, teamIdParam, listData }: DashboardHeaderProps) {
    const policyLists = mockPolicyLists.filter((list) => list.teamId === teamIdParam)

    return (
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold tracking-tighter">Draupnir4All</span>
                    </Link>

                    {/* Global Team Selector */}
                    <Suspense>
                        <BotSelector listData={listData} selectedTeam={teamIdParam} />
                    </Suspense>
                </div>

                <div className="flex items-center gap-4">
                    <Notifications teamIdParam={teamIdParam} />

                    {/* Quick Action Buttons */}
                    <AddBan header policyLists={policyLists} />

                    <KickUserModal />

                    <Logout />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-gray-950 border-gray-800 p-0">
                            <VisuallyHidden asChild>
                                <SheetTitle>Navigaion</SheetTitle>
                            </VisuallyHidden>
                            <div className="flex flex-col h-full">
                                <div className="border-b border-gray-800 p-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-purple-400" />
                                        <span className="font-medium">Draupnir4All</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <BotSelector listData={listData} selectedTeam={teamIdParam} />
                                </div>
                                <nav className="flex flex-col p-4 gap-2">
                                    <Link href="/dashboard/overview">
                                        <Button
                                            variant={activeTab === "overview" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Overview
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/reports">
                                        <Button
                                            variant={activeTab === "reports" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Reports
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/bans">
                                        <Button
                                            variant={activeTab === "bans" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Bans
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/analytics">
                                        <Button
                                            variant={activeTab === "analytics" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Analytics
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/settings">
                                        <Button
                                            variant={activeTab === "settings" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Settings
                                        </Button>
                                    </Link>

                                    <Separator className="my-2" />

                                    {/* Mobile Quick Actions */}
                                    <AddBan header policyLists={policyLists} />

                                    <KickUserModal />
                                </nav>
                                <div className="mt-auto border-t border-gray-800 p-4">
                                    <Logout />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
