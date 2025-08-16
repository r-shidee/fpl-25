"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Player } from "@/types/Player";

const teamNames: { [key: number]: string } = {
	1: "ars",
	2: "avl",
	3: "bou",
	4: "bre",
	5: "bha",
	6: "che",
	7: "cry",
	8: "eve",
	9: "ful",
	10: "ips",
	11: "lei",
	12: "liv",
	13: "mci",
	14: "mnu",
	15: "new",
	16: "not",
	17: "sou",
	18: "tot",
	19: "whu",
	20: "wol",
	// Add more teams as needed
};

const positions: { [key: number]: string } = {
	1: "gk",
	2: "df",
	3: "md",
	4: "fw",
};

export const columns: ColumnDef<Player>[] = [
	{
		accessorKey: "web_name",
		header: "Name",
		cell: ({ row }) => {
			const name = row.original.web_name;
			const posID = row.original.element_type;
			const teamId = row.original.team_code;
			const playerID = row.original.id;

			return (
				<div className="flex items-center gap-2">
					<div className="mr-2 p-1 rounded bg-slate-400 w-8 flex items-center justify-center">
						{positions[posID]}
					</div>
					<Image
						src={
							"https://resources.premierleague.com/premierleague/badges/rb/t" +
							teamId +
							".svg"
						}
						width={20}
						height={20}
						alt={name}
						className="h-5 w-5"
					/>
					<Link href={`/player/${playerID}`}>{name}</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "now_cost",
		header: "price",
		cell: ({ row }) => {
			const price = row.original.now_cost;
			return (price / 10).toFixed(1);
		},
	},

	{
		accessorKey: "minutes",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="p-0">
					mins
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "expected_goal_involvements",
		header: ({ column }) => {
			return (
				<Button
					className="p-0"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					xgI
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "bps",
		header: ({ column }) => {
			return (
				<Button
					className="p-0"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					bps
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
];
