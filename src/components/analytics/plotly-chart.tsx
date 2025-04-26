"use client"

import dynamic from "next/dynamic"
import type { Data, Layout, Config } from "plotly.js"

// Import Plotly dynamically to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface PlotlyChartProps {
    data: Data[]
    layout: Partial<Layout>
    config?: Config
    className?: string
}

export function PlotlyChart({ data, layout, config, className = "" }: PlotlyChartProps) {
    const defaultConfig = {
        displayModeBar: false,
        responsive: true,
        ...config,
    }

    return (
        <div className={className}>
            <Plot data={data} layout={layout} config={defaultConfig} style={{ width: "100%" }} />
        </div>
    )
}
