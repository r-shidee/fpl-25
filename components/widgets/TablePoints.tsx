import { fetchTeams } from "@/utils";

interface Team {
	code: number;
	draw: number;
	form: null;
	id: number;
	loss: number;
	name: string;
	played: number;
	points: number;
	position: number;
	short_name: string;
	strength: number;
	team_division: null;
	unavailable: boolean;
	win: number;
	strength_overall_home: number;
	strength_overall_away: number;
	strength_attack_home: number;
	strength_attack_away: number;
	strength_defence_home: number;
	strength_defence_away: number;
	pulse_id: number;
}

interface Fixture {
	id: number;
	code: number;
	team_h: number;
	team_a: number;
	opponent_team: number;
	event: number;
	minutes: number;
	total_points: number;
	difficulty: number;
	finished: boolean;
	provisional_start_time: boolean;
	was_home: boolean;
	kickoff_time: string;
	event_name: string;
}

interface FixturesProps {
	fixtures: Fixture[];
	count: number;
}

export default async function TablePoints({ fixtures, count }: FixturesProps) {
	const teams = await fetchTeams();

	if (count) {
		fixtures = fixtures.slice(0, count + 1);
	}

	return (
		<div className="col-span-3">
			<h2 className="mb-4">Latest Points</h2>
			<div className="grid grid-cols-8 gap-2 col-span-2">
				{fixtures.map((fixture) => (
					<div
						key={fixture.code}
						className={`border p-2 text-xs fixture--level-${fixture.difficulty}`}>
						<div className="flex">
							{teams[fixture.opponent_team - 1].short_name}
							{fixture.was_home ? <div>(H)</div> : <div>(A)</div>}
						</div>

						<div className="text-2xl font-bold">{fixture.total_points} pts</div>
					</div>
				))}
			</div>
		</div>
	);
}
