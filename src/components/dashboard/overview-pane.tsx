import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { Plus, Ban, AlertTriangle, CheckCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Team } from "@/app/dashboard/team-management";
import AddProtectedRoom from "./modals/add-protected-room";

interface OverviewProps {
    selectedTeam: Team;
    reports: any[];
    policyLists: any[];
}

export default function Overview({ selectedTeam, reports, policyLists }: OverviewProps) {

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Protected Rooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{selectedTeam.rooms.length}</div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-400">Monitored by this bot</p>
                            <AddProtectedRoom />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{reports.length}</div>
                        <p className="text-xs text-gray-400">
                            {reports.filter((r) => r.priority === "high").length} high priority
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Bans Issued</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {policyLists.reduce((total, list) => total + list.entries.length, 0)}
                        </div>
                        <p className="text-xs text-gray-400">Across all policy lists</p>
                    </CardContent>
                </Card>
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Bot Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <div className="text-sm font-medium">Online</div>
                        </div>
                        <p className="text-xs text-gray-400">Last restart: 7d ago</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription className="text-gray-400">Latest moderation actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-red-500/20 p-2">
                                    <Ban className="h-4 w-4 text-red-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">User banned</p>
                                    <p className="text-xs text-gray-400">@spammer:matrix.org was banned from all rooms</p>
                                    <p className="text-xs text-gray-500">10 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-yellow-500/20 p-2">
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Report created</p>
                                    <p className="text-xs text-gray-400">Spam detected in #support</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-green-500/20 p-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Report resolved</p>
                                    <p className="text-xs text-gray-400">Harassment report in #community resolved</p>
                                    <p className="text-xs text-gray-500">3 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-950">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Protected Rooms</CardTitle>
                                <CardDescription className="text-gray-400">Rooms monitored by this bot</CardDescription>
                            </div>
                            <AddProtectedRoom filled />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {selectedTeam.rooms.map((room, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <p className="text-sm">{room}</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-400">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );

}