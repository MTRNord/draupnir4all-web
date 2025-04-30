'use server'

export interface ListResponse {
    bots: {
        id: string,
        managementRoom: string,
        ownerID: string,
        displayName: string,
    }[]
}

export async function listBots(token: string): Promise<ListResponse | undefined> {
    const url = new URL("/api/1/appservice/list", process.env.NEXT_PUBLIC_D4ALL_INSTANCE_ADDRESS);
    const res = await fetch(url, {
        method: "GET",
        headers: {
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