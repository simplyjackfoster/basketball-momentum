import { ChevronsUpDown, RefreshCw } from "lucide-react";
import type { RecentGame } from "../hooks/useRecentGames";
import { cn } from "../../../lib/utils";

type GameSelectorProps = {
  selectedGameId: string | null;
  onSelect: (game: RecentGame) => void;
  games: RecentGame[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export function GameSelector({
  selectedGameId,
  onSelect,
  games,
  isLoading,
  isError,
  onRetry
}: GameSelectorProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading recent matchups...</p>;
  }

  if (isError) {
    return (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-primary hocus:border-primary"
      >
        <RefreshCw className="h-4 w-4" /> Retry loading games
      </button>
    );
  }

  if (games.length === 0) {
    return <p className="text-sm text-muted-foreground">No recent games found. Check back soon!</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {games.map((game) => (
        <button
          key={game.id}
          type="button"
          onClick={() => onSelect(game)}
          className={cn(
            "flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-left transition hocus:border-primary/70",
            selectedGameId === game.id && "border-primary/80 bg-primary/10"
          )}
        >
          <div>
            <p className="text-sm font-semibold">
              {game.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(game.date).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit"
              })}
            </p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}
