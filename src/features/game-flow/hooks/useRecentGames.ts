import { useQuery } from "@tanstack/react-query";
import { getScoreboardDay } from "../../../lib/apiClient";
import { getPastNDates } from "../../../lib/date";
import type { ScoreboardGame } from "../../../types/ncaa";

type RecentGame = {
  id: string;
  date: string;
  label: string;
  home: {
    name: string;
    score: number;
  };
  away: {
    name: string;
    score: number;
  };
};

async function fetchRecentGames(): Promise<RecentGame[]> {
  const dates = getPastNDates(3);
  const results = await Promise.allSettled(dates.map((date) => getScoreboardDay(date.year, date.segment)));

  const games = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value.games : []
  );

  const uniqueGames = new Map<string, ScoreboardGame>();
  games.forEach((game) => {
    uniqueGames.set(game.id, game);
  });

  return Array.from(uniqueGames.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((game) => {
      const home = game.teams.find((team) => team.homeAway === "home");
      const away = game.teams.find((team) => team.homeAway === "away");
      return {
        id: game.id,
        date: game.date,
        label: `${away?.team.shortName ?? ""} @ ${home?.team.shortName ?? ""}`,
        home: {
          name: home?.team.displayName ?? "Home",
          score: home?.score ?? 0
        },
        away: {
          name: away?.team.displayName ?? "Away",
          score: away?.score ?? 0
        }
      } satisfies RecentGame;
    });
}

export function useRecentGames() {
  return useQuery({
    queryKey: ["recent-games"],
    queryFn: fetchRecentGames,
    staleTime: 1000 * 60 * 2
  });
}

export type { RecentGame };
