import { fetchFantasyData } from "./base";
import { Event } from "@/types/Event";

export async function fetchEvents(): Promise<Event[]> {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	return allData.events;
}
