'use server'
import createClient from "openapi-fetch";
import type { paths } from "./api/v1";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

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

const client = createClient<paths>({ baseUrl: `${process.env.NEXT_PUBLIC_D4ALL_INSTANCE_ADDRESS}/api` });

export async function listBots(mxid: string, token: string): Promise<ListResponse | undefined> {
    'use cache'
    cacheLife("minutes")

    console.log("Fetching teams from Draupnir4All instance for user:", mxid);

    const { data, error } = await client.GET("/1/appservice/list", {
        params: {
            header: {
                "X-Draupnir-UserID": mxid,
                Authorization: `Bearer ${token}`,
            }
        }
    });
    if (error) {
        console.error("Failed to fetch teams:", error);
        throw new Error("Failed to fetch teams");
    }
    return data;
}