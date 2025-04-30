import { redirect } from "next/navigation"


export default async function TeamManagement({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const teamId = (await searchParams).team as string | undefined

    // Redirect to overview with team parameter
    const redirectUrl = teamId ? `/dashboard/settings/members?team=${teamId}` : "/dashboard/settings/members"

    redirect(redirectUrl)
}
