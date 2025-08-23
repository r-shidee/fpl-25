"use server";

import React from "react";
import FixturesGrid from "@/components/widgets/FixturesGrid";

// Server-side page to fetch all fixtures and teams then render the client component
export default async function Page() {
  // Use internal API route which returns { fixtures, teams }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const res = await fetch(`${baseUrl}/api/fpl/fixtures/`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch fixtures");
  }

  const data = await res.json();
  const fixtures = data.fixtures || [];
  const teams = data.teams || [];

  // fetch events to determine nextEventId
  const eventsRes = await fetch(`${baseUrl}/api/events`, { cache: "no-store" });
  const eventsData = eventsRes.ok ? await eventsRes.json() : [];
  const nextEvent = eventsData.find((e: any) => e.is_next);
  const nextEventId = nextEvent?.id || 1;

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-4">
          <div className="card--player">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Fixtures</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="p-4">
        {/* @ts-ignore - client component receiving server props */}
        <FixturesGrid teams={teams} fixtures={fixtures} nextEventId={nextEventId} />
      </main>
    </div>
  );
}
