import { Player } from "@/types/Player";
import { DataTable } from "./data-table";

async function getData(): Promise<Player[]> {
	// Fetch data from your API here.
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	let filteredPlayers = players.filter(function (player: {
		goals_scored: any;
		assists: any;
		status: any;
		expected_goal_involvements: number;
		expected_goals_conceded: number;
		id: number;
	}) {
		const goalsassist = player.goals_scored + player.assists;
		const difference = goalsassist - player.expected_goal_involvements;

		return player.status == "a" || player.status == "i";
		// return difference > 0 && player.minutes > 230 && player.now_cost <= 50;
	});
	return filteredPlayers;
}

export default async function PlayerPage() {
	const data = await getData();

	return (
		<div className="">
			{/* <DataTable
				columns={columns}
				data={data}
			/> */}
		</div>
	);
}
