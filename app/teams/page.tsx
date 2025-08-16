import { fetchTeams } from "@/utils";
import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default async function TeamPage() {
	const teams = await fetchTeams();
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
			{teams.map((team) => (
				<Link
					href={"teams/" + team.short_name.toLowerCase()}
					key={team.id}
					className={`club--${team.short_name.toLowerCase()} rounded-lg border p-4 relative flex justify-between items-center`}>
					<p className="font-semibold text-xl">{team.name}</p>
					<Image
						key={team.id}
						src={
							"https://resources.premierleague.com/premierleague/badges/rb/t" +
							team.code +
							".svg"
						}
						width={40}
						height={40}
						alt={"club"}
						className="w-10 h-10"
					/>
				</Link>
			))}
		</div>
	);
}
