"use client"

interface HorizontalBarItem {
  label: string
  value: number
  color?: string
  secondaryLabel?: string
}

interface HorizontalBarChartProps {
  data: HorizontalBarItem[]
  maxValue?: number
  color?: string
  className?: string
}

export function HorizontalBarChart({ data, maxValue, color = "#ef4444", className = "" }: HorizontalBarChartProps) {
  // If maxValue is not provided, calculate it from the data
  const calculatedMax = maxValue || Math.max(...data.map((item) => item.value))

  return (
    <div className={`space-y-4 ${className}`}>
      {data.map((item, index) => {
        const percentage = (item.value / calculatedMax) * 100

        return (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-gray-400">{item.secondaryLabel || `${item.value}`}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-900">
              <div
                className="h-full rounded-full transition-all duration-300 hover:opacity-80"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color || color,
                }}
              ></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
