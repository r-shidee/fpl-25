"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartConfig = {
	total_points: {
		label: "Points",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function ChartPoints(props: any) {
	let totalMatchesPlayed = props.fixtures.length;

	const totalPoints = props.fixtures.map(
		(item: { total_points: any }) => item.total_points
	);
	const sum = totalPoints.reduce((acc: any, points: any) => acc + points, 0);
	const average = sum / props.fixtures.length;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Total Points</CardTitle>
				{/* <CardDescription>January - June 2024</CardDescription> */}
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={props.fixtures}
						layout="vertical"
						margin={{
							left: -20,
						}}>
						<XAxis
							type="number"
							dataKey="total_points"
							hide
						/>
						<YAxis
							dataKey="round"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey="total_points"
							fill="var(--color-total_points)"
							radius={5}>
							<LabelList
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					{sum} pts after {totalMatchesPlayed} matches
				</div>
				<div className="leading-none text-muted-foreground">
					Averaging {average.toFixed(2)} per match.
				</div>
			</CardFooter>
		</Card>
	);
}
