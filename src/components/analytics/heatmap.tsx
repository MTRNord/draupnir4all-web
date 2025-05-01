"use client"

import { Calendar } from "lucide-react"

export interface HeatmapDay {
  date: string
  count: number
}

interface HeatmapProps {
  data: HeatmapDay[]
  title: string
  colorIntensityLabel?: string
  className?: string
}

export function Heatmap({ data, title, colorIntensityLabel = "Activity", className = "" }: HeatmapProps) {
  // Get intensity color based on count
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-900"
    if (count < 3) return "bg-purple-950"
    if (count < 6) return "bg-purple-900"
    if (count < 9) return "bg-purple-800"
    return "bg-purple-600"
  }

  // Group data by week
  const weeks: HeatmapDay[][] = []
  let currentWeek: HeatmapDay[] = []

  // Process data to create weeks (7 days per week)
  data.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push([...currentWeek])
      currentWeek = []
    }
  })

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-gray-900"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-950"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-900"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-800"></div>
            <div className="h-3 w-3 rounded-sm bg-purple-600"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Days of week labels */}
        <div className="flex flex-col pr-2 text-xs text-gray-500">
          <div className="h-[18px] mb-[2px]">Mon</div>
          <div className="h-[18px] mb-[2px]">Tue</div>
          <div className="h-[18px] mb-[2px]">Wed</div>
          <div className="h-[18px] mb-[2px]">Thu</div>
          <div className="h-[18px] mb-[2px]">Fri</div>
          <div className="h-[18px] mb-[2px]">Sat</div>
          <div className="h-[18px]">Sun</div>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-[650px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-[18px] w-[18px] rounded-sm ${getColor(day.count)} transition-opacity hover:opacity-80 cursor-pointer`}
                    title={`${day.date}: ${day.count} ${colorIntensityLabel}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          {/* Month labels */}
          <div className="flex text-xs text-gray-500 mt-1 min-w-[650px]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
              <div key={i} className="flex-1">
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
