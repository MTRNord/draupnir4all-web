'use client';

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Ban,
  LogOut,
  Bell,
  Menu,
  UserX,
  MessageSquare,
  UserPlus,
  Filter,
  Crown,
  X,
  Plus,
  Home,
  ChevronDown,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BlurredText } from "@/components/blurred-text"
import { BlurredImage } from "@/components/blurred-image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { mockTeams, TeamManagement } from "./team-management"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Overview from "@/components/dashboard/overview-pane";
import Reports from "@/components/dashboard/reports-pane";
import Bans from "@/components/dashboard/bans-pane";

// Mock notifications
const mockNotifications = [
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
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [selectedPolicyList, setSelectedPolicyList] = useState("global")
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0])
  const [notifications, setNotifications] = useState(mockNotifications)

  // Mock data for reports - now filtered by team
  const reports = [
    {
      id: "rep_1",
      type: "message",
      status: "open",
      priority: "high",
      timestamp: "2025-04-21T14:32:00Z",
      reporter: "@moderator:matrix.org",
      room: "#general:matrix.org",
      teamId: "team1",
      subject: {
        type: "message",
        id: "$1234567890abcdefghij:matrix.org",
        sender: "@spammer:badserver.org",
        content: {
          msgtype: "m.text",
          body: "Hey everyone! Check out this amazing investment opportunity at scam-crypto-site.com - 1000% returns guaranteed!",
        },
        timestamp: "2025-04-21T14:30:00Z",
      },
      reason: "Spam/scam content",
    },
    {
      id: "rep_2",
      type: "invite",
      status: "open",
      priority: "medium",
      timestamp: "2025-04-21T13:15:00Z",
      reporter: "@user:matrix.org",
      room: "#general:matrix.org",
      teamId: "team1",
      subject: {
        type: "invite",
        sender: "@spambot:badserver.org",
        target: "@user:matrix.org",
        timestamp: "2025-04-21T13:10:00Z",
      },
      reason: "Unsolicited invite from unknown user",
    },
    {
      id: "rep_3",
      type: "message",
      status: "open",
      priority: "high",
      timestamp: "2025-04-21T12:05:00Z",
      reporter: "@admin:matrix.org",
      room: "#support:matrix.org",
      teamId: "team1",
      subject: {
        type: "message",
        id: "$abcdefghij1234567890:matrix.org",
        sender: "@troll:badserver.org",
        content: {
          msgtype: "m.image",
          body: "image.jpg",
          url: "mxc://matrix.org/abcdefghijklmnopqrstuvwxyz",
          info: {
            mimetype: "image/jpeg",
            w: 800,
            h: 600,
            size: 95431,
          },
        },
        timestamp: "2025-04-21T12:00:00Z",
      },
      reason: "Inappropriate image",
    },
    {
      id: "rep_4",
      type: "message",
      status: "open",
      priority: "medium",
      timestamp: "2025-04-21T11:45:00Z",
      reporter: "@dev1:matrix.org",
      room: "#development:matrix.org",
      teamId: "team2",
      subject: {
        type: "message",
        id: "$devmessage123456789:matrix.org",
        sender: "@newuser:matrix.org",
        content: {
          msgtype: "m.text",
          body: "Can someone help me with this code? It's not working: <script>alert('hack');</script>",
        },
        timestamp: "2025-04-21T11:40:00Z",
      },
      reason: "Potential code injection attempt",
    },
  ].filter((report) => report.teamId === selectedTeam.id)

  // Mock data for policy lists - now filtered by team
  const policyLists = [
    {
      id: "global",
      name: "Global Ban List",
      description: "Shared ban list for all Matrix communities",
      readOnly: true,
      teamId: "team1",
      entries: [
        {
          id: "ban_1",
          target: "@spammer:badserver.org",
          reason: "Spam across multiple rooms",
          timestamp: "2025-04-20T10:30:00Z",
        },
        {
          id: "ban_2",
          target: "@troll:badserver.org",
          reason: "Harassment and inappropriate content",
          timestamp: "2025-04-19T15:45:00Z",
        },
        { id: "ban_3", target: "@phisher:scam.org", reason: "Phishing attempts", timestamp: "2025-04-18T09:20:00Z" },
      ],
    },
    {
      id: "community",
      name: "Community Ban List",
      description: "Ban list for our community rooms",
      readOnly: false,
      teamId: "team1",
      entries: [
        {
          id: "ban_4",
          target: "@disruptor:matrix.org",
          reason: "Disruptive behavior in #general",
          timestamp: "2025-04-21T08:15:00Z",
        },
        { id: "ban_5", target: "@bot123:unknown.org", reason: "Automated spam", timestamp: "2025-04-20T14:30:00Z" },
      ],
    },
    {
      id: "support",
      name: "Support Rooms Ban List",
      description: "Ban list specific to support rooms",
      readOnly: false,
      teamId: "team1",
      entries: [
        {
          id: "ban_6",
          target: "@angryuser:matrix.org",
          reason: "Abusive language to support staff",
          timestamp: "2025-04-21T11:45:00Z",
        },
      ],
    },
    {
      id: "dev",
      name: "Development Ban List",
      description: "Ban list for development rooms",
      readOnly: false,
      teamId: "team2",
      entries: [
        {
          id: "ban_7",
          target: "@spambot:matrix.org",
          reason: "Code spam in development channels",
          timestamp: "2025-04-19T09:30:00Z",
        },
      ],
    },
  ].filter((list) => list.teamId === selectedTeam.id)

  const selectedList = policyLists.find((list) => list.id === selectedPolicyList) || policyLists[0] || { entries: [] }

  const teamNotifications = notifications.filter((n) => n.teamId === selectedTeam.id || !n.teamId)
  const unreadCount = teamNotifications.filter((n) => !n.read).length

  const handleTeamChange = (teamId: string) => {
    const team = mockTeams.find((t) => t.id === teamId)
    if (team) {
      setSelectedTeam(team)
      // Reset selected report and policy list when changing teams
      setSelectedReport(null)
      if (policyLists.length > 0) {
        setSelectedPolicyList(policyLists[0].id)
      }
    }
  }

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
    <div className="flex min-h-screen flex-col bg-black text-white">
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
                {mockTeams.map((team) => (
                  <DropdownMenuItem
                    key={team.id}
                    className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                    onClick={() => handleTeamChange(team.id)}
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
                              <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                            ) : notification.type === "ban" ? (
                              <Ban className="h-3.5 w-3.5 text-red-500" />
                            ) : (
                              <UserPlus className="h-3.5 w-3.5 text-blue-500" />
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
                    <Textarea
                      id="ban-reason"
                      placeholder="Reason for the ban"
                      className="bg-gray-900 border-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Policy Lists</Label>
                    <div className="space-y-2 mt-1">
                      {policyLists
                        .filter((list) => !list.readOnly)
                        .map((list) => (
                          <div key={list.id} className="flex items-center space-x-2">
                            <Checkbox id={`list-${list.id}`} />
                            <Label htmlFor={`list-${list.id}`} className="font-normal">
                              {list.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400">
                      Bans are applied to all protected rooms monitored by this bot.
                    </p>
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
                  <div className="space-y-2">
                    <Label htmlFor="room-id">Room</Label>
                    <Select defaultValue="general">
                      <SelectTrigger className="bg-gray-900 border-gray-800">
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        {selectedTeam.rooms.map((room) => (
                          <SelectItem key={room} value={room.replace("#", "").split(":")[0]}>
                            {room}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kick-reason">Reason</Label>
                    <Textarea
                      id="kick-reason"
                      placeholder="Reason for the kick"
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
                  <Button className="bg-orange-600 text-white hover:bg-orange-700">Kick User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link href="/">
              <Button
                variant="outline"
                className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </Link>
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
                        {mockTeams.map((team) => (
                          <DropdownMenuItem
                            key={team.id}
                            className={selectedTeam.id === team.id ? "bg-gray-800" : ""}
                            onClick={() => handleTeamChange(team.id)}
                          >
                            {team.name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Bot
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <nav className="flex flex-col p-4 gap-2">
                    <Link
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === "overview" ? "bg-gray-900 text-white" : "text-gray-400 hover:text-white"}`}
                      href="#"
                      onClick={() => setActiveTab("overview")}
                    >
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Link>

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
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="w-full border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{selectedTeam.name} Dashboard</h1>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="bans">Bans</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-8">
            <Overview selectedTeam={selectedTeam} reports={reports} policyLists={policyLists} />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Reports selectedReport={selectedReport} reports={reports} setSelectedReport={setSelectedReport} />
          </TabsContent>
          <TabsContent value="bans" className="space-y-4">
            <Bans selectedList={selectedList} selectedPolicyList={selectedPolicyList} policyLists={policyLists} setSelectedPolicyList={setSelectedPolicyList} />
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <TeamManagement selectedTeam={selectedTeam} onTeamChange={handleTeamChange} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
