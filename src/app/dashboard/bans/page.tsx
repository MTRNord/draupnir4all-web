"use client";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Ban, PenOff, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EBanTypes, mockPolicyLists, mockTeams, } from "../mockData";
import AddBan from "../../../components/modals/add-ban";
import { useSearchParams } from "next/navigation";
import TabNavigation from "../../../components/dashboard/tab-navigation";
import LayoutWrapper from "@/components/dashboard/layoutWrapper";


export default function Bans() {
    const searchParams = useSearchParams()
    const teamIdParam = searchParams.get("team") || undefined
    const [selectedTeam, setSelectedTeam] = useState(mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0])
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Update selected team when URL param changes
    useEffect(() => {
        const team = mockTeams.find((t) => t.id === teamIdParam)
        if (team) {
            setSelectedTeam(team)
        }
    }, [teamIdParam])

    // Filter policy lists based on selected team
    const policyLists = mockPolicyLists.filter((list) => list.teamId === selectedTeam.id)

    const [selectedPolicyList, setSelectedPolicyList] = useState("global")
    const [filter, setFilter] = useState("all")
    const selectedList = policyLists.find((list) => list.id === selectedPolicyList) || policyLists[0] || { entries: [] }
    const entries = selectedList.entries.filter((entry) => {
        if (filter === "all") return true;
        if (filter === "users") return entry.type === EBanTypes.User;
        if (filter === "servers") return entry.type === EBanTypes.Server;
        if (filter === "rooms") return entry.type === EBanTypes.Room;
        return false;
    }).filter((entry) => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return entry.target.toLowerCase().includes(searchLower) || entry.reason.toLowerCase().includes(searchLower);
    });

    return (
        <LayoutWrapper activeTab="bans" teamIdParam={teamIdParam}>
            <TabNavigation selectedTeam={selectedTeam} currentTab="bans" />

            <Card className="border-gray-800 bg-gray-950">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Policy Lists</CardTitle>
                        <AddBan policyLists={policyLists} filled />
                    </div>
                    <CardDescription className="text-gray-400">Manage ban lists across your Matrix rooms</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400">Policy Lists</h3>
                            <div className="space-y-2">
                                {policyLists.length > 0 ? (
                                    policyLists.map((list) => (
                                        <div
                                            key={list.id}
                                            className={`p-3 rounded-md border cursor-pointer transition-colors ${selectedPolicyList === list.id
                                                ? "bg-gray-800 border-purple-600"
                                                : "bg-gray-900 border-gray-800 hover:border-gray-700"
                                                }`}
                                            onClick={() => setSelectedPolicyList(list.id)}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium">{list.name}</span>
                                                {list.readOnly ? (
                                                    <PenOff className=" text-gray-400">Read Only</PenOff>
                                                ) : (
                                                    <Pen className="text-green-300">Editable</Pen>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400">{list.description}</p>
                                            <p className="text-xs text-gray-500 mt-1">{list.entries.length} entries</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center p-8 text-center">
                                        <Ban className="h-8 w-8 text-gray-500 mb-2" />
                                        <p className="text-gray-400">No policy lists available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-400">
                                    {selectedList.name || "Policy List"} Entries
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Input onChange={(e: ChangeEvent) => {
                                        const value = (e.target as HTMLInputElement).value;
                                        setSearchTerm(value)
                                    }} value={searchTerm} placeholder="Search entries..." className="h-8 w-[200px] bg-gray-900 border-gray-800" />
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="all" onValueChange={setFilter}>
                                            <SelectTrigger className="h-8 w-[120px] bg-gray-900 border-gray-800">
                                                <SelectValue placeholder="Filter" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-900 border-gray-800">
                                                <SelectItem value="all">All Bans</SelectItem>
                                                <SelectItem value="users">Users</SelectItem>
                                                <SelectItem value="servers">Servers</SelectItem>
                                                <SelectItem value="rooms">Rooms</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="h-[400px] rounded-md border border-gray-800">
                                <div className="p-4 space-y-3">
                                    {selectedList && entries && entries.length > 0 ? (
                                        entries.map((entry) => (
                                            <div key={entry.id} className="p-3 rounded-md bg-gray-900 border border-gray-800">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium">{entry.target}</p>
                                                        <p className="text-sm text-gray-400 mt-1">{entry.reason}</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(entry.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {!selectedList.readOnly && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
                                                        >
                                                            <Ban className="h-4 w-4" />
                                                            <span className="sr-only">Remove</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                            <Ban className="h-8 w-8 text-gray-500 mb-2" />
                                            <p className="text-gray-400">No ban entries found</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </LayoutWrapper>
    )
}