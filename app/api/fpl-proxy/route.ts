import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Fetch FPL API data from the server side
		const [fixturesRes, bootstrapRes] = await Promise.all([
			fetch("https://fantasy.premierleague.com/api/fixtures/"),
			fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
		]);

		const fixtures = await fixturesRes.json();
		const bootstrap = await bootstrapRes.json();

		// Return both as JSON
		return NextResponse.json({ fixtures, bootstrap });
	} catch (err) {
		return NextResponse.json(
			{ error: "Failed to fetch FPL data" },
			{ status: 500 }
		);
	}
}
