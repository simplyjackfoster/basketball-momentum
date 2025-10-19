import { motion } from "framer-motion";
import type { GameBoxScoreResponse, GamePlayByPlayResponse } from "../../../types/ncaa";
import { detectSignatureRun, summarizeTeams } from "../utils/transformers";

export function GameSummary({
  boxScore,
  playByPlay
}: {
  boxScore: GameBoxScoreResponse;
  playByPlay: GamePlayByPlayResponse;
}) {
  const teams = summarizeTeams(boxScore);
  const signatureRun = detectSignatureRun(playByPlay);

  return (
    <div className="grid gap-6 rounded-2xl border border-border/70 bg-muted/20 p-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <TeamScore name={teams.away.name} score={teams.away.score} logo={teams.away.logo} />
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Final</div>
          <TeamScore name={teams.home.name} score={teams.home.score} logo={teams.home.logo} />
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/60 p-4 text-sm leading-relaxed">
        {signatureRun ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Key run</p>
            <p className="mt-1 font-display text-lg font-semibold">
              {signatureRun.points}-0 {signatureRun.team === "home" ? teams.home.name : teams.away.name}
            </p>
            <p className="mt-2 text-muted-foreground">
              Sparked at {signatureRun.startPlay.clock.displayValue} of period {signatureRun.startPlay.period.displayValue}
              and capped at {signatureRun.endPlay.clock.displayValue} with {signatureRun.endPlay.text.toLowerCase()}.
            </p>
          </motion.div>
        ) : (
          <p className="text-muted-foreground">No significant runs detected in this matchup.</p>
        )}
      </div>
    </div>
  );
}

function TeamScore({ name, score, logo }: { name: string; score: number; logo: string }) {
  return (
    <div className="flex items-center gap-3">
      {logo ? <img src={logo} alt={name} className="h-10 w-10 rounded-full border border-border/70 object-cover" /> : null}
      <div>
        <p className="text-sm text-muted-foreground">{name}</p>
        <p className="font-display text-2xl font-semibold">{score}</p>
      </div>
    </div>
  );
}
