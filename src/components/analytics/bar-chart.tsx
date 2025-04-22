"use client"

interface BarChartItem {
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
  // Find the maximum value across all data points for scaling
  const maxValue = Math.max(...data.flatMap((item) => item.values.map((v) => v.value)))

  return (
    <div className={`w-full ${className}`}>
      <div className={`h-[${height}px] w-full`}>
        <div className="flex h-full items-end gap-2">
          {data.map((item, index) => (
            <div key={index} className="group relative flex w-full flex-col items-center">
              <div className="relative flex h-full w-full flex-col justify-end">
                {item.values.map((value, valueIndex) => {
                  const barHeight = (value.value / maxValue) * 100
                  return (
                    <div
                      key={valueIndex}
                      className={`w-full rounded-t transition-all group-hover:opacity-90 ${valueIndex > 0 ? "mt-0.5" : ""}`}
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: value.color,
                      }}
                    ></div>
                  )
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0 overflow-hidden bg-gray-800 opacity-0 transition-all group-hover:h-auto group-hover:opacity-100 z-10 rounded-md">
                <div className="p-2 text-center text-xs">
                  <div className="font-medium">{item.label}</div>
                  {item.values.map((value, valueIndex) => (
                    <div key={valueIndex} style={{ color: value.color }}>
                      {value.label}: {value.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex w-full justify-between">
        {data.map((item, index) => (
          <div key={index} className="text-center text-xs text-gray-400">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
