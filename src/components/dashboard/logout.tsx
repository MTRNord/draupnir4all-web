"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "@/contexts/session-context";

export default function Logout() {
    const { logout } = useSession()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
            onClick={handleLogout}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
        </Button>
    )
}