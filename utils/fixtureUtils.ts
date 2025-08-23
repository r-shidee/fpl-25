import { Fixture } from "@/types/Fixture";
import { Team } from "@/types/Team";

// Determine the difficulty for a fixture relative to a team id
export function getFixtureDifficultyForTeam(
  f: Fixture,
  teamId: number
): number | null {
  const anyF: any = f;
  if (
    typeof anyF.team_h_difficulty === "number" ||
    typeof anyF.team_a_difficulty === "number"
  ) {
    return f.team_h === teamId
      ? Number(anyF.team_h_difficulty)
      : Number(anyF.team_a_difficulty);
  }
  if (typeof anyF.difficulty === "number") return Number(anyF.difficulty);
  return null;
}

export function average(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

export function teamAverageFDR(
  team: Team,
  fixtures: Fixture[],
  nextEventId: number,
  count: number
): number | null {
  const upcoming = fixtures
    .filter(
      (f) =>
        f.event >= nextEventId && (f.team_h === team.id || f.team_a === team.id)
    )
    .sort((a, b) => a.event - b.event)
    .slice(0, count);
  if (!upcoming.length) return null;
  const diffs = upcoming
    .map((f) => getFixtureDifficultyForTeam(f, team.id))
    .map((d) => (Number.isFinite(Number(d)) ? Number(d) : 0));
  return average(diffs);
}
// Removed extraneous '*** End Patch' text
