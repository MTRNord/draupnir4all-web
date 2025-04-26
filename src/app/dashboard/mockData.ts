export const EBanTypes = {
    User: "user",
    Server: "server",
    Room: "room",
} as const;
type BanTypes = typeof EBanTypes[keyof typeof EBanTypes];

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
        type: BanTypes;
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

// Mock data for policy lists - filtered by team
export const mockPolicyLists: PolicyList[] = [
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
                type: EBanTypes.User,
            },
            {
                id: "ban_2",
                target: "@troll:badserver.org",
                reason: "Harassment and inappropriate content",
                timestamp: "2025-04-19T15:45:00Z",
                type: EBanTypes.User,
            },
            {
                id: "ban_3",
                target: "@phisher:scam.org",
                reason: "Phishing attempts",
                timestamp: "2025-04-18T09:20:00Z",
                type: EBanTypes.User,
            },
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
                type: EBanTypes.User,
            },
            {
                id: "ban_5",
                target: "@bot123:unknown.org",
                reason: "Automated spam",
                timestamp: "2025-04-20T14:30:00Z",
                type: EBanTypes.User,
            },
            // Server ban
            {
                id: "ban_6",
                target: "badserver.org",
                reason: "Known spam server",
                timestamp: "2025-04-19T11:00:00Z",
                type: EBanTypes.Server,
            },
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
                type: EBanTypes.User,
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
                type: EBanTypes.User,
            },
        ],
    },
]

// Mock data for reports - filtered by team
export const mockReports: Report[] = [
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
]


export interface Team {
    id: string;
    name: string;
    owner: string;
    created: string;
    members: {
        id: string;
        name: string;
        role: "owner" | "moderator";
        avatar?: string;
        joined: string;
    }[];
    rooms: string[];
}

// Mock data for teams/bots
export const mockTeams: Team[] = [
    {
        id: "team1",
        name: "Main Community Bot",
        owner: "@admin:matrix.org",
        created: "2025-01-15T10:00:00Z",
        members: [
            {
                id: "user1",
                name: "@admin:matrix.org",
                role: "owner",
                avatar: undefined,
                joined: "2025-01-15T10:00:00Z",
            },
            {
                id: "user2",
                name: "@mod1:matrix.org",
                role: "moderator",
                avatar: undefined,
                joined: "2025-01-16T14:30:00Z",
            },
            {
                id: "user3",
                name: "@mod2:matrix.org",
                role: "moderator",
                avatar: undefined,
                joined: "2025-02-01T09:15:00Z",
            },
        ],
        rooms: ["#general:matrix.org", "#support:matrix.org", "#community:matrix.org"],
    },
    {
        id: "team2",
        name: "Development Team Bot",
        owner: "@admin:matrix.org",
        created: "2025-02-10T11:30:00Z",
        members: [
            {
                id: "user1",
                name: "@admin:matrix.org",
                role: "owner",
                avatar: undefined,
                joined: "2025-02-10T11:30:00Z",
            },
            {
                id: "user4",
                name: "@dev1:matrix.org",
                role: "moderator",
                avatar: undefined,
                joined: "2025-02-11T13:45:00Z",
            },
        ],
        rooms: ["#development:matrix.org", "#coding:matrix.org"],
    },
]
