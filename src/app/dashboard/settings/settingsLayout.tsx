import LayoutWrapper from "@/components/dashboard/layoutWrapper"
import TabNavigation from "@/components/dashboard/tab-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListResponse } from "@/lib/api";
import { Team } from "../mockData";
import Link from "next/link";

export default function SettingsLayout({
    children,
    currentTab,
    listData,
    teamIdParam,
    selectedTeam,
}: {
    children: React.ReactNode;
    currentTab: string;
    listData?: ListResponse;
    teamIdParam?: string;
    selectedTeam: Team;
}) {
    return (
        <LayoutWrapper listData={listData} activeTab="settings" teamIdParam={teamIdParam}>
            <TabNavigation selectedTeam={selectedTeam} currentTab="settings" />
            <Card className="border-gray-800 bg-gray-950">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Management</CardTitle>
                            <CardDescription className="text-gray-400">Manage your bots and team members</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Tabs defaultValue={currentTab} className="space-y-4">
                        <TabsList className="bg-gray-900">
                            <TabsTrigger value="members" asChild>
                                <Link href={`/dashboard/settings/members?team=${selectedTeam.id}`}>Team Members</Link>
                            </TabsTrigger>
                            <TabsTrigger value="rooms" asChild>
                                <Link href={`/dashboard/settings/protectedRooms?team=${selectedTeam.id}`}>Protected Rooms</Link>
                            </TabsTrigger>
                            <TabsTrigger value="settings" asChild>
                                <Link href={`/dashboard/settings/bot?team=${selectedTeam.id}`}>Bot Settings</Link>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {children}
                </CardContent>
            </Card>
        </LayoutWrapper>
    )
}