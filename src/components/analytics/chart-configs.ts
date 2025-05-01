import type { Data, Layout } from "plotly.js"
import { HeatmapDay } from "./heatmap"

// Helper function to generate heatmap data
export const generateHeatmapData = (intensity = 1, seed = 42): HeatmapDay[] => {
    const today = new Date()
    const data = []

    // Generate data for the past year (52 weeks)
    for (let i = 0; i < 364; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)

        // Use a simple algorithm to generate semi-random but consistent data
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
        const value = Math.floor(Math.sin(dayOfYear * 0.1 + seed) * Math.cos(date.getMonth() * 0.3 + seed) * 10 * intensity)

        data.push({
            date: date.toISOString().split("T")[0] as string,
            count: Math.max(0, value),
        })
    }

    // Sort by date (oldest first)
    return data.reverse()
}

export interface RoomActivityData {
    name: string
    reports: number
    bans: number
}

// Room Activity Chart Config
export const getRoomActivityConfig = (roomData: RoomActivityData[]): {
    data: Data[],
    layout: Partial<Layout>
} => {
    return {
        data: [
            {
                y: roomData.map((item) => item.name),
                x: roomData.map((item) => item.reports),
                name: "Reports",
                type: "bar",
                orientation: "h",
                marker: {
                    color: "#9333ea",
                },
            },
            {
                y: roomData.map((item) => item.name),
                x: roomData.map((item) => item.bans),
                name: "Bans",
                type: "bar",
                orientation: "h",
                marker: {
                    color: "#dc2626",
                },
            },
        ],
        layout: {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: "#9ca3af",
            },
            margin: {
                l: 10, // Increased left margin for room names
                r: 10,
                t: 10,
                b: 10,
                pad: 10,
            },
            barmode: "stack",
            legend: {
                orientation: "h",
                xanchor: "center",
                x: 0.5,
                y: -0.2,
            },
            xaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                automargin: true,
            },
            yaxis: {
                gridcolor: "#1f2937",
                automargin: true,
            },
            height: 280,
            autosize: true,
        },
    }
}

export interface ReportTypeData {
    id: number;
    label: string;
    value: number;
    color: string;
}

// Report Types Pie Chart Config
export const getReportTypesConfig = (reportData: ReportTypeData[]): {
    data: Data[],
    layout: Partial<Layout>
} => {
    return {
        data: [
            {
                values: reportData.map((item) => item.value),
                labels: reportData.map((item) => item.label),
                type: "pie",
                hole: 0.5,
                marker: {
                    colors: reportData.map((item) => item.color),
                },
                textinfo: "label+percent",
                textposition: "outside",
                insidetextorientation: "radial",
                hoverinfo: "label+value+percent",
                hoverlabel: {
                    bgcolor: "#374151",
                    bordercolor: "#374151",
                    font: {
                        size: 12,
                        family: "Inter, sans-serif",
                        color: "#ffffff"
                    },
                },
                // Add slice animation on hover
                pull: Array(reportData.length).fill(0),
                hovertemplate: "<b>%{label}</b><br>Count: %{value}<br>Percentage: %{percent}<extra></extra>",
            },
        ],
        layout: {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: "#9ca3af",
            },
            margin: {
                l: 30,
                r: 30,
                t: 30,
                b: 30,
                pad: 10,
            },
            showlegend: false,
            height: 280,
            autosize: true,
            annotations: [
                {
                    font: {
                        size: 12,
                        color: "#9ca3af",
                    },
                    showarrow: false,
                    text: "Report Types",
                    x: 0.5,
                    y: 0.5,
                },
            ],
            // Add hover animations
            hovermode: "closest",
            updatemenus: [
                {
                    type: "dropdown",
                    showactive: false,
                    visible: false, // Hidden menu that enables hover effects
                },
            ],
        },
    }
}

export interface MonthlyActivityData {
    month: string
    year: number
    reports: number
    bans: number
}

// Monthly Activity Bar Chart Config
export const getMonthlyActivityConfig = (monthlyData: MonthlyActivityData[]): {
    data: Data[],
    layout: Partial<Layout>
} => {
    return {
        data: [
            {
                x: monthlyData.map((item) => `${item.month} ${item.year}`),
                y: monthlyData.map((item) => item.reports),
                name: "Reports",
                type: "bar",
                marker: {
                    color: "#9333ea",
                },
            },
            {
                x: monthlyData.map((item) => `${item.month} ${item.year}`),
                y: monthlyData.map((item) => item.bans),
                name: "Bans",
                type: "bar",
                marker: {
                    color: "#dc2626",
                },
            },
        ],
        layout: {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: "#9ca3af",
            },
            margin: {
                l: 40,
                r: 10,
                t: 10,
                b: 40,
                pad: 10,
            },
            barmode: "group",
            legend: {
                orientation: "h",
                xanchor: "center",
                x: 0.5,
                y: -0.2,
            },
            xaxis: {
                gridcolor: "#1f2937",
                tickfont: {
                    size: 10,
                },
                automargin: true,
            },
            yaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                automargin: true,
            },
            height: 280,
            autosize: true,
        },
    }
}

export interface BannedServerData {
    label: string
    value: number
    secondaryLabel: string
}

// Banned Servers Horizontal Bar Chart Config
export const getBannedServersConfig = (serversData: BannedServerData[]): {
    data: Data[],
    layout: Partial<Layout>
} => {
    return {
        data: [
            {
                y: serversData.map((item) => item.label),
                x: serversData.map((item) => item.value),
                type: "bar",
                orientation: "h",
                marker: {
                    color: "#dc2626",
                },
                text: serversData.map((item) => item.secondaryLabel),
                textposition: "auto",
                hoverinfo: "x+text",
            },
        ],
        layout: {
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
                color: "#9ca3af",
            },
            margin: {
                l: 10,
                r: 10,
                t: 10,
                b: 40,
                pad: 10,
            },
            xaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                automargin: true,
            },
            yaxis: {
                gridcolor: "#1f2937",
                zerolinecolor: "#1f2937",
                automargin: true,
            },
            height: 220,
            autosize: true,
        },
    }
}
