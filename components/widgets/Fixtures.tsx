"use client";

import React, { useEffect, useState } from "react";
import { Team } from "@/types/Team";
import { Event } from "@/types/Event";
import Image from "next/image";
import { fetchEvents } from "@/utils/api/events";

interface Fixture {
	id?: number;
	event: number;
	// is_home is present for player-specific fixtures; for league fixtures it may be undefined
	is_home?: boolean;
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
	const [displayCount, setDisplayCount] = useState<number>(count);

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

	// Calculate which fixtures to display (either limited by displayCount or all)
	const nextNFixtures = upcomingFixtures.slice(0, displayCount);
	const displayedFixtures = showAll ? upcomingFixtures : nextNFixtures;

	// Calculate average FDR for the selected next N fixtures
	const totalFDR = nextNFixtures.reduce(
		(sum, fixture) => sum + fixture.difficulty,
		0
	);
	const averageFDR = nextNFixtures.length
		? totalFDR / nextNFixtures.length
		: 0;

	const toggleShowAll = () => setShowAll(!showAll);

	return (
		<div className="flex flex-col gap-2 xl:col-span-3">
			<div className="countdown__title flex w-full justify-between items-center tracking-widest font-mono uppercase border-b border-muted-foreground pb-2 mb-2">
				<div className="flex items-center gap-3">
					<span>Fixtures</span>
					<div className="flex items-center gap-1 text-xs">
						<button
							className={`px-2 py-0.5 rounded ${displayCount === 3 ? 'bg-blue-600 text-white' : 'bg-transparent'}`}
							onClick={() => setDisplayCount(3)}
						>
							3
						</button>
						<button
							className={`px-2 py-0.5 rounded ${displayCount === 5 ? 'bg-blue-600 text-white' : 'bg-transparent'}`}
							onClick={() => setDisplayCount(5)}
						>
							5
						</button>
						<button
							className={`px-2 py-0.5 rounded ${displayCount === 10 ? 'bg-blue-600 text-white' : 'bg-transparent'}`}
							onClick={() => setDisplayCount(10)}
						>
							10
						</button>
					</div>
				</div>
				<span className="text-sm text-muted-foreground">
					 {averageFDR.toFixed(2)}
				</span>
			</div>
			<div className="grid grid-cols-5 gap-2">
				{displayedFixtures.map((fixture, index) => {
					// If is_home is defined, this is likely a player-specific fixture and we show opponent only
					if (typeof fixture.is_home === "boolean") {
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
								<TeamBadge teamCode={teamCode} teamName={teamName} />
								<div className="font-mono text-xs flex flex-col items-center">
									{teamName}
									<span>{fixture.is_home ? "Home" : "Away"}</span>
								</div>
							</div>
						);
					}

					// League-wide fixture: show Home vs Away
					const home = teams[fixture.team_h - 1];
					const away = teams[fixture.team_a - 1];

					return (
						<div
							key={index}
							className={`p-1 mb-2 flex-col flex items-center gap-2 fixture--level-${fixture.difficulty}`}
						>
							<span className="font-mono text-xs">{fixture.event}</span>
							<div className="flex items-center gap-2">
								<div className="flex flex-col items-center">
									<TeamBadge teamCode={home.code} teamName={home.short_name} />
									<span className="text-xs font-mono">{home.short_name}</span>
								</div>
								<span className="text-xs">vs</span>
								<div className="flex flex-col items-center">
									<TeamBadge teamCode={away.code} teamName={away.short_name} />
									<span className="text-xs font-mono">{away.short_name}</span>
								</div>
							</div>
							<div className="text-xs font-mono">Home / Away</div>
						</div>
					);
				})}
			</div>

			{upcomingFixtures.length > count && (
				<button
					onClick={toggleShowAll}
					className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
				>
					{showAll ? "Show Less" : "Show All"}
				</button>
			)}
		</div>
	);
};

export default Fixtures;
