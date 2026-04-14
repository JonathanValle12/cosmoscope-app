import { AsteroidsPageData } from "@/types/asteroid";
import AsteroidStatsGrid from "./AsteroidStatsGrid";
import AsteroidLegend from "./AsteroidLegend";
import AsteroidDaySection from "./AsteroidDaySection";
import AsteroidPageHeader from "./AsteroidPageHeader";

interface Props {
    data: AsteroidsPageData;
}

export default function AsteroidPageContent({ data }: Props) {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <AsteroidPageHeader />

            <AsteroidStatsGrid stats={data.stats} />
            <AsteroidLegend />

            <div className="mt-8 space-y-8">
                {data.days.map((day) => (
                    <AsteroidDaySection key={day.date} day={day} />
                ))}
            </div>
        </section>
    )
}