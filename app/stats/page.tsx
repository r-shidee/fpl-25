import { fetchPlayers } from "@/utils";
import Standings from "@/components/widgets/Standings";

export default async function Page() {
	const players = await fetchPlayers();

	return (
		<div className="p-4">
			<h1 className="text-2xl">Stats</h1>
			<div className="grid xl:grid-cols-3 gap-4">
				<Standings
					players={players}
					description="Goals"
					sortBy="goals_scored"
				/>
				<Standings
					players={players}
					description="Assists"
					sortBy="assists"
				/>
				<Standings
					players={players}
					description="Saves"
					sortBy="saves"
				/>
				<Standings
					players={players}
					description="BPS"
					sortBy="bps"
				/>
				<Standings
					players={players}
					description="PPG"
					sortBy="points_per_game"
				/>
			</div>
		</div>
	);
}
