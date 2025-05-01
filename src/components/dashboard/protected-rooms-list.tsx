import { DraupnirBot } from "@/lib/api";
import AreYouSureDialog from "../modals/are-you-sure";

interface ProtectedRomsListProps {
    selectedBot: DraupnirBot;
}

export default function ProtectedRomsList({ selectedBot }: ProtectedRomsListProps) {
    return (
        <div className="p-4 space-y-3">
            {selectedBot.protectedRooms.map((room, index) => (
                <div key={index} className="flex items-center justify-between p-3 px-4 rounded-md bg-gray-900">
                    <div>
                        <p>{room.displayName ?? room.room}</p>
                        {room.displayName && <p className="text-xs text-gray-400">{room.room}</p>}
                    </div>
                    <AreYouSureDialog titlePart="Protected Room" description="Are you sure you want to unprotect the room?" />
                </div>
            ))}
        </div>
    )
}