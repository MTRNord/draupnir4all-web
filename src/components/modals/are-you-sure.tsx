import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface AreYouSureDialogProps {
    description: string;
    titlePart: string
}

export default function AreYouSureDialog({ description, titlePart }: AreYouSureDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-950 border-gray-800">
                <DialogHeader>
                    <DialogTitle>Remove {titlePart}</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button className="bg-red-600 text-white hover:bg-red-700">Remove {titlePart}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}