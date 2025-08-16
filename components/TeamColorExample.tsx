"use client";

import { useTeamColors } from "@/hooks/useTeamColors";

export default function TeamColorExample() {
	const { getColor, updateColors, isLoading, error } = useTeamColors();

	const teams = [
		{ code: "ars", name: "Arsenal" },
		{ code: "che", name: "Chelsea" },
		{ code: "liv", name: "Liverpool" },
		{ code: "mun", name: "Man Utd" },
		{ code: "mci", name: "Man City" },
		{ code: "lee", name: "Leeds" },
		{ code: "ful", name: "Fulham" },
		{ code: "tot", name: "Spurs" },
	];

	return (
		<div className="p-6 space-y-4">
			<h2 className="text-2xl font-bold">Dynamic Team Colors Example</h2>

			{error && (
				<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
					Error: {error}
				</div>
			)}

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{teams.map((team) => {
					const color = getColor(team.code);
					return (
						<div
							key={team.code}
							className={`club--${team.code} p-4 rounded-lg shadow-md text-center`}
							style={
								{
									// You can also use the color programmatically
									// backgroundColor: color.primary,
									// color: color.text,
								}
							}
						>
							<div className="font-bold">{team.name}</div>
							<div className="text-sm opacity-80">
								{team.code.toUpperCase()}
							</div>
							<div className="text-xs mt-2 opacity-60">{color.primary}</div>
						</div>
					);
				})}
			</div>

			<div className="mt-6 p-4 bg-gray-100 rounded-lg">
				<h3 className="font-semibold mb-2">How to use:</h3>
				<code className="text-sm">
					{`// In your component:
<div className="club--che">Chelsea Player</div>

// Or programmatically:
const color = getColor('che');
<div style={{ backgroundColor: color.primary, color: color.text }}>
  Chelsea Player
</div>`}
				</code>
			</div>

			<button
				onClick={updateColors}
				disabled={isLoading}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
			>
				{isLoading ? "Updating..." : "Update Team Colors"}
			</button>
		</div>
	);
}
