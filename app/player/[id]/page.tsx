import { notFound } from "next/navigation";

import { fetchPlayer, fetchTeams, getClubShort, getFixtures } from "@/utils";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import ChartPoints from "@/components/widgets/ChartPoints";
import ChartMinutes from "@/components/widgets/ChartMinutes";
import ChartExpected from "@/components/widgets/ChartExpected";
import ChartDifficulty from "@/components/widgets/ChartDifficulty";
import AddData from "@/components/AddData";
import TablePoints from "@/components/widgets/TablePoints";
import ChartMinutesBar from "@/components/widgets/ChartMinutesBar";
import CalendarGameweek from "@/components/widgets/CalendarGameweek";
import { Team } from "@/types/Team";

import Fixtures from "@/components/widgets/Fixtures";
import LatestMatches from "@/components/widgets/LatestMatches";
import { Link } from "next-view-transitions";

export default async function Page({ params }: { params: { id: number } }) {
	const player = await fetchPlayer(params.id);
	const fixtures = await getFixtures(params.id);
	const teams: Team[] = await fetchTeams(); // Explicitly type teams as Team[]

	const positions: { [key: number]: string } = {
		1: "Goalkeeper",
		2: "Defender",
		3: "Midfielder",
		4: "Forward",
	};

	if (!player) {
		notFound();
	}
	return (
		<div className="grid gap-5 rounded-2xl">
			<div className="grid gap-4 grid-cols-1 lg:grid-cols-4 w-full">
				<div className="card--player lg:col-span-4 gap-2 grid">
					<div
						className={`card__info flex items-end justify-between p-4 pb-0 overflow-hidden club--${teams[
							player.team - 1
						].short_name.toLowerCase()}`}
					>
						<div className="flex flex-col p-4">
							<div className="flex gap-2">
								<Image
									className="w-6 h-6"
									width={24}
									height={24}
									alt={teams[player.team - 1].short_name}
									src={`https://resources.premierleague.com/premierleague/badges/rb/t${player.team_code}.svg`}
								/>
								<Link
									className="hover:underline"
									href={`/teams/${teams[
										player.team - 1
									].short_name.toLowerCase()}`}
								>
									{teams[player.team - 1].name}
								</Link>
								•<div>{positions[player.element_type]}</div>
							</div>
							<h2 className="mt-1 text-4xl font-bold tracking-tight">
								{player.first_name} {player.second_name}
							</h2>
							<div className="mt-2 flex flex-wrap gap-1 items-center font-mono text-xs">
								{player.news ? <p>{player.news} </p> : ""}
							</div>
							<div className="flex gap-2 mt-2 items-center">
								<div className="bg-bauhaus-blue px-2 h-8 text-white flex items-center justify-center rounded-sm">
									${(player.now_cost / 10).toFixed(1)}
								</div>
								<div className="bg-bauhaus-yellow w-5 h-8 text-black flex items-center justify-center rounded-sm">
									{player.yellow_cards}
								</div>
								<div className="bg-bauhaus-red w-5 h-8 text-white flex items-center justify-center rounded-sm">
									{player.red_cards}
								</div>
							</div>
						</div>
						<Image
							className="object-cover"
							src={
								"https://resources.premierleague.com/premierleague/photos/players/250x250/p" +
								player.photo.replace("jpg", "png")
							}
							alt={player.web_name}
							width={256}
							height={256}
						/>
					</div>
				</div>

				<LatestMatches
					matches={fixtures.history}
					teams={teams}
				/>
				<div className="col-span-1 p-4">
					<div className="">
						<Fixtures
							fixtures={fixtures.fixtures}
							teams={teams}
							count={10}
						/>
					</div>
				</div>

				<div className="p-4">
					<div className="countdown__title tracking-widest font-mono uppercase border-b border-muted-foreground pb-2 mb-2">
						Expected Stats
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Stats</TableHead>
								<TableHead className="text-right">Value</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">xGI</TableCell>
								<TableCell className="text-right">
									{player.expected_goal_involvements}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xG</TableCell>
								<TableCell className="text-right">
									{player.expected_goals}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xA</TableCell>
								<TableCell className="text-right">
									{player.expected_assists}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">xGC</TableCell>
								<TableCell className="text-right">
									{player.expected_goals_conceded}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<ChartMinutes fixtures={fixtures.history} />
			</div>
		</div>
	);
}
