"use client";

import React, { useMemo, useState } from "react";
import { Team } from "@/types/Team";
import { Fixture } from "@/types/Fixture";
import TeamBadge from "./TeamBadge";

interface TeamFixturesProps {
  team: Team;
  fixtures: Fixture[]; // all fixtures for the league
  teams: Team[]; // team lookup for opponent data
  nextEventId: number;
  defaultCount?: number;
  externalDisplayCount?: number; // optional global override
}

export default function TeamFixtures({ team, fixtures, teams, nextEventId, defaultCount = 5, externalDisplayCount }: TeamFixturesProps) {
  const [displayCount, setDisplayCount] = useState<number>(defaultCount);

  // Sync with external/global displayCount when provided
  React.useEffect(() => {
    if (typeof externalDisplayCount === "number") setDisplayCount(externalDisplayCount);
  }, [externalDisplayCount]);

  // Filter fixtures relevant to this team and upcoming
  const teamFixtures = useMemo(() => {
    return fixtures
      .filter((f) => f.event >= nextEventId && (f.team_h === team.id || f.team_a === team.id))
      .sort((a, b) => a.event - b.event);
  }, [fixtures, team.id, nextEventId]);

  const nextN = teamFixtures.slice(0, displayCount);
  // Helper: determine difficulty for this team for a fixture.
  const getFixtureDifficulty = (f: Fixture): number | null => {
    // prefer explicit per-team difficulties if present
    const anyF = f as any;
    // first try per-side difficulties used elsewhere in the app
    const hDiff = anyF.team_h_difficulty;
    const aDiff = anyF.team_a_difficulty;
    if (typeof hDiff === "number" || typeof aDiff === "number") {
      return f.team_h === team.id ? Number(hDiff) : Number(aDiff);
    }

    // fallback to generic `difficulty` if present
    if (typeof anyF.difficulty === "number") return Number(anyF.difficulty);

    // no difficulty available
    return null;
  };

  const difficulties = nextN.map(getFixtureDifficulty).filter((d) => Number.isFinite(d as number)) as number[];

  let averageFDR: number | null = null;
  if (difficulties.length) {
    averageFDR = difficulties.reduce((s, d) => s + d, 0) / difficulties.length;
  } else if (nextN.length) {
    // There are fixtures but none had numeric difficulty fields — treat missing as 0
    const sumWithZeros = nextN.reduce((s, f) => {
      const v = getFixtureDifficulty(f);
      return s + (Number.isFinite(Number(v)) ? Number(v) : 0);
    }, 0);
    averageFDR = sumWithZeros / nextN.length;
  } else {
    averageFDR = null;
  }

  return (
    <div className="card--team p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <TeamBadge teamCode={team.code} teamName={team.short_name} />
          <div className="font-bold">{team.name}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <button className={`px-2 py-0.5 rounded ${displayCount === 3 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setDisplayCount(3)}>3</button>
            <button className={`px-2 py-0.5 rounded ${displayCount === 5 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setDisplayCount(5)}>5</button>
            <button className={`px-2 py-0.5 rounded ${displayCount === 10 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setDisplayCount(10)}>10</button>
          </div>
          <div className="text-sm text-muted-foreground font-mono">{averageFDR === null ? "—" : averageFDR.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        {nextN.map((f, i) => {
          const isHome = f.team_h === team.id;
          const opponentId = isHome ? f.team_a : f.team_h;
          const opponent = teams.find((t) => t.id === opponentId);
          const diffForClass = getFixtureDifficulty(f) ?? 0;

          return (
            <div key={i} className={`p-2 flex items-center gap-3 fixture--level-${diffForClass}`}>
              <div className="font-mono text-xs">GW{f.event}</div>
              {opponent ? (
                <>
                  <TeamBadge teamCode={opponent.code} teamName={opponent.short_name} />
                  <div className="text-sm font-mono">{opponent.short_name}</div>
                </>
              ) : (
                <div className="text-sm font-mono">Team {opponentId}</div>
              )}
              <div className="ml-auto text-xs">{isHome ? "Home" : "Away"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
