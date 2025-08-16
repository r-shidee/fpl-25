import { Fixture } from "@/types/Fixture"; // or define locally if you don't have this type

export const fetchFixtures = async (): Promise<Fixture[]> => {
	const res = await fetch("https://fantasy.premierleague.com/api/fixtures/");
	if (!res.ok) throw new Error("Failed to fetch fixtures");
	const data = await res.json();
	return data as Fixture[];
};
