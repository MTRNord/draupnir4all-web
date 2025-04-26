import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Team } from "../mockData";

interface ProtectedRomsListProps {
    team: Team;
}

export default function ProtectedRomsList({ team }: ProtectedRomsListProps) {
    return (
        <div className="p-4 space-y-3">
            {team.rooms.map((room, index) => (
                <div key={index} className="flex items-center justify-between p-3 px-4 rounded-md bg-gray-900">
                    <div>
                        <p>{room}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                    </Button>
                </div>
            ))}
        </div>
    )
}