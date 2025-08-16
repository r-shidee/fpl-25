import { useState, useEffect } from "react";
import { TeamColor, getTeamColor } from "@/utils/teamColors";

interface UseTeamColorsReturn {
	getColor: (teamShortName: string) => TeamColor;
	updateColors: () => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

export function useTeamColors(): UseTeamColorsReturn {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateColors = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/team-colors", {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Failed to update team colors");
			}

			// Optionally refresh the page or update the CSS variables
			window.location.reload();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
		} finally {
			setIsLoading(false);
		}
	};

	const getColor = (teamShortName: string): TeamColor => {
		return getTeamColor(teamShortName);
	};

	return {
		getColor,
		updateColors,
		isLoading,
		error,
	};
}
