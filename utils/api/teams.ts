import { Team } from "@/types/Team";

// Helper function to get the base URL
function isClient() {
  return typeof window !== "undefined";
}

export async function fetchTeams(): Promise<Team[]> {
  // Client: call internal API route so caching/headers from the server routes are preserved.
  if (isClient()) {
    const res = await fetch(`/api/teams`);
    if (!res.ok) throw new Error(`Failed to fetch teams (client): ${res.status}`);
    return await res.json();
  }

  // Server: fetch bootstrap-static directly from FPL to avoid internal /api calls during prerender/build.
  const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
  if (!res.ok) throw new Error("Failed to fetch bootstrap data from FPL");
  const data = await res.json();
  return data.teams || [];
}
