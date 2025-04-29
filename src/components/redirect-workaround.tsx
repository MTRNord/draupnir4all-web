"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function RedirectionPageClient({ redirectUrl, replace }: { redirectUrl: string; replace?: boolean }) {
    const router = useRouter();
    useEffect(() => {
        if (replace) {
            router.replace(redirectUrl);
        } else {
            router.push(redirectUrl);
        }
    }, [redirectUrl, replace, router]);
    return (
        <div className="flex h-full w-full min-h-screen min-w-screen flex-col bg-black text-white items-center justify-center">
            <h1 className="text-2xl font-bold">Redirecting...</h1>
            <p className="mt-4">If you are not redirected automatically, please click the button below.</p>
            <button
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                onClick={() => {
                    if (replace) {
                        router.replace(redirectUrl);
                    }
                    else {
                        router.push(redirectUrl);
                    }
                }}
            >
                Go to {redirectUrl}
            </button>
        </div>
    )
}