import { fetchFantasyData } from "./base";
import { Player } from "@/types/Player";

export async function fetchPlayers(): Promise<Player[]> {
	const data = await fetchFantasyData();
	return data.elements;
}

export async function fetchPlayer(playerID: number | string): Promise<Player> {
	const data = await fetchFantasyData(`element-summary/${playerID}/`);
	return data;
}
