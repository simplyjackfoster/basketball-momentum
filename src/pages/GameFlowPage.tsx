import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGameFlow } from "../features/game-flow/hooks/useGameFlow";
import { useRecentGames, type RecentGame } from "../features/game-flow/hooks/useRecentGames";
import { GameSelector } from "../features/game-flow/components/GameSelector";
import { GameFlowChart } from "../features/game-flow/components/GameFlowChart";
import { GameSummary } from "../features/game-flow/components/GameSummary";
import { buildMomentumSeries } from "../features/game-flow/utils/transformers";
import { PageLoader } from "../components/ui/PageLoader";

export default function GameFlowPage() {
  const { data: recentGames, isLoading: isLoadingRecent, isError: isRecentError, refetch } = useRecentGames();
  const [selected, setSelected] = useState<RecentGame | null>(null);

  useEffect(() => {
    if (!selected && recentGames && recentGames.length > 0) {
      setSelected(recentGames[0]);
    }
  }, [recentGames, selected]);

  const { data: flow, isLoading, isError, refetch: refetchFlow } = useGameFlow(selected?.id ?? null);

  const momentumSeries = useMemo(() => {
    if (!flow) {
      return [];
    }
    return buildMomentumSeries(flow.playByPlay);
  }, [flow]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-bold">Game Flow Visualizer</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Tap into the energy of any D1 contest. Select a recent showdown to reveal scoring momentum, signature runs, and final numbers.
        </p>
        <GameSelector
          selectedGameId={selected?.id ?? null}
          onSelect={(game) => setSelected(game)}
          games={recentGames ?? []}
          isLoading={isLoadingRecent}
          isError={isRecentError}
          onRetry={() => {
            refetch();
          }}
        />
      </div>

      {isLoading && <PageLoader message="Syncing play-by-play..." />}

      {isError && (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm">
          We couldn&apos;t load the play-by-play just yet. Try refreshing.
          <button
            type="button"
            className="ml-3 rounded-full border border-border px-3 py-1 text-xs text-primary"
            onClick={() => refetchFlow()}
          >
            Retry
          </button>
        </div>
      )}

      {flow ? (
        <div className="space-y-6">
          <GameFlowChart data={momentumSeries} />
          <GameSummary boxScore={flow.boxScore} playByPlay={flow.playByPlay} />
        </div>
      ) : null}
    </motion.div>
  );
}
