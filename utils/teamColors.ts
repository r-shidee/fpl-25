// Team Colors Management
// This can be extended to fetch colors from an API or configuration file

export interface TeamColor {
	primary: string;
	secondary?: string;
	text?: string;
}

export const teamColors: Record<string, TeamColor> = {
	// Arsenal
	ars: { primary: "#a50009", text: "#ffffff" },
	// Aston Villa
	avl: { primary: "#370019", text: "#ffffff" },
	// Bournemouth
	bou: { primary: "#970a10", text: "#ffffff" },
	// Brentford
	bre: { primary: "#a80000", text: "#ffffff" },
	// Brighton
	bha: { primary: "#0054a6", text: "#ffffff" },
	// Burnley
	bur: { primary: "#6c1d45", text: "#ffffff" },
	// Chelsea
	che: { primary: "#162ea7", text: "#ffffff" },
	// Crystal Palace
	cry: { primary: "#07284f", text: "#ffffff" },
	// Everton
	eve: { primary: "#2d2e9d", text: "#ffffff" },
	// Fulham
	ful: { primary: "#d6d6d6", text: "#000000" },
	// Ipswich
	ips: { primary: "#370019", text: "#ffffff" },
	// Leeds
	lee: { primary: "#ffcd00", text: "#000000" },
	// Leicester
	lei: { primary: "#c6360f", text: "#ffffff" },
	// Liverpool
	liv: { primary: "#7a130f", text: "#ffffff" },
	// Man City
	mci: { primary: "#588fbb", text: "#ffffff" },
	// Man Utd
	mun: { primary: "#9c0707", text: "#ffffff" },
	// Newcastle
	new: { primary: "#151314", text: "#ffffff" },
	// Nottingham Forest
	nfo: { primary: "#ab0f28", text: "#ffffff" },
	// Southampton
	sou: { primary: "#ca0511", text: "#ffffff" },
	// Sunderland
	sun: { primary: "#ff0000", text: "#ffffff" },
	// Spurs
	tot: { primary: "#d6d6d6", text: "#000000" },
	// West Ham
	whu: { primary: "#5b1b28", text: "#ffffff" },
	// Wolves
	wol: { primary: "#ffc245", text: "#000000" },
};

// Function to get team color
export function getTeamColor(teamShortName: string): TeamColor {
	const normalizedName = teamShortName.toLowerCase();
	return teamColors[normalizedName] || { primary: "#666666", text: "#ffffff" };
}

// Function to get CSS custom property for team color
export function getTeamColorCSS(teamShortName: string): string {
	const color = getTeamColor(teamShortName);
	return color.primary;
}

// Function to generate dynamic CSS for team colors
export function generateTeamColorCSS(): string {
	let css = ":root {\n";

	Object.entries(teamColors).forEach(([team, color]) => {
		css += `  --team-${team}: ${color.primary};\n`;
	});

	css += "}\n\n";

	// Generate club background classes
	Object.keys(teamColors).forEach((team) => {
		css += `.club--${team} { background-color: var(--team-${team}); }\n`;
		css += `.bg-dark--${team} { background-color: var(--team-${team}); }\n`;
	});

	return css;
}

// Function to update team colors from external source (e.g., API)
export async function updateTeamColorsFromAPI(): Promise<void> {
	try {
		// Example: Fetch colors from an API
		// const response = await fetch('/api/team-colors');
		// const newColors = await response.json();
		// Object.assign(teamColors, newColors);

		// For now, we'll use the static colors
		console.log("Team colors updated");
	} catch (error) {
		console.error("Failed to update team colors:", error);
	}
}

// Function to get all team colors as a map
export function getAllTeamColors(): Record<string, TeamColor> {
	return { ...teamColors };
}

