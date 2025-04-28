"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, CheckCircle, MessageSquare, UserPlus, Filter, Ban } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlurredText } from "@/components/blurred-text"
import { BlurredImage } from "@/components/blurred-image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { mockReports, mockTeams } from "../mockData";
import { redirect, useSearchParams } from "next/navigation"
import TabNavigation from "../../../components/dashboard/tab-navigation"
import { useSession } from "@/contexts/session-context"

export default function ReportsPage() {
    const searchParams = useSearchParams()
    const teamIdParam = searchParams.get("team")
    const [selectedTeam, setSelectedTeam] = useState(mockTeams.find((t) => t.id === teamIdParam) || mockTeams[0])
    const { user } = useSession()


    useEffect(() => {
        // Check if the user is logged in
        if (!user) {
            redirect("/login")
        }
    }, [user])

    // Update selected team when URL param changes
    useEffect(() => {
        const team = mockTeams.find((t) => t.id === teamIdParam)
        if (team) {
            setSelectedTeam(team)
        }
    }, [teamIdParam])

    // Filter reports based on selected team
    const reports = mockReports.filter((report) => report.teamId === selectedTeam.id)
    const [selectedReport, setSelectedReport] = useState<string | null>(null)
    const [filter, setFilter] = useState("all")

    const filteredReports =
        filter === "all"
            ? reports
            : filter === "high"
                ? reports.filter((r) => r.priority === "high")
                : reports.filter((r) => r.type === filter)

    return (
        <>
            <TabNavigation selectedTeam={selectedTeam} currentTab="reports" />
            <Card className="border-gray-800 bg-gray-950">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle>Active Reports</CardTitle>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="all" onValueChange={setFilter}>
                                <SelectTrigger className="h-8 w-[120px] bg-gray-900 border-gray-800">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 border-gray-800">
                                    <SelectItem value="all">All Reports</SelectItem>
                                    <SelectItem value="message">Messages</SelectItem>
                                    <SelectItem value="invite">Invites</SelectItem>
                                    <SelectItem value="high">High Priority</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <CardDescription className="text-gray-400">Reports requiring moderation action</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400">Report List</h3>
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <div
                                        key={report.id}
                                        className={`p-3 rounded-md border cursor-pointer transition-colors ${selectedReport === report.id
                                            ? "bg-gray-800 border-purple-600"
                                            : "bg-gray-900 border-gray-800 hover:border-gray-700"
                                            }`}
                                        onClick={() => setSelectedReport(report.id)}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {report.type === "message" ? (
                                                    <MessageSquare className="h-4 w-4 text-blue-400" />
                                                ) : (
                                                    <UserPlus className="h-4 w-4 text-green-400" />
                                                )}
                                                <span className="text-sm font-medium">
                                                    {report.type === "message" ? "Message Report" : "Invite Report"}
                                                </span>
                                            </div>
                                            <Badge
                                                className={
                                                    report.priority === "high"
                                                        ? "bg-red-900/50 text-red-300 hover:bg-red-900/70"
                                                        : "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900/70"
                                                }
                                            >
                                                {report.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-1">{report.room}</p>
                                        <p className="text-xs text-gray-400 mb-1">
                                            {report.type === "message"
                                                ? `From: ${report.subject.sender}`
                                                : `From: ${report.subject.sender} To: ${report.subject.target}`}
                                        </p>
                                        <p className="text-xs text-gray-500">{new Date(report.timestamp).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                    <CheckCircle className="h-8 w-8 text-gray-500 mb-2" />
                                    <p className="text-gray-400">No active reports</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400">Report Details</h3>
                            {selectedReport ? (
                                (() => {
                                    const report = reports.find((r) => r.id === selectedReport)
                                    if (!report) return <p>Select a report to view details</p>

                                    return (
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-md bg-gray-900 border border-gray-800">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium">Report Information</h4>
                                                    <Badge className="bg-purple-900/50 text-purple-300">{report.status}</Badge>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Reported by:</span>
                                                        <span>{report.reporter}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Room:</span>
                                                        <span>{report.room}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Reason:</span>
                                                        <span>{report.reason}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Time:</span>
                                                        <span>{new Date(report.timestamp).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-md bg-gray-900 border border-gray-800">
                                                <h4 className="font-medium mb-3">
                                                    {report.type === "message" ? "Message Content" : "Invite Details"}
                                                </h4>

                                                {report.type === "message" && (
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Sender:</span>
                                                            <span>{report.subject.sender}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Message ID:</span>
                                                            <span className="font-mono text-xs">{report.subject.id}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Time:</span>
                                                            <span>{new Date(report.subject.timestamp).toLocaleString()}</span>
                                                        </div>

                                                        <div className="mt-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-sm text-gray-400">Content:</span>
                                                                {report.subject.content?.msgtype === "m.text" && (
                                                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-400">
                                                                        <Filter className="h-3 w-3 mr-1" />
                                                                        Filter
                                                                    </Button>
                                                                )}
                                                            </div>

                                                            {report.subject.content?.msgtype === "m.text" ? (
                                                                <BlurredText text={report.subject.content?.body} />
                                                            ) : report.subject.content?.msgtype === "m.image" ? (
                                                                <div className="mt-2">
                                                                    <BlurredImage
                                                                        src="/placeholder.svg?height=300&width=400"
                                                                        alt={report.subject.content?.body}
                                                                        width={400}
                                                                        height={300}
                                                                    />
                                                                    <p className="text-xs text-gray-500 mt-1">Image: {report.subject.content.body}</p>
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm">Unsupported content type</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {report.type === "invite" && (
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Sender:</span>
                                                            <span>{report.subject.sender}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Target:</span>
                                                            <span>{report.subject.target}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-gray-400">Time:</span>
                                                            <span>{new Date(report.subject.timestamp).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                <Button className="bg-green-600 text-white hover:bg-green-700">
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Resolve
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="border-red-500 text-red-400 hover:bg-red-950 hover:text-red-300"
                                                        >
                                                            <Ban className="mr-2 h-4 w-4" />
                                                            Ban User
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="bg-gray-950 border-gray-800">
                                                        <DialogHeader>
                                                            <DialogTitle>Ban User</DialogTitle>
                                                            <DialogDescription className="text-gray-400">
                                                                Ban {report.subject.sender} from your Matrix rooms
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        {/* Ban dialog content */}
                                                    </DialogContent>
                                                </Dialog>
                                                {report.type === "message" && (
                                                    <Button
                                                        variant="outline"
                                                        className="border-gray-700 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
                                                    >
                                                        <MessageSquare className="mr-2 h-4 w-4" />
                                                        Delete Message
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })()
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                    <AlertTriangle className="h-8 w-8 text-gray-500 mb-2" />
                                    <p className="text-gray-400">Select a report to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
