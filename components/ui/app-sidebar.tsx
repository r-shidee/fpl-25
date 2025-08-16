"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Team } from "@/types/Team";

import Link from "next/link";
import { fetchTeams } from "@/utils/api/teams";

// Menu items.
const items = [
	{
		title: "Goals",
		url: "/goals_scored",
	},
	{
		title: "Assists",
		url: "/assists",
	},
	{
		title: "Saves",
		url: "/saves",
	},
	{
		title: "xG",
		url: "/expected_goals",
	},
	{
		title: "xA",
		url: "/expected_assists",
	},
	{
		title: "xGC",
		url: "/expected_goals_conceded",
	},
	{
		title: "xGI",
		url: "/expected_goal_involvements",
	},
	{
		title: "ict index",
		url: "/ict_index",
	},
	{
		title: "Yellow Cards",
		url: "/yellow_cards",
	},
	{
		title: "DEFCONS",
		url: "/defensive_contribution",
	},
	{
		title: "PPG",
		url: "/points_per_game",
	},
];

export function AppSidebar() {
	const [teams, setTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadTeams = async () => {
			try {
				console.log("Loading teams...");
				setLoading(true);
				const teamsData = await fetchTeams();
				console.log("Teams loaded:", teamsData);
				setTeams(teamsData);
			} catch (err) {
				console.error("Error loading teams:", err);
				setError(err instanceof Error ? err.message : "Failed to load teams");
			} finally {
				setLoading(false);
			}
		};

		loadTeams();
	}, []);

	console.log(
		"Current state - loading:",
		loading,
		"error:",
		error,
		"teams count:",
		teams.length
	);

	const TeamBadge = ({ team }: { team: Team }) => {
		const [imageError, setImageError] = useState(false);
		const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

		// Try multiple URL patterns for team badges (new pattern first)
		const badgeUrls = [
			`https://resources.premierleague.com/premierleague25/badges-alt/${team.code}.svg`,
			`https://resources.premierleague.com/premierleague/badges/rb/t${team.code}.svg`,
			`https://resources.premierleague.com/premierleague/badges/t${team.code}.svg`,
		];

		const handleImageError = () => {
			if (currentUrlIndex < badgeUrls.length - 1) {
				setCurrentUrlIndex(currentUrlIndex + 1);
			} else {
				setImageError(true);
			}
		};

		if (imageError) {
			return (
				<div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
					{team.short_name}
				</div>
			);
		}

		return (
			<Image
				src={badgeUrls[currentUrlIndex]}
				width={40}
				height={40}
				alt={team.name}
				className="w-10 h-10 object-contain"
				onError={handleImageError}
			/>
		);
	};

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<Link
							href="/"
							className="font-bold text-xl font-mono"
						>
							FPL-24
						</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={`/stats` + item.url}>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
					<SidebarGroupContent>
						{loading ? (
							<div className="grid grid-cols-4 gap-2 p-2">
								{Array.from({ length: 20 }).map((_, i) => (
									<div
										key={i}
										className="w-10 h-10 bg-gray-200 rounded animate-pulse"
									/>
								))}
							</div>
						) : error ? (
							<div className="p-2 text-red-500 text-sm">
								Error loading teams: {error}
							</div>
						) : (
							<div className="grid grid-cols-4">
								{teams.map((team) => (
									<Link
										href={`/teams/${team.short_name}`}
										key={team.id}
										className="p-2 hover:bg-gray-100 rounded transition-colors"
										title={team.name}
									>
										<TeamBadge team={team} />
									</Link>
								))}
							</div>
						)}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
