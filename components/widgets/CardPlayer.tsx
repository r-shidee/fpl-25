"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faCircleDot,
	faCircleXmark,
	faClock,
	faFutbol,
	faHand,
	faMeh,
	faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Player } from "@/types/Player";
import { Team } from "@/types/Team";
import { useState } from "react";

const positions: { [key: number]: string } = {
	1: "Goalkeeper",
	2: "Defender",
	3: "Midfielder",
	4: "Forward",
};

const PlayerPhoto: React.FC<{ player: Player }> = ({ player }) => {
	const [imageError, setImageError] = useState(false);
	const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

	const photoId = player.photo || "default";
	const photoIdPng = photoId.replace("jpg", "png");

	const photoUrls = [
		`https://resources.premierleague.com/premierleague25/photos/players/110x140/${photoIdPng}`,
		`https://resources.premierleague.com/premierleague/photos/players/250x250/p${photoIdPng}`,
		`https://resources.premierleague.com/premierleague/photos/players/110x140/p${photoIdPng}`,
	];

	const handleImageError = () => {
		if (currentUrlIndex < photoUrls.length - 1) {
			setCurrentUrlIndex(currentUrlIndex + 1);
		} else {
			setImageError(true);
		}
	};

	if (imageError) {
		return (
			<div className="object-cover absolute bottom-0 w-full group-hover:z-0 group-hover:scale-95 z-10 top-8 -left-4 bg-gray-300 flex items-center justify-center">
				<div className="text-gray-600 font-bold text-lg">
					{player.web_name.charAt(0).toUpperCase()}
				</div>
			</div>
		);
	}

	return (
		<Image
			className="object-cover absolute bottom-0 w-full group-hover:z-0 group-hover:scale-95 z-10 top-8 -left-4"
			src={photoUrls[currentUrlIndex]}
			alt={player.web_name}
			width={250}
			height={250}
			onError={handleImageError}
		/>
	);
};

const RenderDivs = ({
	goals,
	assists,
	saves,
	minutes,
	position,
}: {
	minutes: number;
	goals: number;
	assists: number;
	saves: number;
	position: number;
}) => {
	return (
		<div className="flex flex-wrap px-1 gap-2 items-center">
			<div className="flex flex-col flex-wrap gap-1 align-baseline">
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3"
						icon={faClock}
					/>
					<span className="text-xs">{minutes}</span>
				</div>
			</div>
			{position === 1 ? (
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3"
						icon={faHand}
					/>
					<span className="text-xs">{saves}</span>
				</div>
			) : (
				<div className="flex flex-col flex-wrap gap-1">
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-3 h-3"
							icon={faFutbol}
						/>
						<span className="text-xs">{goals}</span>
					</div>
				</div>
			)}
			<div className="flex flex-col flex-wrap gap-1 align-baseline">
				<div className="flex items-center gap-1">
					<FontAwesomeIcon
						className="w-3 h-3"
						icon={faCircleDot}
					/>
					<span className="text-xs">{assists}</span>
				</div>
			</div>
		</div>
	);
};

// Updated calcValue: penalize very low minutes to avoid false Gem
function calcValue(player: Player, minMinutes: number = 60) {
	const points = player.total_points;
	const minutes = player.minutes;
	const price = player.now_cost / 10;

	// Games played approximation
	const gamesPlayed = Math.max(minutes / 90, 1 / 90); // avoid division by 0

	// Raw points per 90
	const rawPPGPer90 = points / gamesPlayed;

	// Penalty for very low minutes (< minMinutes)
	const penalty = Math.min(1, minutes / minMinutes);

	return (rawPPGPer90 * penalty) / price;
}

export default function CardPlayer({
	player,
	teams,
	highlightValue,
	minMinutes = 60,
}: {
	player: Player;
	teams: Team[];
	highlightValue?: string;
	minMinutes?: number;
}) {
	const playerTeam = teams?.find((team) => team.id === player.team);
	const teamShortName = playerTeam?.short_name?.toLowerCase() || "unknown";
	const value = calcValue(player, minMinutes);

	return (
		<div
			key={player.id}
			className="hover:bg-slate-900 rounded group"
		>
			<Link href={`/player/${player.id}`}>
				<div className="grid relative gap-2">
					<div
						className={`rounded relative overflow-hidden aspect-square flex ease-in-out items-center club club--${teamShortName}`}
					>
						<PlayerPhoto player={player} />

						<div className="absolute right-0 top-0 p-2">
							{highlightValue ? (
								<div className="font-mono text-2xl leading-none inline-flex text-shadow-md">
									{highlightValue}
								</div>
							) : null}
						</div>

						<div className="absolute left-0 top-0 p-2">
							{player.status === "i" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-red text-white rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3"
										icon={faPlusSquare}
									/>
								</div>
							) : player.status === "s" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-red text-white rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3"
										icon={faCircleXmark}
									/>
								</div>
							) : player.status === "d" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-yellow text-black rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3"
										icon={faMeh}
									/>
								</div>
							) : player.status === "a" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-green-500 text-white rounded-full p-1">
									<FontAwesomeIcon
										className="w-3 h-3"
										icon={faCheckCircle}
									/>
								</div>
							) : null}
						</div>

						<div className="absolute bottom-0 left-0 p-1 flex gap-1 justify-center z-20 flex-col">
							{player.penalties_order && (
								<div className="w-fit justify-between items-center flex font-mono text-xs bg-bauhaus-blue text-white px-2 py-1 rounded-sm">
									PK-{player.penalties_order}
								</div>
							)}
						</div>
					</div>

					<RenderDivs
						minutes={player.minutes}
						goals={player.goals_scored}
						assists={player.assists}
						saves={player.saves}
						position={player.element_type}
					/>

					<div className="flex relative gap-2 items-center">
						<div className="flex flex-col leading-tight w-full">
							<div className="flex flex-wrap justify-between">
								<p className="text-sm">{player.web_name}</p>
							</div>
							<p className="text-gray-400 text-xs font-light">
								{positions[player.element_type]}
							</p>
						</div>
						<div className="w-12 h-12 flex justify-end pt-2 pr-2 rounded-bl-full absolute right-0 text-sm">
							{(player.now_cost / 10).toFixed(1)}
						</div>
					</div>

					<div className="flex justify-between">
						<div className="flex flex-col">
							<span className="text-xs">Value</span>
							<span className="text-xs">{value.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}
