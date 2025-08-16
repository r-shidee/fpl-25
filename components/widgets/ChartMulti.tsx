"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a grid";

export default function ChartMulti({
	goals,
	assists,
	mins,
}: {
	goals: number;
	mins: number;
	assists: number;
}) {
	const chartData = [
		// { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
		// { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
		{ browser: "assists", visitors: assists, fill: "var(--color-assists)" },
		{ browser: "goals", visitors: goals, fill: "var(--color-goals)" },
		{ browser: "mins", visitors: mins, fill: "var(--color-mins)" },
		// { browser: "mins", visitors: mins, fill: "var(--color-mins)" },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		// chrome: {
		// 	label: "Chrome",
		// 	color: "hsl(var(--chart-1))",
		// },
		// safari: {
		// 	label: "Safari",
		// 	color: "hsl(var(--chart-2))",
		// },
		assists: {
			label: "Assists",
			color: "hsl(var(--chart-3))",
		},
		goals: {
			label: "Goals",
			color: "hsl(var(--chart-4))",
		},
		mins: {
			label: "Mins",
			color: "hsl(var(--chart-5))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0"></CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square h-[250px]">
					<RadialBarChart
						data={chartData}
						startAngle={-90}
						endAngle={380}
						innerRadius={30}
						outerRadius={110}>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									hideLabel
									nameKey="browser"
								/>
							}
						/>
						<RadialBar
							dataKey="visitors"
							background>
							<LabelList
								position="insideStart"
								dataKey="browser"
								className="fill-white capitalize mix-blend-luminosity"
								fontSize={11}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground">Goals, Assists</div>
			</CardFooter>
		</Card>
	);
}
