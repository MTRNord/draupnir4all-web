import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface InfoCardWithTrendProps {
    title: string;
    changePercent: number;
    value: string | number;
    trendColorOverride?: string;
}

export default function InfoCardWithTrend({ title, changePercent, value, trendColorOverride }: InfoCardWithTrendProps) {
    const trendColor = changePercent > 0 ? "text-green-400" : "text-red-400"
    const trendIcon = changePercent > 0 ? <TrendingUp className="h-3.5 w-3.5 mr-1" /> : <TrendingDown className="h-3.5 w-3.5 mr-1" />
    const trendText = changePercent > 0 ? `+${changePercent}% from previous period` : `${changePercent}% from previous period`
    const trendClass = trendColorOverride || trendColor

    return (
        <Card className="border-gray-800 bg-gray-950">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className={`flex items-center text-xs ${trendClass}`}>
                    {trendIcon}
                    <span>{trendText}</span>
                </div>
            </CardContent>
        </Card>
    )
}