"use client";

import { Ban, Bell, Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useState } from "react";

interface Notification {
    id: string
    type: string
    title: string
    message: string
    timestamp: string
    read: boolean
    teamId?: string
}

export default function Notifications({ teamIdParam }: { teamIdParam?: string }) {
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

    const teamNotifications = notifications.filter((n) => n.teamId === teamIdParam || !n.teamId)
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

    return (
        <>
            {/* Notifications */}
            < Popover >
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
            </Popover >
        </>
    )
}