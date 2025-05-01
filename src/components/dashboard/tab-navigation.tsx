import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DraupnirBot } from "@/lib/api";
import Link from "next/link";

interface TabNavigationProps {
    selectedBot: DraupnirBot;
    currentTab: string;
}

export default function TabNavigation({ selectedBot, currentTab }: TabNavigationProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{selectedBot.displayName} Dashboard</h1>
            <Tabs activationMode="manual" defaultValue={currentTab} className="hidden md:block">
                <TabsList className="bg-gray-900">
                    <TabsTrigger value="overview" asChild>
                        <Link href={`/dashboard/overview?team=${selectedBot.id}`}>Overview</Link>
                    </TabsTrigger>
                    <TabsTrigger value="reports" asChild>
                        <Link href={`/dashboard/reports?team=${selectedBot.id}`}>Reports</Link>
                    </TabsTrigger>
                    <TabsTrigger value="bans" asChild>
                        <Link href={`/dashboard/bans?team=${selectedBot.id}`}>Bans</Link>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" asChild>
                        <Link href={`/dashboard/analytics?team=${selectedBot.id}`}>Analytics</Link>
                    </TabsTrigger>
                    <TabsTrigger value="settings" asChild>
                        <Link href={`/dashboard/settings?team=${selectedBot.id}`}>Settings</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}