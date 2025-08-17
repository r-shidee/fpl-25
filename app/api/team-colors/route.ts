import { NextResponse } from "next/server";
import { getAllTeamColors, updateTeamColorsFromAPI } from "@/utils/teamColors";

export async function GET() {
	try {
		const teamColors = getAllTeamColors();
		return NextResponse.json(teamColors);
	} catch (error) {
		console.error("Error fetching team colors:", error);
		return NextResponse.json(
			{ error: "Failed to fetch team colors" },
			{ status: 500 }
		);
	}
}

export async function POST() {
	try {
		// This could be used to update team colors from external sources
		await updateTeamColorsFromAPI();
		return NextResponse.json({ message: "Team colors updated successfully" });
	} catch (error) {
		console.error("Error updating team colors:", error);
		return NextResponse.json(
			{ error: "Failed to update team colors" },
			{ status: 500 }
		);
	}
}

