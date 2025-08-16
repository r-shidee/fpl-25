import { Player } from "@/types/Player";
import { Event } from "@/types/Event";
import { Countdown } from "@/components/widgets/Countdown";
import FilterComponent from "@/components/FilterComponent";
import WeeklyFixtures from "@/components/WeeklyFixtures";
import CardPlayer from "@/components/widgets/CardPlayer";

export default async function Page() {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;
	let events = allData.events;
	let nextEvent = events.find((event: Event) => event.is_next);

	let watchlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
	let watchlistPlayers = players.filter((player: Player) =>
		watchlist.includes(player.id)
	);

	// Fetch fixtures data
	let fixturesData = await fetch(
		`https://fantasy.premierleague.com/api/fixtures/?event=${nextEvent.id}`
	);
	let fixtures = await fixturesData.json();

	// Sort players by price (descending) and limit to 20
	let topPlayers = players
		.sort((a: Player, b: Player) => b.now_cost - a.now_cost)
		.slice(0, 24);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-12 gap-5 p-5">
			<div className="col-span-12">
				<h1 className="text-3xl">Welcome</h1>
			</div>
			<div className="flex flex-col gap-4 col-span-12 xl:col-span-9 ">
				<h1>Players</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
					{topPlayers.map((player: Player) => (
						<CardPlayer
							key={player.id}
							teamName="teamName"
							player={player}
						/>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-4 col-span-12 xl:col-span-3">
				<Countdown
					deadline={nextEvent.deadline_time}
					name={nextEvent.name}
				/>
				{nextEvent && (
					<WeeklyFixtures
						eventId={nextEvent.id}
						fixtures={fixtures}
					/>
				)}
			</div>
		</div>
	);
}
