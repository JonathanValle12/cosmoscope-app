'use client'

import type { AsteroidDayGroup } from "@/types/asteroid";
import AsteroidCard from "./AsteroidCard";
import { useState } from "react";

interface AsteroidDaySectionProps {
  day: AsteroidDayGroup;
  favCookie: string;
}

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

export default function AsteroidDaySection({ day, favCookie }: AsteroidDaySectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const visibleAsteroids = day.asteroids.slice(0, visibleCount);
  const hasMore = visibleCount < day.asteroids.length;
  const canShowLess = visibleCount > INITIAL_VISIBLE;

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {day.formattedDate}
        </h2>
        <p className="text-base text-gray-400">{day.count} asteroids</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleAsteroids.map((asteroid) => (
          <AsteroidCard key={asteroid.id} asteroid={asteroid} favCookie={favCookie} />
        ))}
      </div>

      {(hasMore || canShowLess) && (
        <div className="flex items-center gap-3">
          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
              className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] cursor-pointer">
              Show more ({day.asteroids.length - visibleCount})
            </button>
          )}
          {canShowLess && (
            <button
              type="button"
              onClick={() => setVisibleCount(INITIAL_VISIBLE)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] cursor-pointer">
              Show less
            </button>
          )}
        </div>
      )}
    </section>
  );
}