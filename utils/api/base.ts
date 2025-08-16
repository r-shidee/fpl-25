const BASE_URL = "https://fantasy.premierleague.com/api/";

export async function fetchFantasyData(endpoint: string = "bootstrap-static/") {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
