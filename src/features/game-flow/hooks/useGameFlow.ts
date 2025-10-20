import { useQuery } from "@tanstack/react-query";
import { getGameBoxScore, getGamePlayByPlay } from "../../../lib/apiClient";
import type { GameBoxScoreResponse, GamePlayByPlayResponse } from "../../../types/ncaa";

export function useGameFlow(gameId: string | null) {
  return useQuery<{ playByPlay: GamePlayByPlayResponse; boxScore: GameBoxScoreResponse }>(
    {
      queryKey: ["game-flow", gameId],
      enabled: Boolean(gameId),
      queryFn: async () => {
        if (!gameId) {
          throw new Error("Missing game id");
        }
        const [playByPlay, boxScore] = await Promise.all([
          getGamePlayByPlay(gameId),
          getGameBoxScore(gameId)
        ]);
        return { playByPlay, boxScore };
      },
      staleTime: 1000 * 60
    }
  );
}
