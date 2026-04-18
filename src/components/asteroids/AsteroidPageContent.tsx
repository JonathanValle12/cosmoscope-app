import { AsteroidsPageData } from "@/types/asteroid";
import AsteroidStatsGrid from "./AsteroidStatsGrid";
import AsteroidLegend from "./AsteroidLegend";
import AsteroidDaySection from "./AsteroidDaySection";
import AsteroidPageHeader from "./AsteroidPageHeader";
import { isFavoriteFromCookie } from "@/lib/favorites";

interface Props {
    data: AsteroidsPageData;
    favCookie: string;
}

export default function AsteroidPageContent({ data, favCookie }: Props) {

    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <AsteroidPageHeader />

            <AsteroidStatsGrid stats={data.stats} />
            <AsteroidLegend />

            <div className="mt-8 space-y-8">
                {data.days.map((day) => (
                    <AsteroidDaySection key={day.date} day={day} favCookie={favCookie} />
                ))}
            </div>
        </section>
    )
}