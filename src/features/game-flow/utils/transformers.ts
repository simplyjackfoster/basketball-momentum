import type { GameBoxScoreResponse, GamePlayByPlayResponse, PlayByPlayEvent } from "../../../types/ncaa";

export type MomentumPoint = {
  index: number;
  clockLabel: string;
  period: number;
  description: string;
  differential: number;
  leader: "home" | "away" | "even";
};

export type ScoringRun = {
  team: "home" | "away";
  points: number;
  startPlay: PlayByPlayEvent;
  endPlay: PlayByPlayEvent;
};

export function buildMomentumSeries(playByPlay: GamePlayByPlayResponse): MomentumPoint[] {
  return playByPlay.plays
    .filter((play) => play.scoringPlay)
    .map((play, index) => {
      const differential = (play.homeScore ?? 0) - (play.awayScore ?? 0);
      return {
        index,
        clockLabel: `P${play.period.number} · ${play.clock.displayValue}`,
        period: play.period.number,
        description: play.text,
        differential,
        leader: differential > 0 ? "home" : differential < 0 ? "away" : "even"
      } satisfies MomentumPoint;
    });
}

export function detectSignatureRun(plays: GamePlayByPlayResponse): ScoringRun | null {
  let bestRun: ScoringRun | null = null;
  let currentTeam: "home" | "away" | null = null;
  let currentPoints = 0;
  let startPlay: PlayByPlayEvent | null = null;
  let previousDifferential = 0;

  plays.plays.forEach((play) => {
    if (!play.scoringPlay) {
      return;
    }

    const differential = (play.homeScore ?? 0) - (play.awayScore ?? 0);
    const delta = differential - previousDifferential;
    previousDifferential = differential;

    if (delta === 0) {
      return;
    }

    const team = delta > 0 ? "home" : "away";
    const points = Math.abs(delta);

    if (currentTeam === team) {
      currentPoints += points;
    } else {
      currentTeam = team;
      currentPoints = points;
      startPlay = play;
    }

    if (!bestRun || currentPoints > bestRun.points) {
      bestRun = {
        team,
        points: currentPoints,
        startPlay: startPlay ?? play,
        endPlay: play
      };
    }
  });

  if (!bestRun || bestRun.points < 6) {
    return null;
  }

  return bestRun;
}

export function summarizeTeams(boxScore: GameBoxScoreResponse) {
  return {
    home: {
      name: boxScore.teams.home.team.displayName,
      score: boxScore.teams.home.score,
      logo: boxScore.teams.home.team.logos?.[0]?.href ?? ""
    },
    away: {
      name: boxScore.teams.away.team.displayName,
      score: boxScore.teams.away.score,
      logo: boxScore.teams.away.team.logos?.[0]?.href ?? ""
    }
  } as const;
}
