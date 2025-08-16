export interface PastFixture {
	id: number;
	code: number;
	team_h: number;
	team_h_score: number | null;
	team_a: number;
	team_a_score: number | null;
	event: number;
	finished: boolean;
	minutes: number;
	provisional_start_time: boolean;
	kickoff_time: string;
	event_name: string;
	is_home: boolean;
	difficulty: number;
}
