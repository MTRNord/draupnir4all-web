import { Button } from "@/components/ui/button";
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddProtectedRoomProps {
    filled?: boolean;
}

export default function AddProtectedRoom({ filled }: AddProtectedRoomProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {filled ? (
                    <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Room
                    </Button>
                ) : (
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-purple-400">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Room
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle>Add Protected Room</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Add a Matrix room to be monitored by this bot
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="room-id">Room ID or Alias</Label>
                        <Input
                            id="room-id"
                            placeholder="#roomname:matrix.org"
                            className="bg-gray-900 border-gray-800"
                        />
                        <p className="text-xs text-gray-400">
                            Enter a room ID or alias. The bot must be invited to this room.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogCloseButton
                        className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                    >
                        Cancel
                    </DialogCloseButton>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Add Room</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}