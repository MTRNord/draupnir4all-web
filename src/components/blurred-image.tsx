"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlurredImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export function BlurredImage({ src, alt, width, height }: BlurredImageProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  return (
    <div className="relative inline-block">
      <div className={`overflow-hidden rounded-md ${isBlurred ? "filter grayscale blur-md" : ""}`}>
        <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="object-cover" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-7 w-7 p-0 bg-black/50 text-white hover:bg-black/70"
        onClick={() => setIsBlurred(!isBlurred)}
      >
        {isBlurred ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        <span className="sr-only">{isBlurred ? "Show image" : "Blur image"}</span>
      </Button>
    </div>
  )
}
