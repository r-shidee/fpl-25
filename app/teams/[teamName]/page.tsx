import CardPlayer from "@/components/widgets/CardPlayer";
import { fetchPlayers, fetchTeams } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Player } from "@/types/Player";
import CardPlayerDetailed from "@/components/widgets/CardPlayerDetailed";

type Fixture = any; // Replace 'any' with the actual fixture type

type Props = {
	players: Player[];
	paramsID: string;
};
export default async function Page({
	params: { teamName },
}: {
	params: { teamName: string };
}) {
	const teams = await fetchTeams();
	const team = teams.find(
		(team) => team.short_name.toLowerCase() === teamName.toLowerCase()
	);

	if (!team) {
		return <div>Team not found</div>;
	}
	return (
		<div>
			<div
				className={`club--${team.short_name.toLowerCase()} p-4 flex-col items- relative flex md:flex-row justify-center items-center gap-4 lg:justify-between mb-4 `}
			>
				<div>
					<h1 className="text-4xl font-semibold hidden xl:flex">{team.name}</h1>
				</div>
				<div>
					<Image
						key={team.id}
						src={
							"https://resources.premierleague.com/premierleague/badges/rb/t" +
							team.code +
							".svg"
						}
						width={120}
						height={120}
						alt={"club"}
						className="h-[120px] w-full"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-8 p-4">
				<Players
					teamCode={team.code}
					teamName={team.short_name}
				/>
			</div>
		</div>
	);
}

async function Players({
	teamCode,
	teamName,
}: {
	teamCode: number;
	teamName: string;
}) {
	const players = await fetchPlayers();
	const teams = await fetchTeams();
	const filteredPlayers = getPlayersByTeamCode(teamCode);
	filteredPlayers.sort((a, b) => b.minutes - a.minutes);
	// filteredPlayers.sort((a, b) => b.now_cost - a.now_cost);

	function getPlayersByTeamCode(teamCode: number): Player[] {
		return players.filter(
			(player: Player) => player.team_code === teamCode && player.status == "a"
			// (player: Player) => player.team_code === teamCode
		);
	}

	function getPlayersByPosition(position: number): Player[] {
		return filteredPlayers.filter(
			(player: Player) => player.element_type === position
		);
	}

	const gks = getPlayersByPosition(1);
	const def = getPlayersByPosition(2);
	const mid = getPlayersByPosition(3);
	const fwd = getPlayersByPosition(4);

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h2 className="mb-2">Forwards</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
					{fwd.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teams={teams}
							player={player}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-2">Midfielders</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
					{mid.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teams={teams}
							player={player}
						/>
					))}
				</div>
			</div>
			<div>
				<h2 className="mb-2">Defenders</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
					{def.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teams={teams}
							player={player}
						/>
					))}
				</div>{" "}
			</div>
			<div>
				<h2 className="mb-2">Goalkeepers</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-4">
					{gks.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teams={teams}
							player={player}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

// 1. passing teamID from page param eg. 'ars'
// 2 . convert to Uppercase
// 3. find all players with team
