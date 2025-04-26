import { redirect } from "next/navigation"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const teamId = (await searchParams).team as string | undefined

  // Redirect to overview with team parameter
  const redirectUrl = teamId ? `/dashboard/overview?team=${teamId}` : "/dashboard/overview"

  redirect(redirectUrl)
}
