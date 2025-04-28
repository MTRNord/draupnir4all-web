"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Shield, Bell, Menu, Ban, LogOut, Crown, ChevronDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSession } from "@/contexts/session-context"
import AddBan from "../modals/add-ban"
import KickUserModal from "../modals/kick-user"
import CreateBotModal from "../modals/create-bot"
import { mockPolicyLists, Team } from "../../app/dashboard/mockData"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Notification {
    id: string
    type: string
    title: string
    message: string
    timestamp: string
    read: boolean
    teamId?: string
}

interface DashboardHeaderProps {
    teams: Team[]
}

export function DashboardHeader({ teams }: DashboardHeaderProps) {
    const { logout } = useSession()
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get team ID from query params or use default
    const teamIdParam = searchParams.get("team")
    const [selectedTeam, setSelectedTeam] = useState<Team>(teams.find((t) => t.id === teamIdParam) || teams[0])

    const policyLists = mockPolicyLists.filter((list) => list.teamId === selectedTeam.id)

    // Determine active tab from the URL
    const getActiveTabFromPath = (path: string) => {
        if (path.includes("/dashboard/reports")) return "reports"
        if (path.includes("/dashboard/bans")) return "bans"
        if (path.includes("/dashboard/analytics")) return "analytics"
        if (path.includes("/dashboard/settings")) return "settings"
        return "overview"
    }

    const activeTab = getActiveTabFromPath(pathname)

    // Update selected team when URL param changes
    useEffect(() => {
        const team = teams.find((t) => t.id === teamIdParam)
        if (team) {
            setSelectedTeam(team)
        }
    }, [teamIdParam, teams])

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "notif1",
            type: "report",
            title: "New report",
            message: "A new message has been reported in #general",
            timestamp: "2025-04-21T15:30:00Z",
            read: false,
            teamId: "team1",
        },
        {
            id: "notif2",
            type: "ban",
            title: "User banned",
            message: "@spammer:matrix.org has been banned by @mod1:matrix.org",
            timestamp: "2025-04-21T14:45:00Z",
            read: false,
            teamId: "team1",
        },
        {
            id: "notif3",
            type: "invite",
            title: "Team invitation",
            message: "You've been invited to join the Support Team Bot",
            timestamp: "2025-04-21T12:15:00Z",
            read: true,
            teamId: "team2",
        },
    ])

    const teamNotifications = notifications.filter((n) => n.teamId === selectedTeam.id || !n.teamId)
    const unreadCount = teamNotifications.filter((n) => !n.read).length

    const markNotificationAsRead = (id: string) => {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    }

    const clearAllNotifications = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id))
    }

    const handleLogout = async () => {
        await logout()
    }

    const handleTeamChange = (teamId: string) => {
        const team = teams.find((t) => t.id === teamId)
        if (team) {
            setSelectedTeam(team)

            // Update URL with team parameter
            const params = new URLSearchParams(searchParams)
            params.set("team", teamId)
            router.push(`${pathname}?${params.toString()}`)
        }
    }

    return (
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-purple-400" />
                        <span className="text-xl font-bold tracking-tighter">Draupnir4All</span>
                    </Link>

                    {/* Global Team Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-950">
                                <Crown className="mr-2 h-4 w-4" />
                                {selectedTeam.name}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                            <DropdownMenuLabel>Your Bots</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            {teams.map((team) => (
                                <DropdownMenuItem
                                    key={team.id}
                                    className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                                    onClick={() => handleTeamChange(team.id)}
                                >
                                    {team.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <CreateBotModal />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 bg-gray-900 border-gray-800">
                            <div className="flex items-center justify-between border-b border-gray-800 p-3">
                                <h3 className="font-medium">Notifications</h3>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 px-2 text-xs text-gray-400 hover:text-white"
                                        onClick={clearAllNotifications}
                                    >
                                        Clear all
                                    </Button>
                                </div>
                            </div>
                            <ScrollArea className="h-[300px]">
                                {teamNotifications.length > 0 ? (
                                    <div className="space-y-1 p-1">
                                        {teamNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`flex items-start p-3 rounded-md ${notification.read ? "bg-gray-900" : "bg-gray-800"}`}
                                                onClick={() => markNotificationAsRead(notification.id)}
                                            >
                                                <div
                                                    className={`rounded-full p-1.5 mr-3 ${notification.type === "report"
                                                        ? "bg-yellow-500/20"
                                                        : notification.type === "ban"
                                                            ? "bg-red-500/20"
                                                            : "bg-blue-500/20"
                                                        }`}
                                                >
                                                    {notification.type === "report" ? (
                                                        <Bell className="h-3.5 w-3.5 text-yellow-500" />
                                                    ) : notification.type === "ban" ? (
                                                        <Ban className="h-3.5 w-3.5 text-red-500" />
                                                    ) : (
                                                        <Plus className="h-3.5 w-3.5 text-blue-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium">{notification.title}</p>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-300"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteNotification(notification.id)
                                                            }}
                                                        >
                                                            <X className="h-3 w-3" />
                                                            <span className="sr-only">Dismiss</span>
                                                        </Button>
                                                    </div>
                                                    <p className="text-xs text-gray-400 line-clamp-2">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(notification.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                                        <Bell className="h-8 w-8 text-gray-600 mb-2" />
                                        <p className="text-gray-400">No notifications</p>
                                    </div>
                                )}
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    {/* Quick Action Buttons */}
                    <AddBan header policyLists={policyLists} />

                    <KickUserModal />

                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-gray-950 border-gray-800 p-0">
                            <VisuallyHidden asChild>
                                <SheetTitle>Navigaion</SheetTitle>
                            </VisuallyHidden>
                            <div className="flex flex-col h-full">
                                <div className="border-b border-gray-800 p-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-purple-400" />
                                        <span className="font-medium">Draupnir4All</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full border-purple-500 text-purple-400 hover:bg-purple-950"
                                            >
                                                <Crown className="mr-2 h-4 w-4" />
                                                {selectedTeam.name}
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-gray-900 border-gray-800">
                                            <DropdownMenuLabel>Your Bots</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-gray-800" />
                                            {teams.map((team) => (
                                                <DropdownMenuItem
                                                    key={team.id}
                                                    className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                                                    onClick={() => handleTeamChange(team.id)}
                                                >
                                                    {team.name}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <nav className="flex flex-col p-4 gap-2">
                                    <Link href="/dashboard/overview">
                                        <Button
                                            variant={activeTab === "overview" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Overview
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/reports">
                                        <Button
                                            variant={activeTab === "reports" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Reports
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/bans">
                                        <Button
                                            variant={activeTab === "bans" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Bans
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/analytics">
                                        <Button
                                            variant={activeTab === "analytics" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Analytics
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/settings">
                                        <Button
                                            variant={activeTab === "settings" ? "secondary" : "ghost"}
                                            className="justify-start w-full"
                                        >
                                            Settings
                                        </Button>
                                    </Link>

                                    <Separator className="my-2" />

                                    {/* Mobile Quick Actions */}
                                    <AddBan header policyLists={policyLists} />

                                    <KickUserModal />
                                </nav>
                                <div className="mt-auto border-t border-gray-800 p-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log Out
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
