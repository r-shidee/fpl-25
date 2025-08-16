"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { getClubShort } from "@/utils";
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

export const description = "A radial chart with text";

export default function ChartExpected(props: any) {
	const chartConfig = {
		expected_goals: {
			label: "expected_goals",
			color: "hsl(var(--chart-1))",
		},
		expected_assists: {
			label: "expected_assists",
			color: "hsl(var(--chart-2))",
		},
		expected_goal_involvements: {
			label: "expected_goal_involvements",
			color: "hsl(var(--chart-3))",
		},
	} satisfies ChartConfig;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Expected Stats Form</CardTitle>
				{/* <CardDescription>January - June 2024</CardDescription> */}
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={props.fixtures}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="opponent_team"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => getClubShort(value)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent />}
						/>
						<Line
							dataKey="expected_goals"
							type="monotone"
							stroke="var(--color-expected_goals)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="expected_assists"
							type="monotone"
							stroke="var(--color-expected_assists)"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="expected_goal_involvements"
							type="monotone"
							stroke="var(--color-expected_goal_involvements)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 leading-none text-muted-foreground"></div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
