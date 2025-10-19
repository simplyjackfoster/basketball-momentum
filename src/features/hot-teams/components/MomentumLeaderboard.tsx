import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/Card";
import { PageLoader } from "../../../components/ui/PageLoader";
import { useMomentumLeaders } from "../hooks/useMomentumLeaders";
import { motion } from "framer-motion";

const gradientId = "momentumGradient";

export function MomentumLeaderboard() {
  const { data, isLoading, isError, refetch } = useMomentumLeaders();

  if (isLoading) {
    return <PageLoader message="Crunching momentum numbers..." />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t load the latest heat check. Please try again.
        </p>
        <button
          type="button"
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hocus:border-primary"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="py-12 text-center text-sm text-muted-foreground">No recent games yet.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <Flame className="h-4 w-4" />
            Hot Teams Momentum Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold">Who&apos;s blazing right now?</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Ranking D1 programs by current win streak and scoring dominance across the last five games.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-wide text-primary">
          <Trophy className="h-4 w-4" /> Momentum Score = (Win Streak × 2) + Avg Point Differential
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map((team, index) => (
          <motion.div
            key={team.teamId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, ${team.team.color ?? "#f97316"} 0%, ${team.team.alternateColor ?? "#fb923c"} 100%)`
                }}
              />
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {team.team.logos?.[0]?.href ? (
                    <img
                      src={team.team.logos[0].href}
                      alt={team.team.displayName}
                      className="h-12 w-12 rounded-xl border border-border/70 bg-background object-contain p-2"
                    />
                  ) : null}
                  <div>
                    <CardDescription>#{index + 1}</CardDescription>
                    <CardTitle className="font-display text-2xl">{team.team.displayName}</CardTitle>
                    <p className="text-xs uppercase text-muted-foreground">
                      {team.team.conference ?? "Independent"}
                    </p>
                  </div>
                </div>
                <div className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
                  {team.momentumScore.toFixed(1)}
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[...team.recentGames].reverse()}>
                      <defs>
                        <linearGradient id={`${gradientId}-${team.teamId}`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="opponent" hide />
                      <YAxis hide domain={["auto", "auto"]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#111114", borderRadius: 12, border: "1px solid #27272A" }}
                        labelFormatter={(value) => `vs ${value}`}
                        formatter={(value: number) => [`Diff: ${value.toFixed(1)}`, ""]}
                      />
                      <Area
                        type="monotone"
                        dataKey="differential"
                        stroke="#F97316"
                        fill={`url(#${gradientId}-${team.teamId})`}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="rounded-xl border border-border/70 bg-background/60 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Win streak</span>
                      <span className="font-semibold text-primary">{team.winStreak}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Avg diff</span>
                      <span className="font-semibold">{team.avgDifferential.toFixed(1)}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {team.recentGames.slice(0, 3).map((game) => (
                      <li key={game.id} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                        <span>
                          {new Date(game.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                        </span>
                        <span className={game.won ? "text-emerald-400" : "text-rose-400"}>
                          {game.won ? "W" : "L"} {game.differential > 0 ? "+" : ""}
                          {game.differential.toFixed(0)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
