import FilterComponent from "@/components/FilterComponent";
import { Player } from "@/types/Player";
import { Link } from "next-view-transitions";

async function getData(): Promise<Player[]> {
	let data = await fetch(
		"https://fantasy.premierleague.com/api/bootstrap-static/"
	);
	let allData = await data.json();
	let players = allData.elements;

	return players;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const players = await getData();

	return (
		<div className="">
			<div className="px-8 py-4 bg-bauhaus-blue z-20">
				<Link
					className="font-mono"
					href={"/stats"}
				>
					stats
				</Link>
				<h1 className="text-4xl font-bold capitalize">
					{params.slug.replaceAll("_", " ")}
				</h1>
			</div>

			<FilterComponent
				players={players}
				slug={params.slug}
				filtering={true}
			/>
		</div>
	);
}
