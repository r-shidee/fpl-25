import { Player } from "@/types/Player";

// Helper function to get the base URL
function getBaseUrl() {
	if (typeof window !== "undefined") {
		// Client-side: use relative URL
		return "";
	}
	// Server-side: use absolute URL
	return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
}

export async function fetchPlayers(): Promise<Player[]> {
	const baseUrl = getBaseUrl();
	const response = await fetch(`${baseUrl}/api/players`, {
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

export async function fetchPlayer(playerID: number | string): Promise<Player> {
	const baseUrl = getBaseUrl();
	const response = await fetch(`${baseUrl}/api/players/${playerID}`, {
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
