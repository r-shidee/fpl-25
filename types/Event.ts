export interface Event {
	id: number;
	name: string;
	deadline_time: string;
	release_time: string | null;
	average_entry_score: number;
	finished: boolean;
	data_checked: boolean;
	highest_scoring_entry: number;
	deadline_time_epoch: number;
	deadline_time_game_offset: number;
	highest_score: number;
	is_previous: boolean;
	is_current: boolean;
	is_next: boolean;
	cup_leagues_created: boolean;
	h2h_ko_matches_created: boolean;
	ranked_count: number;
	chip_plays: { chip_name: string; num_played: number }[];
	most_selected: number;
	most_transferred_in: number;
	top_element: number;
	top_element_info: { id: number; points: number };
	transfers_made: number;
	most_captained: number;
	most_vice_captained: number;
}
