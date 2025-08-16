// Convert epoch to human-readable date in browser's time zone
const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export function epochToDate(epoch: number): {
	dayOfWeek: string;
	dayOfMonth: string;
	month: string;
	time: string;
} {
	const date = new Date(epoch * 1000); // Multiply by 1000 as JS uses milliseconds
	return {
		dayOfWeek: daysOfWeek[date.getDay()],
		dayOfMonth: date.getDate().toString().padStart(2, "0"),
		month: months[date.getMonth()],
		time: date.toLocaleString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		}),
	};
}

// Convert human-readable date to epoch
export function dateToEpoch(dateString: string): number {
	const date = new Date(dateString);
	return Math.floor(date.getTime() / 1000); // Divide by 1000 to get seconds
}
