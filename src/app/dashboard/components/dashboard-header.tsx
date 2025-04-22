"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Bell, Menu, Ban, UserX, LogOut, Crown, ChevronDown, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface Notification {
    id: string
    type: string
    title: string
    message: string
    timestamp: string
    read: boolean
    teamId?: string
}

interface Team {
    id: string
    name: string
    description: string
}

interface DashboardHeaderProps {
    selectedTeam: Team
    onTeamChange: (teamId: string) => void
    activeTab: string
    setActiveTab: (tab: string) => void
    teams: Team[]
}

export function DashboardHeader({ selectedTeam, onTeamChange, activeTab, setActiveTab, teams }: DashboardHeaderProps) {
    const { logout } = useSession()
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
                            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-950">
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
                                    onClick={() => onTeamChange(team.id)}
                                >
                                    {team.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create New Bot
                                    </DropdownMenuItem>
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
                                        <div className="space-y-2">
                                            <Label htmlFor="bot-description">Description</Label>
                                            <Input
                                                id="bot-description"
                                                placeholder="Moderation for my community"
                                                className="bg-gray-900 border-gray-800"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                        >
                                            Cancel
                                        </Button>
                                        <Button className="bg-purple-600 text-white hover:bg-purple-700">Create Bot</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300"
                            >
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 border-gray-800">
                            <DialogHeader>
                                <DialogTitle>Ban User</DialogTitle>
                                <DialogDescription className="text-gray-400">Ban a user from your Matrix rooms</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user-id">Matrix User ID</Label>
                                    <Input id="user-id" placeholder="@user:matrix.org" className="bg-gray-900 border-gray-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ban-reason">Reason</Label>
                                    <Input id="ban-reason" placeholder="Reason for the ban" className="bg-gray-900 border-gray-800" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-red-600 text-white hover:bg-red-700">Ban User</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden md:flex border-orange-500 text-orange-400 hover:bg-orange-950 hover:text-orange-300"
                            >
                                <UserX className="mr-2 h-4 w-4" />
                                Kick User
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-950 border-gray-800">
                            <DialogHeader>
                                <DialogTitle>Kick User</DialogTitle>
                                <DialogDescription className="text-gray-400">Kick a user from a Matrix room</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="kick-user-id">Matrix User ID</Label>
                                    <Input id="kick-user-id" placeholder="@user:matrix.org" className="bg-gray-900 border-gray-800" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-orange-600 text-white hover:bg-orange-700">Kick User</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant="outline"
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
                                        <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800">
                                            <DropdownMenuLabel>Your Bots</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-gray-800" />
                                            {teams.map((team) => (
                                                <DropdownMenuItem
                                                    key={team.id}
                                                    className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                                                    onClick={() => onTeamChange(team.id)}
                                                >
                                                    {team.name}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <nav className="flex flex-col p-4 gap-2">
                                    <Button
                                        variant={activeTab === "overview" ? "secondary" : "ghost"}
                                        className="justify-start"
                                        onClick={() => setActiveTab("overview")}
                                    >
                                        Overview
                                    </Button>
                                    <Button
                                        variant={activeTab === "reports" ? "secondary" : "ghost"}
                                        className="justify-start"
                                        onClick={() => setActiveTab("reports")}
                                    >
                                        Reports
                                    </Button>
                                    <Button
                                        variant={activeTab === "bans" ? "secondary" : "ghost"}
                                        className="justify-start"
                                        onClick={() => setActiveTab("bans")}
                                    >
                                        Bans
                                    </Button>
                                    <Button
                                        variant={activeTab === "analytics" ? "secondary" : "ghost"}
                                        className="justify-start"
                                        onClick={() => setActiveTab("analytics")}
                                    >
                                        Analytics
                                    </Button>
                                    <Button
                                        variant={activeTab === "settings" ? "secondary" : "ghost"}
                                        className="justify-start"
                                        onClick={() => setActiveTab("settings")}
                                    >
                                        Settings
                                    </Button>

                                    <Separator className="my-2" />

                                    {/* Mobile Quick Actions */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300"
                                            >
                                                <Ban className="mr-2 h-4 w-4" />
                                                Ban User
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-gray-950 border-gray-800">
                                            {/* Same content as desktop dialog */}
                                        </DialogContent>
                                    </Dialog>

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
                                            {/* Same content as desktop dialog */}
                                        </DialogContent>
                                    </Dialog>
                                </nav>
                                <div className="mt-auto border-t border-gray-800 p-4">
                                    <Button
                                        variant="outline"
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
