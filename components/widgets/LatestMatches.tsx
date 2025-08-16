"use client";

import React from "react";
import { Team } from "@/types/Team";
import Image from "next/image";
import {
	faClock,
	faHand,
	faFutbol,
	faCircleDot,
	faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Match {
	element: number;
	fixture: number;
	opponent_team: number;
	total_points: number;
	was_home: boolean;
	kickoff_time: string;
	team_h_score: number;
	team_a_score: number;
	round: number;
	minutes: number;
	goals_scored: number;
	assists: number;
	clean_sheets: number;
	goals_conceded: number;
	own_goals: number;
	penalties_saved: number;
	penalties_missed: number;
	yellow_cards: number;
	red_cards: number;
	saves: number;
	bonus: number;
	bps: number;
	influence: string;
	creativity: string;
	threat: string;
	ict_index: string;
	starts: number;
	expected_goals: string;
	expected_assists: string;
	expected_goal_involvements: string;
	expected_goals_conceded: string;
	value: number;
	transfers_balance: number;
	selected: number;
	transfers_in: number;
	transfers_out: number;
	defensive_contribution: number;
}

interface MatchProps {
	matches: Match[];
	teams: Team[];
}

const LatestMatches: React.FC<MatchProps> = ({ matches, teams }) => {
	const [showAll, setShowAll] = React.useState(false);

	// Reverse the matches array once when received
	const reversedMatches = React.useMemo(
		() => [...matches].reverse(),
		[matches]
	);
	const displayedMatches = showAll
		? reversedMatches
		: reversedMatches.slice(0, 5);

	// Helper function to check if match is upcoming
	const isUpcomingMatch = (match: Match) => {
		const kickoffTime = new Date(match.kickoff_time);
		const now = new Date();
		return kickoffTime > now;
	};

	return (
		<div className="p-4 flex flex-col gap-2">
			<div className="countdown__title tracking-widest font-mono uppercase border-b border-muted-foreground pb-2 mb-2">
				Latest Matches
			</div>

			<div>
				{displayedMatches.map((match, index) => (
					<div
						key={index}
						className="mb-4 flex justify-between"
					>
						<div className="flex gap-2 items-center font-mono">
							<div className="w-5 text-center">{match.round}</div>
							<Image
								className="w-8 h-8"
								width={40}
								height={40}
								alt={teams[match.opponent_team - 1].short_name}
								src={`https://resources.premierleague.com/premierleague/badges/rb/t${
									teams[match.opponent_team - 1].code
								}.svg`}
							/>
							<div className="flex flex-col font-mono text-xs">
								<div>{teams[match.opponent_team - 1].short_name}</div>
								<div>{match.was_home ? "Home" : "Away"}</div>
							</div>
						</div>
						<div className="flex flex-col">
							{isUpcomingMatch(match) ? (
								<p className="text-gray-500">Not Yet</p>
							) : match.minutes === 0 ? (
								<p>DNP</p>
							) : (
								<div>
									<div className="text-right">{match.total_points} pts</div>

									<div className="flex gap-2 ">
										{match.starts === 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faArrowAltCircleRight}
													/>
													<span className="text-xs">Sub</span>
												</div>
											</div>
										)}
										{match.minutes !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faClock}
													/>
													<span className="text-xs">{match.minutes}</span>
												</div>
											</div>
										)}
										{match.yellow_cards !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<div className="bg-bauhaus-yellow w-2 h-2 text-black flex items-center justify-center rounded-sm"></div>
													<span className="text-xs">{match.yellow_cards}</span>
												</div>
											</div>
										)}
										{match.red_cards !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<div className="bg-bauhaus-red w-2 h-2 flex items-center justify-center rounded-sm"></div>
													<span className="text-xs">{match.red_cards}</span>
												</div>
											</div>
										)}
										{match.saves !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faFutbol}
													/>
													<span className="text-xs">{match.saves}</span>
												</div>
											</div>
										)}
										{match.goals_scored !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faFutbol}
													/>
													<span className="text-xs">{match.goals_scored}</span>
												</div>
											</div>
										)}
										{match.assists !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faCircleDot}
													/>
													<span className="text-xs">{match.assists}</span>
												</div>
											</div>
										)}
										{match.defensive_contribution !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-baseline">
												<div className="flex items-center gap-1">
													<FontAwesomeIcon
														className="w-3 h-3 "
														icon={faShield}
													/>
													<span className="text-xs">
														{match.defensive_contribution}
													</span>
												</div>
											</div>
										)}
										{Number(match.expected_goal_involvements) !== 0 && (
											<div className="flex flex-col flex-wrap gap-1 align-center justify-center">
												<div className="flex items-center gap-1">
													<span className="text-xs">
														{match.expected_goal_involvements}xgi
													</span>
												</div>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				))}
				{matches.length > 5 && (
					<button
						className="text-blue-500"
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? "Show less" : "Show more"}
					</button>
				)}
			</div>
		</div>
	);
};

export default LatestMatches;
