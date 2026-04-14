import type { AsteroidDayGroup } from "@/types/asteroid";
import AsteroidCard from "./AsteroidCard";

interface AsteroidDaySectionProps {
  day: AsteroidDayGroup;
}

export default function AsteroidDaySection({ day }: AsteroidDaySectionProps) {
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
        {day.asteroids.map((asteroid) => (
          <AsteroidCard key={asteroid.id} asteroid={asteroid} />
        ))}
      </div>
    </section>
  );
}