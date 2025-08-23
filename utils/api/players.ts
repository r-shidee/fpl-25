import { Player } from "@/types/Player";

// Helper function to get the base URL
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return "";
  }
  // Server-side: use absolute URL
  // Default to the same port the Next.js server runs on (usually 3000) when
  // NEXT_PUBLIC_BASE_URL isn't provided. This avoids trying to connect to
  // an unrelated backend on port 3001 by accident.
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`
  );
}

export async function fetchPlayers(): Promise<Player[]> {
  const baseUrl = getBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/players`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    // Re-throw with extra context so logs show which host/port failed
    throw new Error(
      `fetchPlayers failed fetching ${baseUrl}/api/players: ${err}`
    );
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function fetchPlayer(playerID: number | string): Promise<Player> {
  const baseUrl = getBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/players/${playerID}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    throw new Error(
      `fetchPlayer failed fetching ${baseUrl}/api/players/${playerID}: ${err}`
    );
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
