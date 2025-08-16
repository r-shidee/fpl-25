import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Fetch FPL fixtures and bootstrap data
		const [fixturesRes, bootstrapRes] = await Promise.all([
			fetch("https://fantasy.premierleague.com/api/fixtures/"),
			fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
		]);

		const fixtures = await fixturesRes.json();
		const bootstrap = await bootstrapRes.json();

		return NextResponse.json({ fixtures, teams: bootstrap.teams });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch FPL data" },
			{ status: 500 }
		);
	}
}
