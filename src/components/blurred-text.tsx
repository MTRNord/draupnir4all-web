"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlurredTextProps {
  text: string
}

export function BlurredText({ text }: BlurredTextProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  return (
    <div className="relative">
      <div
        className={`p-3 rounded-md bg-gray-800 font-mono text-sm ${
          isBlurred ? "text-transparent blur-sm select-none" : "text-white"
        }`}
      >
        {text}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-7 w-7 p-0 text-gray-400 hover:text-white"
        onClick={() => setIsBlurred(!isBlurred)}
      >
        {isBlurred ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        <span className="sr-only">{isBlurred ? "Show content" : "Hide content"}</span>
      </Button>
    </div>
  )
}
