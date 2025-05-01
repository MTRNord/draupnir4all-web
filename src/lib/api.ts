'use server'

export interface DraupnirBot {
    id: string,
    managementRoom: string,
    ownerID: string,
    displayName: string,
    protectedRooms: {
        room: string,
        displayName?: string,
    }[],
    subscribedLists: string[],
}

export interface ListResponse {
    bots: DraupnirBot[]
}

export async function listBots(mxid: string, token: string): Promise<ListResponse | undefined> {
    console.log("Fetching teams from Draupnir4All instance for user:", mxid);
    const url = new URL("/api/1/appservice/list", process.env.NEXT_PUBLIC_D4ALL_INSTANCE_ADDRESS);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "X-Draupnir-UserID": mxid,
            Authorization: `Bearer ${token}`,
            "Accept": "application/json",
        },
    });
    if (!res.ok) {
        const resp: {
            error?: string;
            errcode?: string;
        } = await res.json();
        if (resp.error) {
            console.error("Failed to fetch teams:", res.status, resp.errcode, resp.error);
        } else {
            console.error("Failed to fetch teams:", res.status, res.statusText);
        }
        // TODO: Handle error
        return undefined;
    }
    const data = await res.json();
    if (!data.bots) {
        console.error("Invalid response:", data);
        // Handle error
        return undefined;
    }
    return data as ListResponse;
}