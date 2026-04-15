import EventPageContent from "@/components/events/EventPageContent";
import { getEventsPageData } from "@/lib/nasa/events";

export default async function Events() {
    const data = await getEventsPageData();

    return <EventPageContent data={data} />
}