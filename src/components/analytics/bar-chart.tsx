import { useRef, useState } from "react"

export interface BarChartItem {
  label: string
  values: {
    value: number
    color: string
    label: string
  }[]
}

interface BarChartProps {
  data: BarChartItem[]
  height?: number
  className?: string
}

export function BarChart({ data, height = 200, className = "" }: BarChartProps) {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  // Find the maximum value across all data points for scaling
  const maxValue = Math.max(...data.flatMap((item) => item.values.map((v) => v.value)))

  // Calculate bar width based on number of data points
  const barWidth = 100 / (data.length * 2) // Half the space for gaps

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={chartRef}
        className="relative w-full"
        style={{ height: `${height}px` }}
      >
        {/* Y-axis grid lines (optional) */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-full border-t border-gray-800"
              style={{ height: '20%' }}
            ></div>
          ))}
        </div>

        {/* Bars container */}
        <div className="absolute inset-0 flex items-end">
          {data.map((item, groupIndex) => (
            <div
              key={groupIndex}
              className="h-full flex-1 flex items-end justify-center group"
              onMouseEnter={() => setHoveredGroup(groupIndex)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <div className="relative h-full w-full flex items-end justify-center">
                {/* Bar group */}
                <div className="flex gap-1 items-end h-full">
                  {item.values.map((value, valueIndex) => {
                    const barHeight = (value.value / maxValue) * 100
                    return (
                      <div
                        key={valueIndex}
                        className="relative transition-all duration-200"
                        style={{
                          height: `${barHeight}%`,
                          width: `${barWidth}%`,
                          minWidth: '12px',
                          maxWidth: '40px',
                          backgroundColor: value.color,
                          opacity: hoveredGroup === groupIndex ? 0.8 : 1
                        }}
                      >
                        {/* Optional value label on top of bar */}
                        {hoveredGroup === groupIndex && (
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                            {value.value}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Tooltip */}
                {hoveredGroup === groupIndex && (
                  <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded p-2 z-10">
                    <div className="font-medium">{item.label}</div>
                    {item.values.map((value, i) => (
                      <div key={i} className="flex justify-between gap-2">
                        <span style={{ color: value.color }}>{value.label}:</span>
                        <span>{value.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 grid w-full" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((item, index) => (
          <div key={index} className="text-center text-xs text-gray-400 truncate px-1">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
