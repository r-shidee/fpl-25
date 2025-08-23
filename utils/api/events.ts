import { Event } from "@/types/Event";

// Helper function to get the base URL
function isClient() {
  return typeof window !== "undefined";
}

export async function fetchEvents(): Promise<Event[]> {
  // Client: call internal API route
  if (isClient()) {
    const res = await fetch(`/api/events`);
    if (!res.ok) throw new Error(`Failed to fetch events (client): ${res.status}`);
    return await res.json();
  }

  // Server: fetch bootstrap-static directly from FPL to avoid internal /api calls during prerender/build.
  const res = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
  if (!res.ok) throw new Error("Failed to fetch bootstrap data from FPL");
  const data = await res.json();
  return data.events || [];
}
