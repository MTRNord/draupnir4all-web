import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Team } from "../../app/dashboard/mockData";

interface TabNavigationProps {
    selectedTeam: Team;
    currentTab: string;
}

export default function TabNavigation({ selectedTeam, currentTab }: TabNavigationProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{selectedTeam.name} Dashboard</h1>
            <Tabs activationMode="manual" defaultValue={currentTab} className="hidden md:block">
                <TabsList className="bg-gray-900">
                    <TabsTrigger value="overview" asChild>
                        <Link href={`/dashboard/overview?team=${selectedTeam.id}`}>Overview</Link>
                    </TabsTrigger>
                    <TabsTrigger value="reports" asChild>
                        <Link href={`/dashboard/reports?team=${selectedTeam.id}`}>Reports</Link>
                    </TabsTrigger>
                    <TabsTrigger value="bans" asChild>
                        <Link href={`/dashboard/bans?team=${selectedTeam.id}`}>Bans</Link>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" asChild>
                        <Link href={`/dashboard/analytics?team=${selectedTeam.id}`}>Analytics</Link>
                    </TabsTrigger>
                    <TabsTrigger value="settings" asChild>
                        <Link href={`/dashboard/settings?team=${selectedTeam.id}`}>Settings</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}