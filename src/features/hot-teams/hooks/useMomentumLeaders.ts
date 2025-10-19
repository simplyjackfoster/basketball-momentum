import { useQuery } from "@tanstack/react-query";
import { getScoreboardDay, getStandings } from "../../../lib/apiClient";
import { getPastNDates } from "../../../lib/date";
import type { TeamMomentum } from "../utils/momentum";
import { computeMomentum } from "../utils/momentum";

async function fetchMomentumLeaders(): Promise<TeamMomentum[]> {
  const standings = await getStandings();
  const dates = getPastNDates(7);

  const scoreboardResults = await Promise.allSettled(
    dates.map((date) => getScoreboardDay(date.year, date.segment))
  );

  const games = scoreboardResults.flatMap((result) =>
    result.status === "fulfilled" ? result.value.games : []
  );

  return computeMomentum(games, standings);
}

export function useMomentumLeaders() {
  return useQuery({
    queryKey: ["momentum-leaders"],
    queryFn: fetchMomentumLeaders,
    staleTime: 1000 * 60 * 5
  });
}
