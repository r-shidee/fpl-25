import { Team } from "@/types/Team";

// Helper function to get the base URL
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return "";
  }
  // Server-side: use absolute URL
  // Default to Next.js server port (3000) if NEXT_PUBLIC_BASE_URL isn't set.
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`
  );
}

export async function fetchTeams(): Promise<Team[]> {
  const baseUrl = getBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/teams`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    throw new Error(`fetchTeams failed fetching ${baseUrl}/api/teams: ${err}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
