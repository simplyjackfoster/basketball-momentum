import axios from "axios";
import { HoopflowError, NCAA_API_BASE } from "./utils";
import type {
  GameBoxScoreResponse,
  GamePlayByPlayResponse,
  ScoreboardDayResponse,
  StandingsResponse
} from "../types/ncaa";

const client = axios.create({
  baseURL: NCAA_API_BASE,
  timeout: 15000
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 500;
    const message =
      error.response?.data?.message ??
      error.message ??
      "Unexpected error contacting the NCAA data service.";
    return Promise.reject(new HoopflowError({ status, message }));
  }
);

export async function getScoreboardDay(
  year: string,
  month: string
): Promise<ScoreboardDayResponse> {
  const { data } = await client.get<ScoreboardDayResponse>(
    `/scoreboard/basketball-men/d1/${year}/${month}/all-conf`
  );
  return data;
}

export async function getGamePlayByPlay(gameId: string): Promise<GamePlayByPlayResponse> {
  const { data } = await client.get<GamePlayByPlayResponse>(`/game/${gameId}/play-by-play`);
  return data;
}

export async function getGameBoxScore(gameId: string): Promise<GameBoxScoreResponse> {
  const { data } = await client.get<GameBoxScoreResponse>(`/game/${gameId}/boxscore`);
  return data;
}

export async function getStandings(): Promise<StandingsResponse> {
  const { data } = await client.get<StandingsResponse>("/standings/basketball-men/d1");
  return data;
}
