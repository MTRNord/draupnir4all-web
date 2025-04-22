"use client"

import { useState } from "react"
import { PieChartIcon } from "lucide-react"

interface PieChartItem {
  id: string | number
  label: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieChartItem[]
  centerLabel?: string
  className?: string
}

interface PieSlice {
  id: string | number;
  d: string;
  fill: string;
  percentage: number;
  midAngle: number;
  hoverDx: number;
  hoverDy: number;
  label: string;
  value: number;
  index: number;
}

export function PieChart({
  data,
  centerLabel = "Distribution",
  className = "",
}: PieChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null)

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Generate pie slices
  const { slices } = data.reduce(
    (acc, item, i) => {
      const startAngle = acc.offset
      const angle = (item.value / total) * 360
      const endAngle = startAngle + angle
      const largeArcFlag = angle > 180 ? 1 : 0

      // Calculate coordinates
      const startX = 50 + 45 * Math.cos((startAngle * Math.PI) / 180)
      const startY = 50 + 45 * Math.sin((startAngle * Math.PI) / 180)
      const endX = 50 + 45 * Math.cos((endAngle * Math.PI) / 180)
      const endY = 50 + 45 * Math.sin((endAngle * Math.PI) / 180)

      // Calculate midpoint angle for hover direction
      const midAngle = startAngle + angle / 2

      // Calculate hover translation direction
      const hoverDx = 5 * Math.cos((midAngle * Math.PI) / 180)
      const hoverDy = 5 * Math.sin((midAngle * Math.PI) / 180)

      const d = [`M 50 50`, `L ${startX} ${startY}`, `A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY}`, `Z`].join(" ")

      const percentage = Math.round((item.value / total) * 100)

      acc.slices.push({
        id: item.id,
        d,
        fill: item.color,
        percentage,
        midAngle,
        hoverDx,
        hoverDy,
        label: item.label,
        value: item.value,
        index: i,
      } as PieSlice)

      acc.offset = endAngle
      return acc
    },
    { slices: [] as PieSlice[], offset: 0 },
  )

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex h-[220px] items-center justify-center">
        <div className="relative h-[180px] w-[180px]">
          {/* Pie chart visualization */}
          <div className="relative">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              {slices.map((slice, i) => (
                <path
                  key={slice.id}
                  d={slice.d}
                  fill={slice.fill}
                  stroke="#111"
                  strokeWidth="0.5"
                  className="transition-transform duration-200 cursor-pointer hover:opacity-90"
                  style={{
                    transform: hoveredSlice === i ? `translate(${slice.hoverDx}px, ${slice.hoverDy}px)` : "none",
                  }}
                  onMouseEnter={() => setHoveredSlice(i)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              ))}
            </svg>

            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full bg-gray-950">
                <PieChartIcon className="h-5 w-5 text-gray-400" />
                <span className="text-xs text-gray-400">{centerLabel}</span>
              </div>
            </div>
          </div>

          {/* Tooltip container - positioned outside the SVG */}
          {hoveredSlice !== null && (
            <div className="absolute top-0 left-0 w-full">
              <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 z-50 whitespace-nowrap">
                {slices[hoveredSlice].label}: {slices[hoveredSlice].value} ({slices[hoveredSlice].percentage}%)
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {slices.map((slice, index) => (
          <div
            key={slice.id}
            className="flex items-center gap-2 p-1 rounded hover:bg-gray-900 cursor-pointer transition-colors"
            onMouseEnter={() => setHoveredSlice(index)}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.fill }}></div>
            <div className="flex flex-1 items-center justify-between">
              <span className="text-xs">{slice.label}</span>
              <span className="text-xs text-gray-400">{slice.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
