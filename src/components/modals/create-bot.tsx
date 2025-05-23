import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogCloseButton } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";

export default function CreateBotModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Create New Bot
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle>Create New Bot</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Set up a new Draupnir bot for a different community
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="bot-name">Bot Name</Label>
                        <Input id="bot-name" placeholder="My Community Bot" className="bg-gray-900 border-gray-800" />
                    </div>

                </div>
                <DialogFooter>
                    <DialogCloseButton
                        className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                    >
                        Cancel
                    </DialogCloseButton>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Create Bot</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}