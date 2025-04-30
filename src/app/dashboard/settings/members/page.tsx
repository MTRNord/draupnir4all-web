import { listBots } from "@/lib/api";
import { User } from "@/lib/auth";
import { cookies } from "next/headers";
import SettingsLayout from "../settingsLayout";
import { mockTeams } from "../../mockData";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, UserPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default async function MembersSettingsPage({
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
    const listData = await listBots(session.token);
    const selectedTeam = mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0];

    return (
        <SettingsLayout currentTab={"members"} listData={listData} selectedTeam={selectedTeam} teamIdParam={teamIdParam}>
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
        </SettingsLayout>
    )
}