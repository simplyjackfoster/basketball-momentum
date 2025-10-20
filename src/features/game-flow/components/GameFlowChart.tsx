import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import type { MomentumPoint } from "../utils/transformers";

const tooltipStyles = {
  backgroundColor: "#111114",
  border: "1px solid #27272A",
  borderRadius: 12
};

type GameFlowChartProps = {
  data: MomentumPoint[];
};

export function GameFlowChart({ data }: GameFlowChartProps) {
  if (!data.length) {
    return <p className="py-10 text-center text-sm text-muted-foreground">Play-by-play data unavailable.</p>;
  }

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="trailGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="clockLabel" tick={{ fill: "#A1A1AA" }} tickLine={false} interval={data.length > 8 ? Math.floor(data.length / 8) : 0} angle={-30} dy={16} height={60} />
          <YAxis
            tick={{ fill: "#A1A1AA" }}
            axisLine={false}
            tickLine={false}
            domain={["auto", "auto"]}
            tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}`}
          />
          <ReferenceLine y={0} stroke="#3f3f46" strokeDasharray="4 6" />
          <Tooltip
            contentStyle={tooltipStyles}
            labelStyle={{ color: "#fff", fontWeight: 600 }}
            formatter={(value: number, _name, item) => {
              const leader = (item.payload as MomentumPoint).leader;
              return [`${value > 0 ? "+" : ""}${value} differential`, leader === "home" ? "Home lead" : leader === "away" ? "Away lead" : "Tied"];
            }}
          />
          <Area
            type="monotone"
            dataKey="differential"
            stroke="#f97316"
            fill="url(#trailGradient)"
            strokeWidth={2.5}
            activeDot={{ r: 5, strokeWidth: 0 }}
            dot={false}
            isAnimationActive
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
