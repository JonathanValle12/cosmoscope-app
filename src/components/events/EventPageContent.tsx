import { EventsPageData } from "@/types/event"
import EventHero from "./EventHero"
import EventInfoBanner from "./EventInfoBanner"
import EventStatsGrid from "./EventStatsGrid"
import EventCategorySection from "./EventCategorySection"

interface EventPageContentProps {
    data: EventsPageData;
    favCookie: string;
}
export default function EventPageContent({ data, favCookie }: EventPageContentProps) {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <EventHero />
            <EventStatsGrid stats={data.stats} />
            <EventInfoBanner />

            <div className="mt-8 space-y-10">
                {data.sections.map((section) => (
                    <EventCategorySection key={section.key} section={section} favCookie={favCookie} />
                ))}
            </div>
        </section>
    )
}