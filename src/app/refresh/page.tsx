"use client";

import RedirectionPageClient from "@/components/redirect-workaround";
import { useSession } from "@/contexts/session-context";
import { useEffect } from "react";

export default function RefreshPage() {
    // This page is used to refresh the session and redirect to the dashboard
    const { refreshOpenIDToken } = useSession();

    useEffect(() => {
        // Refresh the OpenID token
        refreshOpenIDToken()
    }, [refreshOpenIDToken]);

    return (
        <RedirectionPageClient redirectUrl="/dashboard" />
    )
}