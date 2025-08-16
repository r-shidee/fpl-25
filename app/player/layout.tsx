"use client";
import { useParams } from "next/navigation";

export default function PlayerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const params = useParams();
	const slug = params.id;

	return <section className="">{children}</section>;
}
