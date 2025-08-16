"use client";

import React, { useEffect, useState } from "react";
import { Team } from "@/types/Team";
import { Event } from "@/types/Event";
import Image from "next/image";
import { fetchEvents } from "@/utils/api/events";

interface Fixture {
	event: number;
	is_home: boolean;
	difficulty: number;
	team_h: number;
	team_a: number;
}

interface FixturesProps {
	fixtures: Fixture[];
	count?: number; // initial number of fixtures to show
	teams: Team[];
}

const TeamBadge: React.FC<{ teamCode: number; teamName: string }> = ({
	teamCode,
	teamName,
}) => {
	const [imageError, setImageError] = useState(false);
	const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

	const badgeUrls = [
		`https://resources.premierleague.com/premierleague25/badges-alt/${teamCode}.svg`,
		`https://resources.premierleague.com/premierleague/badges/rb/t${teamCode}.svg`,
		`https://resources.premierleague.com/premierleague/badges/t${teamCode}.svg`,
	];

	const handleImageError = () => {
		if (currentUrlIndex < badgeUrls.length - 1) {
			setCurrentUrlIndex(currentUrlIndex + 1);
		} else {
			setImageError(true);
		}
	};

	if (imageError) {
		return (
			<div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-600">
				{teamName.slice(0, 3).toUpperCase()}
			</div>
		);
	}

	return (
		<Image
			src={badgeUrls[currentUrlIndex]}
			width={40}
			height={40}
			alt={teamName}
			className="w-8 h-8 object-contain"
			onError={handleImageError}
		/>
	);
};

const Fixtures: React.FC<FixturesProps> = ({ fixtures, count = 10, teams }) => {
	const [events, setEvents] = useState<Event[]>([]);
	const [nextEventId, setNextEventId] = useState<number>(1);
	const [showAll, setShowAll] = useState(false);

	useEffect(() => {
		const loadEvents = async () => {
			const data = await fetchEvents();
			setEvents(data);
			const next = data.find((e: Event) => e.is_next);
			setNextEventId(next?.id || 1);
		};
		loadEvents();
	}, []);

	const upcomingFixtures = fixtures.filter(
		(fixture) => fixture.event >= nextEventId
	);

	// Display either limited or all
	const displayedFixtures = showAll
		? upcomingFixtures
		: upcomingFixtures.slice(0, count);

	// Calculate average FDR for the next 10 fixtures
	const nextTenFixtures = upcomingFixtures.slice(0, 10);
	const totalFDR = nextTenFixtures.reduce(
		(sum, fixture) => sum + fixture.difficulty,
		0
	);
	const averageFDR = nextTenFixtures.length
		? totalFDR / nextTenFixtures.length
		: 0;

	const toggleShowAll = () => setShowAll(!showAll);

	return (
		<div className="flex flex-col gap-2 xl:col-span-3">
			<div className="countdown__title flex w-full justify-between items-center tracking-widest font-mono uppercase border-b border-muted-foreground pb-2 mb-2">
				<span>Fixtures</span>
				<span className="text-sm text-muted-foreground">
					Next 10: {averageFDR.toFixed(2)}
				</span>
			</div>
			<div className="grid grid-cols-5 gap-2">
				{displayedFixtures.map((fixture, index) => {
					const teamCode = fixture.is_home
						? teams[fixture.team_a - 1].code
						: teams[fixture.team_h - 1].code;
					const teamName = fixture.is_home
						? teams[fixture.team_a - 1].short_name
						: teams[fixture.team_h - 1].short_name;

					return (
						<div
							key={index}
							className={`p-1 mb-2 flex-col flex items-center gap-2 fixture--level-${fixture.difficulty}`}
						>
							<span className="font-mono text-xs">{fixture.event}</span>
							<TeamBadge
								teamCode={teamCode}
								teamName={teamName}
							/>
							<div className="font-mono text-xs flex flex-col items-center">
								{teamName}
								<span>{fixture.is_home ? "Home" : "Away"}</span>
							</div>
						</div>
					);
				})}
			</div>

			{upcomingFixtures.length > count && (
				<button
					onClick={toggleShowAll}
					className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
				>
					{showAll ? "Show Less" : "Show More"}
				</button>
			)}
		</div>
	);
};

export default Fixtures;
