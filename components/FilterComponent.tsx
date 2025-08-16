"use client";
import { useState } from "react";
import CardPlayer from "./widgets/CardPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClock,
	faIdCard,
	faListAlt,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { Player } from "@/types/Player";
import { Team } from "@/types/Team";
import { Link } from "next-view-transitions";
import { Slider } from "@/components/ui/slider";

const positions: { [key: number]: string } = {
	1: "Goalkeeper",
	2: "Defender",
	3: "Midfielder",
	4: "Forward",
};

type FilterComponentProps = {
	players: Player[];
	teams: Team[];
	slug?: string;
	filtering?: boolean;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
	players,
	teams,
	slug,
	filtering,
}) => {
	const [filter, setFilter] = useState<string | null>(null);
	const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);
	const [viewFormat, setViewFormat] = useState<"card" | "list">("list");
	const [visibleCount, setVisibleCount] = useState(10);

	// Get min and max prices from players
	const priceRange = players.reduce(
		(acc, player) => {
			const price = player.now_cost / 10;
			return {
				min: Math.min(acc.min, price),
				max: Math.max(acc.max, price),
			};
		},
		{ min: 4.0, max: -Infinity }
	);

	// Round the values for better UX
	const minPrice = 4.0;
	const maxPrice = Math.ceil(priceRange.max);

	// Update price filter handler
	const handlePriceChange = (value: number[]) => {
		setMaxPriceFilter(value[0]);
	};

	let filteredPlayers = players.filter((player) => {
		// Ensure slug is defined and the property is greater than 0
		if (!slug || player[slug as keyof Player] == 0) return false;
		if (player.minutes == 0) return false;

		// Filter position
		if (filter) {
			if (filter === "gk" && player.element_type !== 1) return false;
			if (filter === "df" && player.element_type !== 2) return false;
			if (filter === "md" && player.element_type !== 3) return false;
			if (filter === "fw" && player.element_type !== 4) return false;
		}

		// Filtering max price
		if (maxPriceFilter !== null) {
			const playerPrice = player.now_cost / 10;
			if (playerPrice > maxPriceFilter) {
				return false;
			}
		}

		return true;
	});

	filteredPlayers.sort((a, b) => {
		const aValue = Number(a[slug as keyof Player]) || 0;
		const bValue = Number(b[slug as keyof Player]) || 0;
		return bValue - aValue;
	});

	// certains stats only valid for certain position, eg. saves = gk
	const getPositionsWithStats = () => {
		const positions = [1, 2, 3, 4].filter((elementType) =>
			players.some(
				(player) =>
					player.element_type === elementType &&
					(player[slug as keyof Player] as number) > 0 &&
					player.minutes > 0
			)
		);
		return positions;
	};

	// check if certain positions have certain stats, gk: rarely'scores
	const hasPlayersOfPosition = (elementType: number) => {
		return players.some(
			(player) =>
				player.element_type === elementType &&
				Number(player[slug as keyof Player]) > 0 &&
				player.minutes > 0
		);
	};

	// Render players in card format
	const renderCardView = () => (
		<div className="grid grid-cols-2 lg:grid-cols-10 gap-4">
			{filteredPlayers.slice(0, visibleCount).map((player: Player) => (
				<CardPlayer
					key={player.id}
					teams={teams}
					player={player}
					highlightValue={(player[slug as keyof Player] ?? "").toString()}
				/>
			))}
			{visibleCount < filteredPlayers.length && (
				<button
					onClick={() => setVisibleCount(visibleCount + 20)}
					className="mt-4 py-2 border"
				>
					Show More
				</button>
			)}
		</div>
	);

	// Render players in list format
	const renderListView = () => (
		<div className="pb-4">
			<div className="flex justify-between">
				<div className="flex gap-2 items-center">Players</div>
				<div className="flex gap-4 items-center">
					<div className="w-16 text-right">
						<FontAwesomeIcon
							className="w-3 h-3 "
							icon={faClock}
						/>
					</div>
					<p className="w-[200px] font-mono text-xs text-right">{slug}</p>
				</div>
			</div>
			<div className="flex flex-col">
				{filteredPlayers
					.slice(0, visibleCount)
					.map((player: Player, index: number) => (
						<div
							key={player.id}
							className="border-b py-2 flex justify-between"
						>
							<div className="flex gap-2 items-center ">
								<div className="font-mono w-5 text-left ">{index + 1}</div>
								<Image
									src={
										"https://resources.premierleague.com/premierleague/badges/rb/t" +
										player.team_code +
										".svg"
									}
									width={32}
									height={32}
									alt={player.team_code.toString()}
									className="h-5 w-5 sm:h-8 sm:w-8 "
								/>
								<div className="flex flex-col">
									<Link href={`/player/${player.id}`}>
										<div className="font-semibold text-xs">
											{player.web_name}
										</div>
									</Link>
									<div className="flex gap-1 text-xs font-light text-gray-400">
										<div>{positions[player.element_type]}</div>
										<div>{(player.now_cost / 10).toFixed(1)}</div>
									</div>
								</div>
							</div>
							<div className="flex gap-4 items-center">
								<div className="font-mono text-xs xl:w-16 text-right">
									{player.minutes}
								</div>
								<div className="font-mono text-lg w-[200px]  text-right">
									{player[slug as keyof Player]}
								</div>
							</div>
						</div>
					))}
				{visibleCount < filteredPlayers.length && (
					<button
						onClick={() => setVisibleCount(visibleCount + 10)}
						className="mt-4 py-2 border"
					>
						Show More
					</button>
				)}
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-5 relative p-4 z-10">
			<div className="flex flex-wrap justify-between">
				<div className="overflow-hidden flex flex-col lg:flex-row flex-wrap gap-4 z-30 p-2">
					{filtering && getPositionsWithStats().length > 1 && (
						<div className="flex gap-2 items-center">
							<div className="flex gap-2 mb-2 overflow-scroll">
								{hasPlayersOfPosition(1) && (
									<div
										onClick={() => setFilter(filter === "gk" ? null : "gk")}
										className={`${
											filter === "gk" ? "bg-bauhaus-yellow text-black" : ""
										} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
									>
										GKP
									</div>
								)}
								{hasPlayersOfPosition(2) && (
									<div
										onClick={() => setFilter(filter === "df" ? null : "df")}
										className={`${
											filter === "df" ? "bg-bauhaus-yellow text-black" : ""
										} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
									>
										DEF
									</div>
								)}
								{hasPlayersOfPosition(3) && (
									<div
										onClick={() => setFilter(filter === "md" ? null : "md")}
										className={`${
											filter === "md" ? "bg-bauhaus-yellow text-black" : ""
										} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
									>
										MID
									</div>
								)}
								{hasPlayersOfPosition(4) && (
									<div
										onClick={() => setFilter(filter === "fw" ? null : "fw")}
										className={`${
											filter === "fw" ? "bg-bauhaus-yellow text-black" : ""
										} bg-bauhaus-blue text-xs inline-flex items-center px-2 py-1 rounded`}
									>
										FOR
									</div>
								)}
							</div>
						</div>
					)}
					{filtering && (
						<div className="flex flex-col gap-2 w-full max-w-xs">
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>Max Price</span>
								<span>
									{maxPriceFilter
										? `£${maxPriceFilter.toFixed(1)}`
										: `£${maxPrice.toFixed(1)}`}
								</span>
							</div>
							<Slider
								defaultValue={[maxPrice]}
								min={minPrice}
								max={maxPrice}
								step={0.5}
								value={[maxPriceFilter ?? maxPrice]}
								onValueChange={handlePriceChange}
								className="w-full"
							/>
						</div>
					)}
				</div>
				<div className="flex gap-4 self-end">
					<div
						className={`flex gap-2 items-center justify-center h-12 p-2 `}
						onClick={() =>
							setViewFormat(viewFormat === "card" ? "list" : "card")
						}
					>
						<FontAwesomeIcon
							className="w-4 h-4"
							icon={viewFormat === "card" ? faListAlt : faIdCard}
						/>
						<div className="text-xs">
							{viewFormat === "card" ? "List View" : "Card View"}
						</div>
					</div>
				</div>
			</div>

			<div className="h-[72dvh] pb-[80px]">
				{viewFormat === "list" ? renderListView() : renderCardView()}
			</div>
		</div>
	);
};

export default FilterComponent;
