import { Team } from "@/types/Team";
import { fetchTeams } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface Fixture {
	id: number;
	team_h: number;
	team_a: number;
	team_h_score: number | null;
	team_a_score: number | null;
	kickoff_time: string;
	// Add other properties as needed
}

interface WeeklyFixturesProps {
	eventId: number;
	fixtures: Fixture[];
}

export default async function WeeklyFixtures({
	eventId,
	fixtures,
}: WeeklyFixturesProps) {
	const teams = await fetchTeams();

	// Function to format date as "dd MMM"
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
	};

	// Function to format time as "HH:mm"
	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Group fixtures by date
	const fixturesByDate = fixtures.reduce((acc, fixture) => {
		const date = formatDate(fixture.kickoff_time);
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(fixture);
		return acc;
	}, {} as Record<string, Fixture[]>);

	return (
		<div className="weekly-fixtures p-4 border shadow rounded-lg">
			<h2 className="tracking-widest font-mono uppercase border-b border-muted-foreground pb-2">
				Fixtures
			</h2>
			<div className="relative pt-2">
				{/* Vertical timeline */}
				<div className="absolute left-4 top-0 bottom-0 w-0.5 border-foreground border-l"></div>

				{Object.entries(fixturesByDate).map(
					([date, dateFixtures], dateIndex) => (
						<div
							key={date}
							className="mb-4 relative">
							{/* Date "station" */}
							<div className="absolute left-0 ml-2 w-5 h-5 bg-bauhaus-yellow border-2 flex items-center justify-center z-10"></div>
							<h3 className="text-lg font-semibold mb-2 ml-10 leading-none">
								{date}
							</h3>
							<div className="ml-8">
								{dateFixtures.map((fixture) => (
									<div
										key={fixture.id}
										className="p-2 rounded flex items-center gap-2">
										<div className="flex gap-2 justify-between items-center w-full">
											<Link
												href={
													"/teams/" +
													teams[fixture.team_h - 1].short_name.toLowerCase()
												}
												key={fixture.team_h}
												className={`bg--${teams[
													fixture.team_h - 1
												].short_name.toLowerCase()}  px-4 py-1  relative flex gap-2  justify-center items-center`}>
												<Image
													key={fixture.team_h}
													src={
														"https://resources.premierleague.com/premierleague/badges/rb/t" +
														teams[fixture.team_h - 1].code +
														".svg"
													}
													width={40}
													height={40}
													alt={"club"}
													className="w-8 h-8"
												/>
												<p className="font-mono text-xs">
													{teams[fixture.team_h - 1].short_name}
												</p>
											</Link>
											<div className=" text-sm flex flex-col items-end">
												<span>{formatTime(fixture.kickoff_time)}</span>
											</div>
											<Link
												href={
													"/teams/" +
													teams[fixture.team_a - 1].short_name.toLowerCase()
												}
												key={fixture.team_a}
												className={`bg--${teams[
													fixture.team_a - 1
												].short_name.toLowerCase()} px-4 py-1 relative flex flex-row-reverse gap-2 justify-center items-center`}>
												<Image
													key={fixture.team_a}
													src={
														"https://resources.premierleague.com/premierleague/badges/rb/t" +
														teams[fixture.team_a - 1].code +
														".svg"
													}
													width={40}
													height={40}
													alt={"club"}
													className="w-8 h-8"
												/>
												<p className="font-mono text-xs">
													{teams[fixture.team_a - 1].short_name}
												</p>
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
