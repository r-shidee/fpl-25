"use server";

import React from "react";
import FixturesGrid from "@/components/widgets/FixturesGrid";

// Server-side page to fetch all fixtures and teams then render the client component
export default async function Page() {
  // Fetch directly from FPL public endpoints to avoid calling internal /api routes at build time
  const [fixturesRes, bootstrapRes] = await Promise.all([
    fetch("https://fantasy.premierleague.com/api/fixtures/"),
    fetch("https://fantasy.premierleague.com/api/bootstrap-static/"),
  ]);

  if (!fixturesRes.ok) throw new Error("Failed to fetch fixtures from FPL");
  if (!bootstrapRes.ok) throw new Error("Failed to fetch bootstrap data from FPL");

  const fixtures = await fixturesRes.json();
  const bootstrap = await bootstrapRes.json();
  const teams = bootstrap.teams || [];

  const events = bootstrap.events || [];
  const nextEvent = events.find((e: any) => e.is_next);
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
