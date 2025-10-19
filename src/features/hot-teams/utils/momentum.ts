import type { ScoreboardGame, StandingsResponse, TeamIdentifier } from "../../../types/ncaa";

export type TeamMomentumGame = {
  id: string;
  date: string;
  opponent: string;
  differential: number;
  won: boolean;
};

export type TeamMomentum = {
  teamId: string;
  team: TeamIdentifier;
  winStreak: number;
  avgDifferential: number;
  recentGames: TeamMomentumGame[];
  momentumScore: number;
};

type GamesIndex = Record<string, TeamMomentumGame[]>;
type TeamDirectory = Record<string, TeamIdentifier>;

type StandingsIndex = Record<string, number>;

const MAX_RECENT_GAMES = 5;

function normalizeTeam(team: ScoreboardGame["teams"][number]) {
  return {
    id: team.team.id ?? team.id,
    team: {
      id: team.team.id ?? team.id,
      shortName: team.team.shortName ?? team.team.name,
      name: team.team.name,
      displayName: team.team.displayName ?? team.team.name,
      conference: team.team.conference,
      abbreviation: team.team.shortName,
      color: team.team.color,
      alternateColor: team.team.alternateColor,
      logos: team.team.logos
    } satisfies TeamIdentifier
  };
}

export function buildGamesIndex(games: ScoreboardGame[]): {
  gamesIndex: GamesIndex;
  teamDirectory: TeamDirectory;
} {
  const gamesIndex: GamesIndex = {};
  const teamDirectory: TeamDirectory = {};

  games.forEach((game) => {
    const [home, away] = game.teams;
    if (!home || !away) return;

    const homeInfo = normalizeTeam(home);
    const awayInfo = normalizeTeam(away);

    teamDirectory[homeInfo.id] = homeInfo.team;
    teamDirectory[awayInfo.id] = awayInfo.team;

    const differential = home.score - away.score;
    const homeWon = differential > 0;
    const awayWon = differential < 0;

    const common = {
      id: game.id,
      date: game.date
    };

    gamesIndex[homeInfo.id] = gamesIndex[homeInfo.id] ?? [];
    gamesIndex[homeInfo.id].push({
      ...common,
      opponent: awayInfo.team.shortName,
      differential,
      won: homeWon
    });

    gamesIndex[awayInfo.id] = gamesIndex[awayInfo.id] ?? [];
    gamesIndex[awayInfo.id].push({
      ...common,
      opponent: homeInfo.team.shortName,
      differential: -differential,
      won: awayWon
    });

    return;
  });

  return { gamesIndex, teamDirectory };
}

export function buildStandingsIndex(standings: StandingsResponse): StandingsIndex {
  const index: StandingsIndex = {};
  standings.standings.forEach((group) => {
    group.entries.forEach((entry) => {
      const streakStat = entry.stats.find((stat) => stat.name === "streak");
      const streakValue = Number(streakStat?.value ?? 0);
      index[entry.team.id] = Number.isFinite(streakValue) ? streakValue : 0;
    });
  });
  return index;
}

export function computeMomentum(
  games: ScoreboardGame[],
  standings: StandingsResponse
): TeamMomentum[] {
  const { gamesIndex, teamDirectory } = buildGamesIndex(games);
  const standingsIndex = buildStandingsIndex(standings);

  const leaderboard = Object.entries(gamesIndex).map(([teamId, teamGames]) => {
    const sortedGames = [...teamGames].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recentGames = sortedGames.slice(0, MAX_RECENT_GAMES);
    const avgDifferential =
      recentGames.reduce((total, game) => total + game.differential, 0) /
      Math.max(recentGames.length, 1);

    const winStreak = standingsIndex[teamId] ?? 0;

    return {
      teamId,
      team: teamDirectory[teamId] ?? {
        id: teamId,
        shortName: teamId,
        name: teamId,
        displayName: teamId
      },
      winStreak,
      avgDifferential,
      recentGames,
      momentumScore: winStreak * 2 + avgDifferential
    } satisfies TeamMomentum;
  });

  return leaderboard
    .filter((entry) => entry.recentGames.length > 0)
    .sort((a, b) => b.momentumScore - a.momentumScore)
    .slice(0, 10);
}
