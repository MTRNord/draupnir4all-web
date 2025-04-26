import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserX } from "lucide-react";

export default function KickUserModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-orange-500 text-orange-400 hover:bg-orange-950 hover:text-orange-300"
                >
                    <UserX className="mr-2 h-4 w-4" />
                    Kick User
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle>Kick a User</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Remove a user from your Matrix rooms using a kick instead of a ban. This will not prevent them from rejoining the room.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}