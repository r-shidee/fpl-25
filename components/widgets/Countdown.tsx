"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
	deadline: string;
	name: string;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export function Countdown({ deadline, name }: CountdownProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [isExpired, setIsExpired] = useState(false);

	useEffect(() => {
		const targetDate = new Date(deadline);

		const updateCountdown = () => {
			const now = new Date();
			const difference = targetDate.getTime() - now.getTime();

			if (difference <= 0) {
				setIsExpired(true);
				return;
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft({ days, hours, minutes, seconds });
		};

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
	}, [deadline]);

	if (isExpired) {
		return <div className="countdown__clock">No more fixtures.</div>;
	}

	return (
		<div className="countdown border shadow p-4 rounded-lg">
			<div className="countdown__title tracking-widest font-mono uppercase border-b border-muted-foreground pb-2">
				Deadline - {name}
			</div>

			<div className="countdown__clock rounded grid grid-cols-4 p-3 ">
				<div className="countdown__time flex flex-col items-center justify-center">
					<div className="countdown__digit  w-10  text-center font-semibold text-3xl">
						{timeLeft.days}
					</div>
					<div className="countdown__desc  font-mono text-xs text-muted-foreground">
						days
					</div>
				</div>
				<div className="countdown__time flex flex-col items-center justify-center">
					<div className="countdown__digit  w-10  text-center font-semibold text-3xl">
						{timeLeft.hours}
					</div>
					<div className="countdown__desc  font-mono text-xs text-muted-foreground">
						hrs
					</div>
				</div>
				<div className="countdown__time flex flex-col items-center justify-center">
					<div className="countdown__digit  w-10  text-center font-semibold text-3xl">
						{timeLeft.minutes}
					</div>
					<div className="countdown__desc  font-mono text-xs text-muted-foreground">
						mins
					</div>
				</div>
				<div className="countdown__time flex flex-col items-center justify-center">
					<div className="countdown__digit  w-10  text-center font-semibold text-3xl">
						{timeLeft.seconds}
					</div>
					<div className="countdown__desc font-mono text-xs text-muted-foreground">
						secs
					</div>
				</div>
			</div>
		</div>
	);
}
