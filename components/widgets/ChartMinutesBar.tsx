"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardFooter,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Minutes Played";

export default function ChartMinutesBar(props: any) {
	const chartConfig = {
		minutes: {
			label: "mins",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Minutes Played</CardTitle>
				<CardDescription>Upcoming Fixtures minutes</CardDescription>
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
							dataKey="round"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							// tickFormatter={(value) => getClubShort(value)}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="minutes"
							type="step"
							stroke="var(--color-minutes)"
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
