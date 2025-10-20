export type TeamIdentifier = {
  id: string;
  shortName: string;
  name: string;
  displayName: string;
  conference?: string;
  abbreviation?: string;
  color?: string;
  alternateColor?: string;
  logos?: { href: string }[];
};

export type ScoreboardGame = {
  id: string;
  date: string;
  attendance?: number;
  status: {
    type: {
      name: string;
      description: string;
      detail: string;
      state: string;
      completed?: boolean;
    };
    displayClock: string;
    period: number;
  };
  teams: Array<{
    id: string;
    homeAway: "home" | "away";
    score: number;
    winner?: boolean;
    team: TeamIdentifier;
  }>;
  competitions?: Array<{
    id: string;
    venue?: { address?: { city?: string; state?: string } };
  }>;
};

export type ScoreboardDayResponse = {
  games: ScoreboardGame[];
};

export type PlayByPlayEvent = {
  sequenceNumber: string;
  clock: {
    displayValue: string;
  };
  period: {
    number: number;
    displayValue: string;
  };
  text: string;
  team?: TeamIdentifier;
  scoringPlay?: boolean;
  scoreValue?: number;
  participants?: Array<{ athlete?: { displayName: string } }>;
  homeScore?: number;
  awayScore?: number;
};

export type GamePlayByPlayResponse = {
  plays: PlayByPlayEvent[];
};

export type GameBoxScoreTeamStats = {
  score: number;
  team: TeamIdentifier;
  leaders?: Array<{
    displayName: string;
    leaders?: Array<{
      displayValue: string;
      value?: number;
    }>;
  }>;
};

export type GameBoxScoreResponse = {
  teams: {
    home: GameBoxScoreTeamStats;
    away: GameBoxScoreTeamStats;
  };
};

export type StandingsTeam = {
  id: string;
  team: TeamIdentifier;
  stats: Array<{
    name: string;
    value?: number;
    description?: string;
    displayValue?: string;
  }>;
};

export type StandingsResponse = {
  standings: Array<{
    entries: StandingsTeam[];
  }>;
};
