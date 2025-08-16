import { Team } from "@/types/Team";

// Helper function to get the base URL
function getBaseUrl() {
	if (typeof window !== "undefined") {
		// Client-side: use relative URL
		return "";
	}
	// Server-side: use absolute URL
	return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
}

export async function fetchTeams(): Promise<Team[]> {
	const baseUrl = getBaseUrl();
	const response = await fetch(`${baseUrl}/api/teams`, {
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
