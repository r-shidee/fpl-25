import { Player } from "@/types/Player";
import { Event } from "@/types/Event";
import { Team } from "@/types/Team";
import { Countdown } from "@/components/widgets/Countdown";
import WeeklyFixtures from "@/components/WeeklyFixtures";
import CardPlayer from "@/components/widgets/CardPlayer";
import { fetchPlayers } from "@/utils/api/players";
import { fetchTeams } from "@/utils/api/teams";
import { fetchEvents } from "@/utils/api/events";

export default async function Page() {
	const players = await fetchPlayers();
	const teams = await fetchTeams();
	const events = await fetchEvents();
	const nextEvent = events.find((event: Event) => event.is_next);

	if (!nextEvent) return <div>No upcoming events found</div>;

	// Dynamic minMinutes based on Gameweek
	const MINUTES_PER_GAME = 90;
	const currentGameweek = nextEvent.id;
	const minMinutes = MINUTES_PER_GAME * currentGameweek * 0.66; // 66% of total possible

	function calcValue(player: Player) {
		const points = player.total_points;
		const minutes = player.minutes;
		const price = player.now_cost / 10;

		// PPG per 90 capped to actual points
		const rawPPGPer90 = minutes > 0 ? points / (minutes / 90) : 0;
		const cappedPPG = Math.min(rawPPGPer90, points);

		// Penalti for short minutes
		const penalty = Math.min(1, minutes / minMinutes);

		return (cappedPPG * penalty) / price;
	}

	// Sort by adjusted value
	const topPlayers = players
		.filter((p) => p.minutes > 0) // keep active players
		.sort((a, b) => calcValue(b) - calcValue(a))
		.slice(0, 24);

	// Fetch fixtures
	const fixturesData = await fetch(
		`https://fantasy.premierleague.com/api/fixtures/?event=${nextEvent.id}`
	);
	const fixtures = await fixturesData.json();

	return (
		<div className="grid grid-cols-1 xl:grid-cols-12 gap-5 p-5">
			<div className="col-span-12">
				<h1 className="text-3xl">Value per PPG</h1>
			</div>

			<div className="flex flex-col gap-4 col-span-12 xl:col-span-9">
				<h1>Players</h1>
				<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
					{topPlayers.map((player) => (
						<CardPlayer
							key={player.id}
							teams={teams}
							player={player}
							minMinutes={minMinutes}
						/>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-4 col-span-12 xl:col-span-3">
				<Countdown
					deadline={nextEvent.deadline_time}
					name={nextEvent.name}
				/>
				<WeeklyFixtures
					eventId={nextEvent.id}
					fixtures={fixtures}
				/>
			</div>
		</div>
	);
}
