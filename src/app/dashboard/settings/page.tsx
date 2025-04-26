"use client";

import { useEffect, useState } from "react"
import { UserPlus, Settings, Crown, Trash2, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { mockTeams } from "../mockData"
import AddProtectedRoom from "../../../components/modals/add-protected-room"
import ProtectedRomsList from "../../../components/dashboard/protected-rooms-list"
import TabNavigation from "../../../components/dashboard/tab-navigation"
import CreateBotModal from "../../../components/modals/create-bot";


export default function TeamManagement() {
    const searchParams = useSearchParams()
    const teamIdParam = searchParams.get("team")
    const [selectedTeam, setSelectedTeam] = useState(mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0])
    const [activeTab, setActiveTab] = useState("members")

    // Update selected team when URL param changes
    useEffect(() => {
        const team = mockTeams.find((t) => t.id === teamIdParam)
        if (team) {
            setSelectedTeam(team)
        }
    }, [teamIdParam])

    const handleTeamChange = (teamId: string) => {
        const team = mockTeams.find((t) => t.id === teamId)
        if (team) {
            setSelectedTeam(team)

            // Update URL with team parameter
            const url = new URL(window.location.href)
            url.searchParams.set("team", teamId)
            window.history.pushState({}, "", url.toString())
        }
    }

    return (
        <>
            <TabNavigation selectedTeam={selectedTeam} currentTab="settings" />
            <Card className="border-gray-800 bg-gray-950">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Team Management</CardTitle>
                            <CardDescription className="text-gray-400">Manage your bots and team members</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950">
                                    <Crown className="mr-2 h-4 w-4" />
                                    {selectedTeam.name}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                                <DropdownMenuLabel>Your Bots</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-800" />
                                {mockTeams.map((team) => (
                                    <DropdownMenuItem
                                        key={team.id}
                                        className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                                        onClick={() => handleTeamChange(team.id)}
                                    >
                                        {team.name}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className="bg-gray-800" />
                                <CreateBotModal />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList className="bg-gray-900">
                            <TabsTrigger value="members">Team Members</TabsTrigger>
                            <TabsTrigger value="rooms">Protected Rooms</TabsTrigger>
                            <TabsTrigger value="settings">Bot Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="members" className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-400">Team Members</h3>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Invite Member
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-950 border-gray-800">
                                        <DialogHeader>
                                            <DialogTitle>Invite Team Member</DialogTitle>
                                            <DialogDescription className="text-gray-400">
                                                Invite a Matrix user to join your moderation team
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="invite-matrix-id">Matrix ID</Label>
                                                <Input
                                                    id="invite-matrix-id"
                                                    placeholder="@user:matrix.org"
                                                    className="bg-gray-900 border-gray-800"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="invite-role">Role</Label>
                                                <select
                                                    id="invite-role"
                                                    className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm"
                                                >
                                                    <option value="moderator">Moderator</option>
                                                    <option value="viewer">Viewer (Read-only)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                            >
                                                Cancel
                                            </Button>
                                            <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                                Send Invitation
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <ScrollArea className="h-[300px] rounded-md border border-gray-800">
                                <div className="p-4 space-y-3">
                                    {selectedTeam.members.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between p-3 rounded-md bg-gray-900">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-gray-800">
                                                    <AvatarImage src={member.avatar || ""} />
                                                    <AvatarFallback className="bg-gray-800 text-gray-400">
                                                        {member.name.substring(1, 3).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            className={
                                                                member.role === "owner"
                                                                    ? "bg-purple-900/50 text-purple-300"
                                                                    : "bg-blue-900/50 text-blue-300"
                                                            }
                                                        >
                                                            {member.role}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            Joined {new Date(member.joined).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {member.role !== "owner" && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <Settings className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                                                        <DropdownMenuItem className="text-yellow-400 focus:text-yellow-400 focus:bg-yellow-900/20">
                                                            <Settings className="mr-2 h-4 w-4" />
                                                            Change Role
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-900/20">
                                                            <LogOut className="mr-2 h-4 w-4" />
                                                            Remove from Team
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="rooms" className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-400">Protected Rooms</h3>
                                <AddProtectedRoom filled />
                            </div>

                            <ScrollArea className="h-[300px] rounded-md border border-gray-800">
                                <ProtectedRomsList team={selectedTeam} />
                            </ScrollArea>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-4">
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
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}
