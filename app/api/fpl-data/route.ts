// app/api/fpl-data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Fetch bootstrap-static
		const bootstrap = await fetch(
			"https://fantasy.premierleague.com/api/bootstrap-static/"
		);
		const fixtures = await fetch(
			"https://fantasy.premierleague.com/api/fixtures/"
		);

		const bootstrapJson = await bootstrap.json();
		const fixturesJson = await fixtures.json();

		return NextResponse.json({
			teams: bootstrapJson.teams,
			events: bootstrapJson.events,
			fixtures: fixturesJson,
		});
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: "Failed to fetch FPL data" },
			{ status: 500 }
		);
	}
}
