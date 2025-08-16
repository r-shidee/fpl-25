import { NextResponse } from "next/server";

const BASE_URL = "https://fantasy.premierleague.com/api/";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const url = `${BASE_URL}element-summary/${params.id}/`;
		const response = await fetch(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching player:", error);
		return NextResponse.json(
			{ error: "Failed to fetch player data" },
			{ status: 500 }
		);
	}
}
