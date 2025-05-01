import { listBots } from "@/lib/api";
import { User } from "@/lib/auth";
import { cookies } from "next/headers";
import { mockTeams } from "../../mockData";
import SettingsLayout from "../settingsLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default async function BotSettingsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const teamIdParam = (await searchParams).team as string | undefined;
    const cookieStore = await cookies()
    const session: User = JSON.parse(cookieStore.get("session")?.value || "{}")
    if (!session.token) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }
    const listData = await listBots(session.matrixId, session.token);
    const selectedTeam = mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0];

    return (
        <SettingsLayout currentTab={"settings"} listData={listData} selectedTeam={selectedTeam} teamIdParam={teamIdParam}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input id="bot-name" defaultValue={selectedTeam.name} className="bg-gray-900 border-gray-800" />
                </div>
                <div className="pt-4 flex justify-between">
                    <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Bot
                    </Button>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Save Changes</Button>
                </div>
            </div>
        </SettingsLayout>
    )
}