"use client";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ban, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { PolicyList } from "../page";

interface BansProps {
    policyLists: PolicyList[];
}

export default function Bans({ policyLists }: BansProps) {
    const [selectedPolicyList, setSelectedPolicyList] = useState("global")
    const selectedList = policyLists.find((list) => list.id === selectedPolicyList) || policyLists[0] || { entries: [] }

    return (
        <Card className="border-gray-800 bg-gray-950">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>Policy Lists</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                                <Ban className="mr-2 h-4 w-4" />
                                Add Ban
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 border-gray-800">
                            <DialogHeader>
                                <DialogTitle>Add New Ban</DialogTitle>
                                <DialogDescription className="text-gray-400">
                                    Ban a user or server from your Matrix rooms
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ban-type">Ban Type</Label>
                                    <Select defaultValue="user">
                                        <SelectTrigger className="bg-gray-900 border-gray-800">
                                            <SelectValue placeholder="Select ban type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-800">
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="server">Server</SelectItem>
                                            <SelectItem value="room">Room</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ban-target">Target</Label>
                                    <Input
                                        id="ban-target"
                                        placeholder="@user:matrix.org"
                                        className="bg-gray-900 border-gray-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ban-reason">Reason</Label>
                                    <Textarea
                                        id="ban-reason"
                                        placeholder="Reason for the ban"
                                        className="bg-gray-900 border-gray-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Policy Lists</Label>
                                    <div className="space-y-2 mt-1">
                                        {policyLists
                                            .filter((list) => !list.readOnly)
                                            .map((list) => (
                                                <div key={list.id} className="flex items-center space-x-2">
                                                    <Checkbox id={`list-${list.id}`} />
                                                    <Label htmlFor={`list-${list.id}`} className="font-normal">
                                                        {list.name}
                                                    </Label>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-400">
                                        Bans are applied to all protected rooms monitored by this bot.
                                    </p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-red-600 text-white hover:bg-red-700">Add Ban</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                                                <Badge className="bg-gray-800 text-gray-400">Read Only</Badge>
                                            ) : (
                                                <Badge className="bg-green-900/50 text-green-300">Editable</Badge>
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
                                <Input placeholder="Search entries..." className="h-8 w-[200px] bg-gray-900 border-gray-800" />
                                {selectedList && !selectedList.readOnly && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                                                Add Entry
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-gray-950 border-gray-800">
                                            {/* Add entry dialog content */}
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </div>

                        <ScrollArea className="h-[400px] rounded-md border border-gray-800">
                            <div className="p-4 space-y-3">
                                {selectedList && selectedList.entries && selectedList.entries.length > 0 ? (
                                    selectedList.entries.map((entry) => (
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
    );
}