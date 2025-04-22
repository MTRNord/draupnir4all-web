"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { mockTeams, Team, TeamManagement } from "./team-management"
import Bans from "./components/bans-pane"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { ReportsTab } from "./components/reports-tab"
import { DashboardHeader } from "./components/dashboard-header"
import { OverviewTab } from "./components/overview-tab"

export interface PolicyList {
  id: string;
  name: string;
  description: string;
  readOnly: boolean;
  teamId: string;
  entries: {
    id: string,
    target: string,
    reason: string,
    timestamp: string,
  }[];
};

export interface Report {
  id: string;
  type: string;
  status: string;
  priority: string;
  timestamp: string;
  reporter: string;
  room: string;
  teamId: string;
  subject: {
    type: string;
    id?: string;
    sender: string;
    content?: {
      msgtype: string;
      body: string;
      url?: string;
      info?: {
        mimetype: string;
        w: number;
        h: number;
        size: number;
      };
    };
    target?: string;
    timestamp: string;
  };
  reason: string;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTeam, setSelectedTeam] = useState<Team>(mockTeams[0])

  // Mock data for reports - filtered by team
  const reports: Report[] = [
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

  // Mock data for policy lists - filtered by team
  const policyLists: PolicyList[] = [
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


  const handleTeamChange = (teamId: string) => {
    const team = mockTeams.find((t) => t.id === teamId)
    if (team) {
      setSelectedTeam(team)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <DashboardHeader
        selectedTeam={selectedTeam}
        onTeamChange={handleTeamChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teams={mockTeams}
      />
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{selectedTeam.name} Dashboard</h1>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="bans">Bans</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
            <OverviewTab selectedTeam={selectedTeam} policyLists={policyLists} reports={reports} />
          </TabsContent>
          <TabsContent value="reports">
            <ReportsTab reports={reports} />
          </TabsContent>
          <TabsContent value="bans">
            <Bans policyLists={policyLists} />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsDashboard selectedTeam={selectedTeam} />
          </TabsContent>
          <TabsContent value="settings">
            <TeamManagement selectedTeam={selectedTeam} onTeamChange={handleTeamChange} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
