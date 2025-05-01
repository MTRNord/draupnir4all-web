import { ChevronDown, Crown } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import CreateBotModal from "../modals/create-bot";
import Link from "next/link";
import { ListResponse } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

export default function BotSelector({
    selectedTeam,
    listData
}: {
    selectedTeam?: string;
    listData: ListResponse | undefined;
}) {
    if (!listData) {
        return <Skeleton className="h-10 w-64" />;
    }

    const bots = listData.bots;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-950">
                    <Crown className="mr-2 h-4 w-4" />
                    {bots.find((bot) => bot.id === selectedTeam)?.displayName || "Select a Bot"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                <DropdownMenuLabel>Your Bots</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                {bots.map((bot) => (
                    <Link key={bot.id} href={{
                        query: { team: bot.id },
                    }}>
                        <DropdownMenuItem
                            className={selectedTeam === bot.id ? "bg-gray-800" : ""}
                        >
                            {bot.displayName}
                        </DropdownMenuItem>
                    </Link>
                ))}
                <DropdownMenuSeparator className="bg-gray-800" />
                <CreateBotModal />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}