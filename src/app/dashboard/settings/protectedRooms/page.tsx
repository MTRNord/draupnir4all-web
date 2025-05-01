import { listBots } from "@/lib/api";
import { User } from "@/lib/auth";
import { cookies } from "next/headers";
import { mockTeams } from "../../mockData";
import SettingsLayout from "../settingsLayout";
import AddProtectedRoom from "@/components/modals/add-protected-room";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProtectedRomsList from "@/components/dashboard/protected-rooms-list";

export default async function ProtectedRoomsSettingsPage({
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
        <SettingsLayout currentTab={"rooms"} listData={listData} selectedTeam={selectedTeam} teamIdParam={teamIdParam}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-400">Protected Rooms</h3>
                <AddProtectedRoom filled />
            </div>

            <ScrollArea className="h-[300px] rounded-md border border-gray-800">
                <ProtectedRomsList team={selectedTeam} />
            </ScrollArea>
        </SettingsLayout>
    )
}