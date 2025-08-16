"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Fixture {
	event: number;
	is_home: boolean;
	team_h: number;
	team_a: number;
	team_h_difficulty: number;
	team_a_difficulty: number;
}

interface Team {
	id: number;
	code: number;
	short_name: string;
}

interface TeamFDR {
	team: Team;
	next5: number;
	next10: number;
	next15: number;
	next20: number;
}

const TeamsFDRPage: React.FC = () => {
	const [fixtures, setFixtures] = useState<Fixture[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [nextEventId, setNextEventId] = useState<number>(1);
	const [teamFDRs, setTeamFDRs] = useState<TeamFDR[]>([]);
	const [sortKey, setSortKey] = useState<keyof TeamFDR>("next5");
	const [sortAsc, setSortAsc] = useState<boolean>(true);

	// Fetch teams and fixtures from FPL API
	useEffect(() => {
		const loadData = async () => {
			const [fixturesRes, bootstrapRes] = await Promise.all([
				fetch("https://fantasy.premierleague.com/api/fixtures/"),
				fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
			]);

			const fixturesData: Fixture[] = await fixturesRes.json();
			const bootstrapData = await bootstrapRes.json();
			const teamsData: Team[] = bootstrapData.teams;

			setFixtures(fixturesData);
			setTeams(teamsData);

			const nextEvent = fixturesData.find(
				(f) =>
					f.event &&
					f.event >= bootstrapData.events.find((e: any) => e.is_next)?.id
			);
			setNextEventId(nextEvent?.event || 1);
		};

		loadData().catch(console.error);
	}, []);

	// Calculate FDR per team
	useEffect(() => {
		if (!fixtures.length || !teams.length) return;

		const upcomingFixtures = fixtures.filter((f) => f.event >= nextEventId);

		const fdrs: TeamFDR[] = teams.map((team) => {
			const teamFixtures = upcomingFixtures.filter(
				(f) => f.team_h === team.id || f.team_a === team.id
			);

			const calcAvg = (count: number) => {
				const slice = teamFixtures.slice(0, count);
				if (!slice.length) return 0;

				const total = slice.reduce((sum, f) => {
					const diff =
						f.team_h === team.id ? f.team_h_difficulty : f.team_a_difficulty;
					return sum + (diff || 0);
				}, 0);

				return total / slice.length;
			};

			return {
				team,
				next5: calcAvg(5),
				next10: calcAvg(10),
				next15: calcAvg(15),
				next20: calcAvg(20),
			};
		});

		setTeamFDRs(fdrs);
	}, [fixtures, teams, nextEventId]);

	// Sorting
	const sortedFDRs = [...teamFDRs].sort((a, b) => {
		const valA = a[sortKey] as number;
		const valB = b[sortKey] as number;
		return sortAsc ? valA - valB : valB - valA;
	});

	const handleSort = (key: keyof TeamFDR) => {
		if (sortKey === key) {
			setSortAsc(!sortAsc);
		} else {
			setSortKey(key);
			setSortAsc(true);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Team FDR Averages</h1>
			{teamFDRs.length === 0 ? (
				<p>Loading...</p>
			) : (
				<table className="w-full border-collapse border border-gray-300 text-sm">
					<thead>
						<tr>
							<th
								className="border border-gray-300 p-2 text-left cursor-pointer"
								onClick={() => handleSort("team")}
							>
								Team
							</th>
							<th
								className="border border-gray-300 p-2 cursor-pointer"
								onClick={() => handleSort("next5")}
							>
								Next 5 {sortKey === "next5" ? (sortAsc ? "▲" : "▼") : ""}
							</th>
							<th
								className="border border-gray-300 p-2 cursor-pointer"
								onClick={() => handleSort("next10")}
							>
								Next 10 {sortKey === "next10" ? (sortAsc ? "▲" : "▼") : ""}
							</th>
							<th
								className="border border-gray-300 p-2 cursor-pointer"
								onClick={() => handleSort("next15")}
							>
								Next 15 {sortKey === "next15" ? (sortAsc ? "▲" : "▼") : ""}
							</th>
							<th
								className="border border-gray-300 p-2 cursor-pointer"
								onClick={() => handleSort("next20")}
							>
								Next 20 {sortKey === "next20" ? (sortAsc ? "▲" : "▼") : ""}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedFDRs.map(({ team, next5, next10, next15, next20 }) => (
							<tr
								key={team.id}
								className="hover:bg-gray-50"
							>
								<td className="border border-gray-300 p-2 flex items-center gap-2">
									<Image
										src={`https://resources.premierleague.com/premierleague/badges/rb/t${team.code}.svg`}
										width={24}
										height={24}
										alt={team.short_name}
										className="w-6 h-6 object-contain"
									/>
									{team.short_name}
								</td>
								<td className="border border-gray-300 p-2">
									{next5.toFixed(2)}
								</td>
								<td className="border border-gray-300 p-2">
									{next10.toFixed(2)}
								</td>
								<td className="border border-gray-300 p-2">
									{next15.toFixed(2)}
								</td>
								<td className="border border-gray-300 p-2">
									{next20.toFixed(2)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TeamsFDRPage;
