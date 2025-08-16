"use client";
import { useParams } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PlayerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const params = useParams();
	const slug = params.id; // Accessing the slug parameter

	return <div className="grid grid-cols-1 gap-5">{children}</div>;
}
