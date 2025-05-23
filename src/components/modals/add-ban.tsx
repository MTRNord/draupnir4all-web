import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ban, Plus } from "lucide-react";
import { PolicyList } from "../../app/dashboard/mockData";

interface AddBanProps {
    policyLists: PolicyList[];
    filled?: boolean;
    header?: boolean;
    buttonClasses?: string;
}

export default function AddBan({ filled, policyLists, header, buttonClasses }: AddBanProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {header ? (
                    <Button
                        variant="outline"
                        size="sm"
                        className={`${buttonClasses} border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300`}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        Add Ban
                    </Button>
                ) : (
                    filled ? (
                        <Button size="sm" className={`${buttonClasses} bg-purple-600 text-white hover:bg-purple-700`}>
                            <Ban className="mr-2 h-4 w-4" />
                            Add Ban
                        </Button>
                    ) : (
                        <Button variant="ghost" size="sm" className={`${buttonClasses} h-7 px-2 text-xs text-purple-400`}>
                            <Plus className="h-3 w-3 mr-1" />
                            Add Ban
                        </Button>
                    )
                )}

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
                    <DialogCloseButton
                        className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                    >
                        Cancel
                    </DialogCloseButton>
                    <Button className="bg-red-600 text-white hover:bg-red-700">Add Ban</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}