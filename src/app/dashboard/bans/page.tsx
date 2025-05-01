import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPolicyLists, } from "../mockData";
import AddBan from "../../../components/modals/add-ban";
import TabNavigation from "../../../components/dashboard/tab-navigation";
import LayoutWrapper from "@/components/dashboard/layoutWrapper";
import { cookies } from "next/headers";
import { User } from "@/lib/auth";
import { listBots } from "@/lib/api";
import BansList from "@/components/dashboard/bans-list";


export default async function Bans({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const teamIdParam = params.team as string | undefined;

    const cookieStore = await cookies()
    const session: User = JSON.parse(cookieStore.get("session")?.value || "{}")
    if (!session.token) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }
    const listData = await listBots(session.matrixId, session.token);

    if (!listData) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    }

    const selectedBot = listData.bots.find((team) => team.id === teamIdParam) || listData.bots[0];


    // Filter policy lists based on selected team
    // TODO: Fetch from API
    const policyLists = mockPolicyLists
    return (
        <LayoutWrapper listData={listData} activeTab="bans" teamIdParam={teamIdParam}>
            <TabNavigation selectedBot={selectedBot} currentTab="bans" />

            <Card className="border-gray-800 bg-gray-950">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Policy Lists</CardTitle>
                        <AddBan policyLists={policyLists} filled />
                    </div>
                    <CardDescription className="text-gray-400">Manage ban lists across your Matrix rooms</CardDescription>
                </CardHeader>
                <CardContent>
                    <BansList policyLists={policyLists} />
                </CardContent>
            </Card>
        </LayoutWrapper>
    )
}