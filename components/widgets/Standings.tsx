import React from "react";
import Image from "next/image";
import Link from "next/link";

const clubClasses: { [key: string]: string } = {
	1: "bg-gradient-to-r from-clubs-ars",
	2: "bg-gradient-to-r from-clubs-avl",
	3: "bg-gradient-to-r from-clubs-bou",
	4: "bg-gradient-to-r from-clubs-bre",
	5: "bg-gradient-to-r from-clubs-bha",
	6: "bg-gradient-to-r from-clubs-che",
	7: "bg-gradient-to-r from-clubs-cry",
	8: "bg-gradient-to-r from-clubs-eve",
	9: "bg-gradient-to-r from-clubs-ful",
	10: "bg-gradient-to-r from-clubs-ips",
	11: "bg-gradient-to-r from-clubs-lei",
	12: "bg-gradient-to-r from-clubs-liv",
	13: "bg-gradient-to-r from-clubs-mci",
	14: "bg-gradient-to-r from-clubs-mun",
	15: "bg-gradient-to-r from-clubs-new",
	16: "bg-gradient-to-r from-clubs-nfo",
	17: "bg-gradient-to-r from-clubs-sou",
	18: "bg-gradient-to-r from-clubs-tot",
	19: "bg-gradient-to-r from-clubs-whu",
	20: "bg-gradient-to-r from-clubs-wol",
};

interface Player {
	id: number;
	expected_goal_involvements: number;
	goals_scored: number;
	saves: number;
	assists: number;
	team: number;
	team_code: number;
	web_name: string;
	first_name: string;
	photo: string;
}
interface StandingsProps {
	players: Player[];
	description: string;
	sortBy:
		| "goals_scored"
		| "expected_goal_involvements"
		| "saves"
		| "assists"
		| "points_per_game"
		| "bps";
}

const Standings: React.FC<StandingsProps> = ({
	players,
	description,
	sortBy,
}) => {
	players.sort((a, b) => {
		const aValue = Number(a[sortBy as keyof Player]) || 0;
		const bValue = Number(b[sortBy as keyof Player]) || 0;
		return bValue - aValue;
	});

	return (
		<div>
			<div className="flex justify-between">
				<p className="mb-4">{description}</p>
				<Link
					className="font-mono text-xs"
					href={`/stats/${sortBy}`}
				>
					View all
				</Link>
			</div>
			{players?.map(
				(player, index) =>
					index < 5 && (
						<div
							className="stats"
							key={player.id}
						>
							<div className="stats__table border-b">
								{index === 0 ? (
									<div
										className={`stats__item flex justify-between items-center ${
											clubClasses[player.team] || "bg-gray-200 text-black"
										}`}
									>
										<div className="flex items-center">
											<div className="h-20 overflow-hidden flex items-start relative">
												<Image
													className="left-0 object-cover"
													src={
														"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
														player.photo.replace("jpg", "png")
													}
													alt={player.web_name}
													width={120}
													height={120}
												/>
											</div>
											<Link href={`/player/${player.id}`}>
												<div className="flex flex-col italic">
													<span className=" leading-none">
														{player.first_name}
													</span>
													<span className="text-xl font-bold ">
														{player.web_name}
													</span>
												</div>
											</Link>
										</div>

										<div className="text-2xl font-bold p-4">
											{player[sortBy as keyof Player]}
										</div>
									</div>
								) : (
									<div className="stats__item flex justify-between items-center">
										<div className="flex items-center px-2">
											<Image
												src={
													"https://resources.premierleague.com/premierleague/badges/rb/t" +
													player.team_code +
													".svg"
												}
												width={20}
												height={20}
												alt={"club"}
												className="h-5 w-5"
											/>
											<Link href={`/player/${player.id}`}>
												<div className="p-2">{player.web_name}</div>
											</Link>
										</div>
										<div className="font-bold p-2">
											{player[sortBy as keyof Player]}
										</div>
									</div>
								)}
							</div>
						</div>
					)
			)}
		</div>
	);
};

export default Standings;
