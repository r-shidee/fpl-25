"use client";

import React, { useMemo, useState } from "react";
import { Team } from "@/types/Team";
import { Fixture } from "@/types/Fixture";
import TeamFixtures from "./TeamFixtures";
import { teamAverageFDR } from "@/utils/fixtureUtils";

interface Props {
  teams: Team[];
  fixtures: Fixture[];
  nextEventId: number;
}

export default function FixturesGrid({ teams, fixtures, nextEventId }: Props) {
  const [globalCount, setGlobalCount] = useState<number | null>(5);

  // Compute per-team averages for the selected global count
  const teamsWithAvg = useMemo(() => {
    return teams.map((t) => ({
      team: t,
      avg: teamAverageFDR(t, fixtures, nextEventId, globalCount ?? 5),
    }));
  }, [teams, fixtures, nextEventId, globalCount]);

  const sorted = useMemo(() => {
    return [...teamsWithAvg].sort((a, b) => {
      const aa = a.avg === null ? Infinity : a.avg;
      const bb = b.avg === null ? Infinity : b.avg;
      return aa - bb;
    });
  }, [teamsWithAvg]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-sm font-bold">Fixtures</div>
        <div className="ml-4 flex items-center gap-1 text-xs">
          <button className={`px-2 py-0.5 rounded ${globalCount === 3 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setGlobalCount(3)}>3</button>
          <button className={`px-2 py-0.5 rounded ${globalCount === 5 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setGlobalCount(5)}>5</button>
          <button className={`px-2 py-0.5 rounded ${globalCount === 10 ? 'bg-blue-600 text-white' : 'bg-transparent'}`} onClick={() => setGlobalCount(10)}>10</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sorted.map(({ team }) => (
          <TeamFixtures key={team.id} team={team} teams={teams} fixtures={fixtures} nextEventId={nextEventId} externalDisplayCount={globalCount ?? undefined} defaultCount={5} />
        ))}
      </div>
    </div>
  );
}
