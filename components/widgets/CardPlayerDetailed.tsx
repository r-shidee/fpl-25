import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleDot,
	faClock,
	faFutbol,
	faHand,
	faHospital,
	faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { getFixtures } from "@/utils";
import Fixtures from "./Fixtures";
import { Player } from "@/types/Player";

interface PlayerCardProps {
	player: Player;
}

const positions: { [key: number]: string } = {
	1: "Goalkeeper",
	2: "Defender",
	3: "Midfielder",
	4: "Forward",
};

const teams: { [key: number]: string } = {
	1: "ars",
	2: "avl",
	3: "bou",
	4: "bre",
	5: "bha",
	6: "che",
	7: "cry",
	8: "eve",
	9: "ful",
	10: "ips",
	11: "lei",
	12: "liv",
	13: "mci",
	14: "mun",
	15: "new",
	16: "nfo",
	17: "sou",
	18: "tot",
	19: "whu",
	20: "wol",
};

const RenderDivs = ({
	minutes,
	goals,
	assists,
	saves,
	position,
}: {
	minutes: number;
	goals: number;
	assists: number;
	saves: number;
	position: number;
}) => {
	return (
		<div className="flex flex-wrap gap-3 items-center">
			{position === 1 ? (
				<div className="flex flex-wrap gap-4">
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-4 h-5"
							icon={faHand}
						/>
						<span className="text-xs">{saves}</span>
					</div>
				</div>
			) : (
				<div className="flex flex-wrap gap-4">
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-4 h-4"
							icon={faFutbol}
						/>
						<span className="text-xs leading-none">{goals}</span>
					</div>
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-4 h-4 "
							icon={faCircleDot}
						/>
						<span className="text-xs leading-none">{assists}</span>
					</div>
					<div className="flex items-center gap-1">
						<FontAwesomeIcon
							className="w-4 h-4 "
							icon={faClock}
						/>
						<span className="text-xs leading-none">{minutes}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default function CardPlayerDetailed({
	player,
	highlightValue,
}: {
	player: Player;
	highlightValue?: string;
}) {
	return (
		<div
			key={player.id}
			className={`rounded group p-4 bg-dark--${teams[player.team]}`}>
			<Link href={`/player/${player.id}`}>
				<div className="grid relative gap-3">
					<div className="flex relative gap-2 items-center">
						{/* <Image
							src={
								"https://resources.premierleague.com/premierleague/badges/rb/t" +
								player.team_code +
								".svg"
							}
							width={32}
							height={32}
							alt={player.team_code.toString()}
							className=" h-8 w-8 "
						/> */}
						<div className="flex flex-col leading-tight w-full">
							<div className="flex flex-wrap justify-between">
								<p className="text-sm">{player.web_name}</p>
							</div>
							<p className=" text-gray-400 text-xs font-light">
								{positions[player.element_type]}
							</p>
						</div>
						<div
							className={` w-12 h-12 flex justify-end pt-2 pr-2 rounded-bl-full absolute right-0 text-sm `}>
							{(player.now_cost / 10).toFixed(1)}
						</div>
					</div>
					<div
						className={`rounded relative overflow-hidden aspect-square flex ease-in-out items-center club--${
							teams[player.team]
						} `}>
						<Image
							className="object-cover absolute bottom-0 w-full group-hover:z-0 group-hover:scale-95 z-10 top-8 -left-8"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={250}
							height={250}
						/>

						<div className="absolute right-0 top-0 p-2">
							{highlightValue ? (
								<div className="font-mono text-2xl leading-none inline-flex text-shadow-md">
									{highlightValue}
								</div>
							) : (
								""
							)}
						</div>

						<div className="absolute bottom-0 right-0 p-1 flex gap-1 justify-center z-20 flex-col">
							{player.penalties_order ? (
								<div className="w-fit justify-between items-center flex font-mono text-xs bg-bauhaus-blue text-white px-2 py-1 rounded-sm">
									PK-{player.penalties_order}
								</div>
							) : (
								""
							)}

							{player.status === "i" ? (
								<div className="justify-between items-center flex w-fit text-xs bg-bauhaus-red text-white px-2 py-1 rounded-sm">
									<span className="material-symbols-outlined">
										local_hospital
									</span>
								</div>
							) : (
								""
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
				</div>
			</Link>
		</div>
	);
}
