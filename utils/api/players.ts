import { Player } from "@/types/Player";

// Fetch players from FPL bootstrap-static which contains players list.
export async function fetchPlayers(): Promise<Player[]> {
  const url = "https://fantasy.premierleague.com/api/bootstrap-static/";
  let response: Response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error(`fetchPlayers failed fetching ${url}: ${err}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // bootstrap-static contains `elements` array which represents players
  return data.elements as Player[];
}

// Fetch player detail (element-summary) for a specific player
export async function fetchPlayer(playerID: number | string): Promise<Player> {
  const url = `https://fantasy.premierleague.com/api/element-summary/${playerID}/`;
  let response: Response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error(`fetchPlayer failed fetching ${url}: ${err}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
