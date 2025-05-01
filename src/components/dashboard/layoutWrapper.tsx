import { Suspense } from "react";
import { DashboardHeader } from "./dashboard-header";
import { ListResponse } from "@/lib/api";

interface LayoutWrapperProps {
    children: React.ReactNode;
    activeTab: "overview" | "reports" | "bans" | "analytics" | "settings";
    teamIdParam?: string;
    listData: ListResponse | undefined;
}

export default function LayoutWrapper({ children, activeTab, teamIdParam, listData }: LayoutWrapperProps) {
    // Get first team id if there is no teamIdParam
    const teamId = teamIdParam || listData?.bots[0]?.id;

    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Suspense
                fallback={
                    <div className="flex h-16 items-center justify-between border-b border-gray-800 bg-black/80 backdrop-blur-sm">
                        Loading...
                    </div>
                }
            >
                <DashboardHeader listData={listData} activeTab={activeTab} teamIdParam={teamId} />
            </Suspense>
            <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
                <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading...</div>}>
                    {children}
                </Suspense>
            </main>
        </div>
    )
}